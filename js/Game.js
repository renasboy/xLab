Game.Game = function (game) {
    this.maxLevel = localStorage.getItem('max_level') ? localStorage.getItem('max_level') : 1;
    this.currentLevel = 1;
    this.MaxLevels = 12;
    this.counter = 0;
    this.mute = false;
};

Game.Game.prototype = {
    init: function (level) {
        if (!level) {
            return;
        }
        this.currentLevel = level;
    },
	create: function () {
        this.gameLost = false;
        this.gameWon = false;
        this.done = {};

        this.gameAudio = this.game.add.audio('game');
        this.gameAudio.play('', 0, 1, true);

        this.game.stage.backgroundColor = 0xdddddd;
        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bg');
        this.rolling = this.game.add.sprite(0, this.game.height - 37, 'rolling_animation');
        this.rolling.animations.add('roll');
        this.rolling.animations.play('roll', 10, true);

        this.level = new Game.Level(this.game, this.currentLevel)

        this.tubes = this.game.add.group();
        for (var item in this.level.tubes) {
            this.tubes.add(new Game.Tube(this.game, this.level.tubes[item].type, this.level.tubes[item].x, this.level.speed, this.level.maxTubeFill));
        }

        this.rats = this.game.add.group();
        for (var item in this.level.rats) {
            this.rats.add(new Game.Rat(this.game, this.level.rats[item].type, this.level.rats[item].x, this.level.speed));
        }

        this.bottles = [];
        this.bottles[1] = new Game.Bottle(this.game, 'primary1', this.level.drops, this.game.width / 4,     this.game.height / 4 * 3);
        this.bottles[2] = new Game.Bottle(this.game, 'primary2', this.level.drops, this.game.width / 4 * 2, this.game.height / 4 * 2);
        this.bottles[3] = new Game.Bottle(this.game, 'primary3', this.level.drops, this.game.width / 4 * 3, this.game.height / 4);

        this.emitters = [];
        this.emitters[1] = this.bottles[1].emitter;
        this.emitters[2] = this.bottles[2].emitter;
        this.emitters[3] = this.bottles[3].emitter;
        
        this.cursors = this.game.input.keyboard.createCursorKeys();

        var style = { font: '32px Dosis-Bold', fill: '#fff', align: 'center' };
        this.game.add.image(10, 10, 'score_level');
        this.counterText = this.game.add.text(20, 20, 'Score: ' + this.counter, style);
        this.levelText = this.game.add.text(20, 60, 'Level: ' + this.currentLevel, style);

        this.muteButton = this.game.add.button(10, 100, 'mute', this.muteMusic, this);
        this.pauseButton = this.game.add.button(95, 100, 'pause', this.pauseGame, this);
        this.game.input.onDown.add(function () { if(this.game.paused) this.game.paused = false; }, this);
	},
    dropBottle: function (bottle) {
        this.bottles[bottle].drop();
        //this.checkGameOverBottle();
    },
    fillTube: function (obj1, obj2) {
        obj2.destroy();
        if (!obj1.canFill()) {
            return;
        }
        obj1.fill(obj2.key);
        this.counter += this.level.maxTubeFill;
        this.checkGameOverTube();
    },
    hitRat: function (obj1, obj2) {
        obj2.destroy();
        obj1.hit();
        this.gameLost = true;
        this.gameOver();
    },
	update: function () {

        if (this.gameLost || this.gameWon) {
            return;
        }

        this.game.physics.arcade.collide(this.tubes);
        this.game.physics.arcade.collide(this.tubes, this.emitters, this.fillTube, null, this);
        this.game.physics.arcade.collide(this.rats, this.emitters, this.hitRat, null, this);

        if (this.game.device.desktop) {
            if (this.cursors.left.isDown) {
                this.dropBottle(1);
            }
            else if (this.cursors.right.isDown){
                this.dropBottle(3);
            }

            if (this.cursors.up.isDown) {
                this.dropBottle(2);
            }
            else if (this.cursors.down.isDown) {
                this.dropBottle(2);
            }
        }
        this.counterText.text = 'Score: ' + this.counter;
	},
    checkGameOverBottle: function () {
        if (this.bottles[1].empty ||
            this.bottles[2].empty ||
            this.bottles[3].empty) {
            this.gameLost = true;
            this.gameOver();
        }
    },
    checkGameOverTube: function () {

        var canFill = {};
        for (var item in this.level.colors) {
            if (this.tubes.iterate('finalColor', this.level.colors[item].color, Phaser.Group.RETURN_TOTAL)) {
                this.done['result' + item] = true;
            }
            else {
                this.tubes.forEach(function (obj) {
                    if (obj.canFillWith(this.level.colors[item].color)) {
                        canFill['result' + item] = true;
                    }
                }, this);
            }
        }

        if (Object.keys(this.done).length == this.level.colors.length) {
            this.gameWon = true;
            this.gameOver();
        }
        else if (Object.keys(this.done).length + Object.keys(canFill).length < this.level.colors.length) {
            this.gameLost = true;
            this.gameOver();
        }
    },
    gameOver: function () {
        this.gameAudio.stop();
        this.level.hideInfo();

        if (this.gameWon) {
            if (this.currentLevel == this.MaxLevels) { 
                this.level.gameWon();
                this.input.onDown.add(this.quitGame, this);
                return;
            }

            this.level.levelComplete();
            this.input.onDown.add(this.nextLevel, this);
        }
        else {
            this.level.gameLost();
            this.input.onDown.add(this.quitGame, this);
        }
    },
    nextLevel: function () {
        this.currentLevel++;
        if (this.currentLevel > this.maxLevel) {
            localStorage.setItem('max_level', this.currentLevel);
        }
		this.state.start('Game');
    },
	quitGame: function () {
        this.counter = 0;
        this.currentLevel = 1;
		this.state.start('MainMenu');
	},
    pauseGame: function () {
        this.game.paused = true;
    },
    muteMusic: function () {
        if (this.mute) {
            console.log('unmute');
            this.gameAudio.resume();
            this.mute = false;
            this.muteButton.loadTexture('mute');
            return;
        }
        console.log('mute');
        this.gameAudio.pause();
        this.mute = true; 
        this.muteButton.loadTexture('unmute');
    }
};

Game.Game = function (game) {
    this.menuAudio = null;
    this.maxLevel = localStorage.getItem('max_level') ? localStorage.getItem('max_level') : 1;
    this.currentLevel = 1;
    this.counter = 0;
    this.mute = localStorage.getItem('mute') == 'true' ? true : false;
};

Game.Game.prototype = {
    init: function (level) {
        if (!level) {
            return;
        }
        this.currentLevel = level;
    },
	create: function () {

        ga('send', 'event', 'Game', 'Load', this.currentLevel);

        this.gameLost = false;
        this.gameWon = false;
        this.gamePaused = false;
        this.done = {};

        this.gameAudio = this.game.add.audio('game', 0.5, true);

        this.game.stage.backgroundColor = 0x152736;
        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bg');
        this.rolling = this.game.add.sprite(0, this.game.height - 37, 'rolling_animation');
        this.game.physics.enable(this.rolling, Phaser.Physics.ARCADE);
        this.rolling.body.immovable = true;
        this.rolling.animations.add('roll');
        this.rolling.animations.play('roll', 10, true);

        this.level = new Game.Level(this.game, this.currentLevel)
        this.MaxLevels = this.level.nLevels;

        this.tubes = this.game.add.group();
        for (var item in this.level.tubes) {
            this.tubes.add(new Game.Tube(this.game, this.level.tubes[item].type, this.level.tubes[item].x, this.level.rollingSpeed, this.level.maxTubeFill));
        }

        this.rats = this.game.add.group();
        for (var item in this.level.rats) {
            this.rats.add(new Game.Rat(this.game, this.level.rats[item].type, this.level.rats[item].x, this.level.rollingSpeed));
        }

        this.bottles = [];
        this.bottles[1] = new Game.Bottle(this.game, 'primary1', this.level.drops, this.level.dropSpeed, this.game.width / 4,     this.game.height / 4 * 3);
        this.bottles[2] = new Game.Bottle(this.game, 'primary2', this.level.drops, this.level.dropSpeed, this.game.width / 4 * 2, this.game.height / 4 * 2);
        this.bottles[3] = new Game.Bottle(this.game, 'primary3', this.level.drops, this.level.dropSpeed, this.game.width / 4 * 3, this.game.height / 4);

        this.emitters = [];
        this.emitters[1] = this.bottles[1].emitter;
        this.emitters[2] = this.bottles[2].emitter;
        this.emitters[3] = this.bottles[3].emitter;
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        var style = { font: '20px FontExtraBold, Helvetica', fill: '#fff', align: 'center' };
        this.game.add.image(10, 10, 'objective_level');
        this.counterText = this.game.add.text(30, 26, 'Score:  ' + this.counter, style);
        this.levelText = this.game.add.text(30, 76, 'Level:  ' + this.currentLevel, style);

        this.level.showLevelObjective();

        this.muteButton = this.game.add.button(10, 170, 'unmute', this.muteMusic, this);
        this.helpButton = this.game.add.button(65, 170, 'help', this.helpGame, this);
        this.pauseButton = this.game.add.button(120, 170, 'pause', this.pauseGame, this);
        this.pauseButton.pause = true;
        this.resolveMusic();
	},
    dropBottle: function (bottle) {

        ga('send', 'event', 'Game', 'Drop', bottle);

        this.bottles[bottle].drop();
    },
    fillTube: function (obj1, obj2) {
        obj2.destroy();
        if (!obj1.canFill()) {
            return;
        }

        ga('send', 'event', 'Game', 'HitTube', parseInt(obj2.key.substring(7, 8)));

        obj1.fill(obj2.key);
        this.counter += this.level.maxTubeFill * 10;
        this.checkGameOverTube();
    },
    hitRat: function (obj1, obj2) {
        // rat with rat collision
        if (obj2.key == 'rat1') {
            return;
        }

        ga('send', 'event', 'Game', 'HitRat', parseInt(obj2.key.substring(7, 8)));

        obj2.destroy();
        obj1.hit();
        if (!this.gameLost) {
            this.gameLost = true;
            this.gameOver();
        }
    },
    hitRolling: function (obj1, obj2) {
        ga('send', 'event', 'Game', 'HitRolling', parseInt(obj2.key.substring(7, 8)));
        obj2.destroy();
        // only check game over once last drop hits the rolling
        if (this.emitters[obj2.key.substring(7,8)].countLiving() == 0) {
            this.checkGameOverTube();
        }
    },
	update: function () {

        if (this.gameWon && this.game.device.desktop && this.enterKey.isDown) {
            this.nextLevel();
        }

        if (this.gameLost || this.gameWon || this.gamePaused) {
            return;
        }

        this.game.physics.arcade.collide(this.tubes, this.emitters, this.fillTube, null, this);
        this.game.physics.arcade.collide(this.rats, this.emitters, this.hitRat, null, this);
        this.game.physics.arcade.collide(this.rolling, this.emitters, this.hitRolling, null, this);

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
    checkGameOverTube: function () {
        var canFill = {};
        var canFillTube = {};
        // foreach objetive colors
        for (var item in this.level.colors) {
            // if there are tubes filled with this color
            // this might raise a bug if the objetive has two
            // or more color of the same
            if (this.tubes.iterate('finalColor', this.level.colors[item].color, Phaser.Group.RETURN_TOTAL)) {
                this.done['result' + item] = true;
            }
            else {
                this.tubes.forEach(function (obj) {
                    if (obj.canFillWith(this.level.colors[item].color,
                                        this.bottles[1].currentParticles,
                                        this.bottles[2].currentParticles,
                                        this.bottles[3].currentParticles)) {
                        canFill['result' + item] = true;
                        canFillTube['result' + obj.imgTube] = true;
                    }
                }, this);
            }
        }

        if (Object.keys(this.done).length == this.level.colors.length && !this.gameWon) {
            this.gameWon = true;
            this.gameOver();
        }
        else if (Object.keys(this.done).length + Object.keys(canFill).length < this.level.colors.length ||
                 Object.keys(canFillTube).length < this.level.colors.length - Object.keys(this.done).length &&
                 !this.gameLost) {
            this.gameLost = true;
            this.gameOver();
        }
    },
    gameOver: function () {
        this.gameAudio.destroy(true);

        if (this.gameWon) {
            if (this.currentLevel == this.MaxLevels) { 
                ga('send', 'event', 'Game', 'GameWon', this.currentLevel);
                ga('send', 'event', 'Game', 'Score', this.counter);
                this.quitGame();
                this.state.start('GameWon');
                return;
            }
            ga('send', 'event', 'Game', 'LevelComplete', this.currentLevel);
            this.level.levelComplete(this.counter);
            this.game.add.button(this.game.world.centerX + 100, this.game.world.centerY + 100, 'next', this.nextLevel, this);

            this.gameWonAudio = this.game.add.audio('game_won', 1);
            this.gameWonAudio.play();

            this.game.menuAudio = this.game.add.audio('menu', 0.5, true);
            if (!this.mute) {
                this.game.time.events.add(Phaser.Timer.SECOND * 1.5, this.playAudio, this);
            }
        }
        else {
            ga('send', 'event', 'Game', 'GameOver', this.currentLevel);
            this.quitGame();
		    this.state.start('GameOver');
        }
    },
    playAudio: function () {
        this.game.menuAudio.play();
    },
    nextLevel: function () {
        this.currentLevel++;
        if (this.currentLevel > this.maxLevel) {
            localStorage.setItem('max_level', this.currentLevel);
        }
		this.state.start('LevelSplash', true, false, this.currentLevel);
    },
    helpGame: function () {
        ga('send', 'event', 'Game', 'Help', this.currentLevel);
        this.pauseGame();
        this.level.help();
        this.playButton = this.game.add.button(this.game.world.centerX + 300, this.game.world.centerY + 120, 'next', this.hideHelpGame, this);
    },
    hideHelpGame: function () {
        ga('send', 'event', 'Game', 'HideHelp', this.currentLevel);
        this.level.hideInfo();
        this.playButton.destroy();
        this.unpauseGame();
    },
	quitGame: function () {
        this.counter = 0;
	},
    pauseGame: function (button) {
        ga('send', 'event', 'Game', 'Pause', this.currentLevel);
        this.gamePaused = true;
        this.pauseButton.loadTexture('play');
        this.muteButton.inputEnabled = false;
        this.helpButton.inputEnabled = false;
        this.pauseButton.inputEnabled = false;
        this.tubes.callAll('pause');
        this.rats.callAll('pause');
        this.bottles[1].pause();
        this.bottles[2].pause();
        this.bottles[3].pause();
        this.rolling.animations.stop();
        if (button && button.pause == true) {
            this.level.pause();
            this.playButton = this.game.add.button(this.game.world.centerX + 100, this.game.world.centerY + 100, 'next', this.unpauseGame, this);
            this.playButton.play = true;
            this.gameAudio.volume = 0.1;
        }
    },
    unpauseGame: function (button) {
        ga('send', 'event', 'Game', 'UnPause', this.currentLevel);
        this.pauseButton.loadTexture('pause');
        if (button && button.play == true) {
            this.level.hideInfo();
            this.playButton.destroy();
            this.gameAudio.volume = 0.5;
        }
        this.tubes.callAll('unpause');
        this.rats.callAll('unpause');
        this.bottles[1].unpause();
        this.bottles[2].unpause();
        this.bottles[3].unpause();
        this.rolling.animations.play('roll', 10, true);
        this.muteButton.inputEnabled = true;
        this.helpButton.inputEnabled = true;
        this.pauseButton.inputEnabled = true;
        this.gamePaused = false;
    },
    muteMusic: function () {
        this.mute = !this.mute;
        localStorage.setItem('mute', this.mute);
        this.resolveMusic()
    },
    resolveMusic: function () {
        if (this.mute) {
            ga('send', 'event', 'Game', 'Mute', this.currentLevel);
            this.gameAudio.pause();
            this.muteButton.loadTexture('mute');
            return;
        }
        ga('send', 'event', 'Game', 'UnMute', this.currentLevel);
        if (this.gameAudio.paused) {
            this.gameAudio.resume();
        }
        else {
            this.gameAudio.play();
        }
        this.muteButton.loadTexture('unmute');
    },
    /*
    ,
    render: function () {
        this.game.debug.body(this.tubes.getTop());
        this.game.debug.body(this.tubes.getBottom());
        this.game.debug.body(this.rats.getTop());
        this.game.debug.body(this.rats.getBottom());
        this.game.debug.body(this.emitters[1].getTop());
        this.game.debug.body(this.emitters[2].getTop());
        this.game.debug.body(this.emitters[3].getTop());
        this.game.debug.body(this.emitters[1].getBottom());
        this.game.debug.body(this.emitters[2].getBottom());
        this.game.debug.body(this.emitters[3].getBottom());
    }
    */
};

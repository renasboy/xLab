Game.GameWon = function (game) {};

Game.GameWon.prototype = {
	create: function () {

        this.game.stage.backgroundColor = 0x000000;

        this.gameWonAudio = this.game.add.audio('game_won', 1);
        this.gameWonAudio.play();

        this.game.menuAudio = this.game.add.audio('menu', 0.5, true);
        this.game.time.events.add(Phaser.Timer.SECOND * 1.5, this.playAudio, this);

        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bg');

        var bg = this.game.add.bitmapData(this.game.width, this.game.height);
        bg.fill(0, 0, 0, 0.6);
        this.game.add.sprite(0, 0, bg);

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.build();

        this.input.onDown.addOnce(this.startAgain, this);
        this.clickAudio = this.game.add.audio('click');
	},
    playAudio: function () {
        this.game.menuAudio.play();
    },
    build: function () {
        var level = new Game.Level(this.game, this.level)
        level.gameWon();
        this.game.add.image(this.game.world.centerX - 128, this.game.world.centerY + 250, 'start');
    },
	startAgain: function () {
        this.game.menuAudio.destroy(true);
        this.clickAudio.play();
        this.clickAudio.destroy(true);
		this.state.start('MainMenu');
	},
    update: function () {
        if (this.enterKey.isDown) {
		   this.startAgain(); 
        }
    }
};

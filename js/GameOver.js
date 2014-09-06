Game.GameOver = function (game) {};

Game.GameOver.prototype = {
	create: function () {

        this.game.stage.backgroundColor = 0x000000;

        this.gameOverAudio = this.game.add.audio('game_over', 1);
        this.gameOverAudio.play();

        this.game.menuAudio = this.game.add.audio('menu', 0.5, true);
        this.game.time.events.add(Phaser.Timer.SECOND, this.playAudio, this);

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
        level.gameLost();
        this.game.add.image(this.game.world.centerX + 100, this.game.world.centerY + 100, 'next');
    },
	startAgain: function () {
        this.clickAudio.play();
        this.clickAudio.destroy();
		this.state.start('LevelSplash');
	},
    update: function () {
        if (this.enterKey.isDown) {
		   this.startAgain(); 
        }
    }
};

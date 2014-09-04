Game.GameOver = function (game) {};

Game.GameOver.prototype = {
	create: function () {

        this.game.stage.backgroundColor = 0x000000;

        this.menuAudio = this.game.add.audio('menu');
        this.menuAudio.play('', 0, 1, true);

        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bg');

        var bg = this.game.add.bitmapData(this.game.width, this.game.height);
        bg.fill(0, 0, 0, 0.6);
        this.game.add.sprite(0, 0, bg);

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.build();

        this.input.onDown.addOnce(this.startAgain, this);
        this.clickAudio = this.game.add.audio('click');
	},
    build: function () {
        var level = new Game.Level(this.game, this.level)
        level.gameLost();
        this.game.add.image(this.game.world.centerX - 128, this.game.world.centerY + 250, 'start');
    },
	startAgain: function () {
        this.menuAudio.stop();
        this.clickAudio.play();
		this.state.start('LevelSplash');
	},
    update: function () {
        if (this.enterKey.isDown) {
		   this.startAgain(); 
        }
    }
};

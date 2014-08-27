Game.MainMenu = function (game) {};

Game.MainMenu.prototype = {
	create: function () {

        this.game.stage.backgroundColor = 0x000000;

        this.menuAudio = this.game.add.audio('menu');
        this.menuAudio.play('', 0, 1, true);

        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bg');

        var bg = this.game.add.bitmapData(this.game.width, this.game.height);
        bg.fill(0, 0, 0, 0.6);
        this.game.add.sprite(0, 0, bg);

        this.game.add.image(this.game.world.centerX - 125, this.game.world.centerY - 125, 'logo');
        this.game.add.image(this.game.world.centerX - 128, this.game.world.centerY + 125 + 20, 'start');

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.input.onDown.addOnce(this.startGame, this);
        this.clickAudio = this.game.add.audio('click');
	},
	startGame: function (pointer) {
        this.menuAudio.stop();
        this.clickAudio.play();
		this.state.start('LevelMenu');
	},
    update: function () {
        if (this.enterKey.isDown) {
            this.startGame();
        }
    }
};

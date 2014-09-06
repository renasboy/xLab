Game.MainMenu = function (game) {};

Game.MainMenu.prototype = {
	create: function () {

        this.game.stage.backgroundColor = 0x000000;

        this.menuAudio = this.game.add.audio('menu', 0.5);
        this.menuAudio.play();

        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bg');

        var bg = this.game.add.bitmapData(this.game.width, this.game.height);
        bg.fill(0, 0, 0, 0.6);
        this.game.add.sprite(0, 0, bg);

        this.game.add.image(this.game.world.centerX - 225, this.game.world.centerY - 225, 'logo');

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.input.onDown.addOnce(this.startGame, this);
        this.clickAudio = this.game.add.audio('click');
	},
	startGame: function (pointer) {
        this.menuAudio.destroy(true);
        this.clickAudio.play();
        this.clickAudio.destroy(true);
		this.state.start('HowToPlay');
	},
    update: function () {
        if (this.enterKey.isDown) {
            this.startGame();
        }
    }
};

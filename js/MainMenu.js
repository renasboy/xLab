Game.MainMenu = function (game) {};

Game.MainMenu.prototype = {
	create: function () {

        this.game.stage.backgroundColor = 0x000000;

        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bg');
        this.game.add.image(this.game.world.centerX - 125, this.game.world.centerY - 125, 'logo');
        this.game.add.image(this.game.world.centerX - 128, this.game.world.centerY + 125 + 20, 'start');

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.input.onDown.addOnce(this.startGame, this);
	},
	startGame: function (pointer) {
		this.state.start('Game');
	},
    update: function () {
        if (this.enterKey.isDown) {
            this.startGame();
        }
    }
};

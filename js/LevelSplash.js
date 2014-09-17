Game.LevelSplash = function (game) {};

Game.LevelSplash.prototype = {
    init: function (level) {
        if (!level) {
            return;
        }
        this.level = level;
    },
	create: function () {

        ga('send', 'event', 'LevelSplash', 'Load', this.level);

        this.game.stage.backgroundColor = 0x152736;

        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bg');

        var bg = this.game.add.bitmapData(this.game.width, this.game.height);
        bg.fill(0, 0, 0, 0.6);
        this.game.add.sprite(0, 0, bg);

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.build();

        this.input.onDown.addOnce(this.startLevel, this);
        this.clickAudio = this.game.add.audio('click');
	},
    build: function () {
        var level = new Game.Level(this.game, this.level)
        level.showLevelInfo();
        this.game.add.image(this.game.world.centerX + 100, this.game.world.centerY + 100, 'next');
    },
	startLevel: function () {
        this.game.menuAudio.destroy(true);
        this.clickAudio.play();
        this.clickAudio.destroy(true);
		this.state.start('Game', true, false, this.level);
	},
    update: function () {
        if (this.enterKey.isDown) {
            this.startLevel();
        }
    }
};

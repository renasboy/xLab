Game.MainMenu = function (game) {
    this.mute = localStorage.getItem('mute') == 'true' ? true : false;
};

Game.MainMenu.prototype = {
	create: function () {

        ga('send', 'event', 'MainMenu', 'Load');

        this.game.stage.backgroundColor = 0x152736;

        this.game.menuAudio = this.game.add.audio('menu', 0.5, true);
        if (!this.mute) {
            this.game.menuAudio.play();
        }

        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bg');

        var bg = this.game.add.bitmapData(this.game.width, this.game.height);
        bg.fill(0, 0, 0, 0.6);
        this.game.add.sprite(0, 0, bg);

        var img = this.game.add.image(0, 0, 'logo');
        img.x = this.game.world.centerX - img.width / 2;
        img.y = this.game.world.centerY - img.height / 2; 

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.input.onDown.addOnce(this.startGame, this);
        this.clickAudio = this.game.add.audio('click');

        // hack to load the font here
        var style = { font: '1px FontExtraBold, Helvetica', fill: '#fff', align: 'center' };
        this.game.add.text(-10, -10, 'font hack', style);
	},
	startGame: function (pointer) {
        this.clickAudio.play();
        this.clickAudio.destroy(true);
        var maxLevel = localStorage.getItem('max_level') ? localStorage.getItem('max_level') : 1;
        if (maxLevel > 1) {
		    this.state.start('LevelMenu');
        }
        else {
            this.state.start('HowToPlay');
        }
	},
    update: function () {
        if (this.enterKey.isDown) {
            this.startGame();
        }
    }
};

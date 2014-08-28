Game.LevelMenu = function (game) {};

Game.LevelMenu.prototype = {
	create: function () {

        this.maxLevel = localStorage.getItem('max_level') ? localStorage.getItem('max_level') : 1;

        this.game.stage.backgroundColor = 0x000000;

        this.menuAudio = this.game.add.audio('menu');
        this.menuAudio.play('', 0, 1, true);

        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bg');

        var bg = this.game.add.bitmapData(this.game.width, this.game.height);
        bg.fill(0, 0, 0, 0.6);
        this.game.add.sprite(0, 0, bg);

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.build();

        this.clickAudio = this.game.add.audio('click');
	},
    build: function () {
        // TODO this should be taken from Game.Level
        var nLevels = 12;
        var nColumns = 4;
        var nRows = Math.round(nLevels / nColumns);
        var columnWidth = this.game.width / (nColumns + 1);
        var rowHeight = this.game.height / (nRows + 1);
        var x = columnWidth;
        var y = rowHeight;
        var style = { font: '32px Dosis-Bold', fill: '#fff', align: 'center' };
        for (var i = 1; i <= nLevels; i++) {
            if (i <= this.maxLevel) {
                var button = this.game.add.button(x, y, 'tube1', this.startLevel, this);
                button.level = i;
                var text = this.game.add.text(x, y, i, style);
            }
            else {
                var button = this.game.add.image(x, y, 'tube1');
                var text = this.game.add.text(x, y, 'LOCKED', style);
            }
            text.x -= text.width / 2;
            text.y += text.height / 2;

            button.x -= button.width / 2;
            button.y -= button.height / 2;
            
            x += columnWidth;
            if (i % nColumns == 0) {
                x = columnWidth;
                y += rowHeight;
            }
        }
    },
	startLevel: function (button) {
        this.menuAudio.stop();
        this.clickAudio.play();
		this.state.start('Game', true, false, button.level);
	},
    update: function () {
        if (this.enterKey.isDown) {
            this.state.start('Game', true, false, this.maxLevel);
        }
    }
};

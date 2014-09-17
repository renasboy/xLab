Game.LevelMenu = function (game) {};

Game.LevelMenu.prototype = {
	create: function () {

        this.maxLevel = localStorage.getItem('max_level') ? localStorage.getItem('max_level') : 1;

        ga('send', 'event', 'LevelMenu', 'Load', this.maxLevel);

        this.game.stage.backgroundColor = 0x152736;

        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bg');

        var bg = this.game.add.bitmapData(this.game.width, this.game.height);
        bg.fill(0, 0, 0, 0.6);
        this.game.add.sprite(0, 0, bg);

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        var level = new Game.Level(this.game, 1);
        this.nLevels = level.nLevels; 

        this.build();

        this.clickAudio = this.game.add.audio('click');
	},
    build: function () {
        var nColumns = 6;
        var nRows = Math.round(this.nLevels / nColumns);
        var columnWidth = this.game.width / (nColumns + 1);
        var rowHeight = this.game.height / (nRows + 1);
        var x = columnWidth;
        var y = rowHeight;
        var style = { font: '50px FontExtraBold, Helvetica', fill: '#fff', align: 'center' };
        var text = this.game.add.text(0, 40, 'Level selector', style);
        text.x = this.game.width / 2 - text.width / 2;

        var style = { font: '34px FontExtraBold, Helvetica', fill: '#fff', align: 'center' };
        for (var i = 1; i <= this.nLevels; i++) {
            if (i <= this.maxLevel) {
                var bitmap = this.game.make.bitmapData(128, 128);
                bitmap.alphaMask('fill_1', 'tube1_mask', new Phaser.Rectangle(0, 50, 128, 128));
                bitmap.alphaMask(bitmap, 'tube1');
                var button = this.game.add.button(x, y, bitmap, this.startLevel, this);
                button.level = i;
                var text = this.game.add.text(x, y, i, style);
            }
            else {
                var button = this.game.add.image(x, y, 'tube1');
                var text = this.game.add.text(x, y, '?', style);
            }
            text.x -= text.width / 3;
            text.y += text.height / 10;

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
        this.clickAudio.play();
        this.clickAudio.destroy(true);
		this.state.start('LevelSplash', true, false, button.level);
	},
    update: function () {
        if (this.enterKey.isDown) {
            this.startLevel({level: this.maxLevel});
        }
    }
};

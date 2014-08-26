var Game = {};

Game.Boot = function (game) {};

Game.Boot.prototype = {
    preload: function () {
        this.load.image('loading', 'img/loading.png');
    },
    create: function () {
        if (this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 568;
            this.scale.minHeight = 320;
            this.scale.maxWidth = 852;
            this.scale.maxHeight = 480;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize(true);
        }
        else {
            //this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setScreenSize();
            this.game.scale.refresh();
            //this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            //this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            /*
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 480;
            this.scale.minHeight = 260;
            this.scale.maxWidth = 1024;
            this.scale.maxHeight = 768;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            //this.scale.hasResized.add(this.gameResized, this);
            //this.scale.setScreenSize(true);
            */
        }
        this.state.start('Preloader');
    },
    enterIncorrectOrientation: function () {
        document.getElementById('orientation').style.display = 'block';
    },
    leaveIncorrectOrientation: function () {
        document.getElementById('orientation').style.display = 'none';
    }
};

Game.Tube = function (game, tube, x, speed, maxFill) {
    
    this.imgFill = 'fill_0';
    this.imgMask = tube + '_mask';
    this.imgTube = tube;
    this.initialPosition = x;
    this.maxColors = maxFill;
    this.dropFill = 80 / this.maxColors;
    this.currentColor = 0;
    this.finalcolor = 0;
    this.alive = true;
    this.speed = speed;

    this.rollingPosition = 32;

    this.size = 128;
    this.full = false;

    this.mixIndex = 0;
    this.colors = [];

    // need this
    this.game = game;

    // create tube
    this.bitmap = this.game.make.bitmapData(this.size, this.size);
    this.bitmap.alphaMask(this.imgFill, this.imgMask, new Phaser.Rectangle(0, this.size, this.size, this.size));
    this.bitmap.alphaMask(this.bitmap, this.imgTube);

    var style = { font: '24px FontExtraBold, Helvetica', fill: '#fff', align: 'center' };
    this.counterText = this.game.add.text(0, 0, '' + this.maxColors, style);

    Phaser.Sprite.call(this, game, -this.initialPosition, this.game.height - this.size - this.rollingPosition + 5, this.bitmap, 0);

    this.colorWheel = new Game.ColorWheel(this.game);

    this.dropAudio = this.game.add.audio('drop');

    this.build();

    return this;
};

Game.Tube.prototype = Object.create(Phaser.Sprite.prototype);
Game.Tube.prototype.constructor = Game.Tube;

Game.Tube.prototype.build = function () {
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(30, 1, this.size / 2 - 15, 0); //collision area
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
    this.body.checkCollision.down = false;
    this.body.velocity.x = this.speed;
    this.body.bounce = new Phaser.Pointer(0, 0);
};

Game.Tube.prototype.pause = function () {
    this.body.immovable = true;
    this.body.enable = false;
}

Game.Tube.prototype.unpause = function () {
    this.body.immovable = false;
    this.body.enable = true;
}

Game.Tube.prototype.fill = function (color) {
    if (!this.canFill()) {
        return;
    }
    this.colors.push(color);
    this.counterText.text = '' + this.maxColors - this.colors.length;
    //console.log(color);
    //console.log(this.colorWheel.colorPoints[color]);
    this.mixIndex += this.colorWheel.colorPoints[color];
    //console.log(this.mixIndex);
    this.currentColor = this.colorWheel.getMix(this.mixIndex);
    this.imgFill = 'fill_' + this.currentColor;
    //console.log(this.imgFill);
    var diff = this.size - 6 - this.dropFill * this.colors.length;
    this.bitmap.alphaMask(this.imgFill, this.imgMask, new Phaser.Rectangle(0, diff, this.size, this.size));
    this.bitmap.alphaMask(this.bitmap, this.imgTube);
    this.dropAudio.play();
    if (this.colors.length == this.maxColors) {
        this.finalColor = this.currentColor;
        this.full = true;
    }
};

Game.Tube.prototype.canFill = function () {
    return this.colors.length < this.maxColors;
}

Game.Tube.prototype.canFillWith = function (color, r, y, b) {
    for (item in this.colorWheel.mixMap) {
        if (this.colorWheel.mixMap[item] != color ||
            item <= this.mixIndex) {
            continue;
        }
        var diff = item - this.mixIndex;
        var diff_string ='000' + diff;
        var ryb = diff_string.substring(diff_string.length - 3, diff_string.length).split('');
        var sum = 0;
        for (index in ryb) {
            sum += parseInt(ryb[index]);
        }
        if (sum <= this.maxColors - this.colors.length &&
            r >= ryb[0] &&
            y >= ryb[1] &&
            b >= ryb[2]) {
            return true;
        }
    }
    return false;
};

Game.Tube.prototype.update = function () {
    if (this.body.x > this.game.width) {
        this.body.x = -this.initialPosition;
    }
    if (this.body.y + this.size + 5 > this.game.height - this.rollingPosition) {
        this.body.y = this.game.height - this.size - this.rollingPosition + 5;
    }
    this.counterText.x = this.body.x + this.size / 2;
    this.counterText.y = this.body.y;
};

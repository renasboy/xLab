Game.Bottle = function (game, bottle, drops, speed, xBottle, yButton) {

    this.xBottle = xBottle;
    this.yButton = yButton;
    this.game = game;

    this.currentParticles = drops;
    this.maxParticles = drops;

    this.bottleSize = 142;
    this.buttonSize = 142;
    this.dropSize = 24;

    this.empty = false;

    this.dropTime = 0;
    this.dropTimeout = 300;
    this.dropSpeed = speed;

    this.imgBottle = bottle;
    this.imgButton = 'button';
    this.imgButtonMask = 'button_mask';
    this.imgFill = 'fill_' + bottle.replace(/primary/, '');
    this.imgParticle = bottle + '_particle';

    this.bottleAudio = this.game.add.audio('bottle');

    this.build();

    return this;
};

Game.Bottle.prototype.constructor = Game.Bottle;

Game.Bottle.prototype.build = function () {
    this.bottle = this.game.add.sprite(this.xBottle - this.bottleSize / 2, 0, this.imgBottle);

    this.bitmap = this.game.make.bitmapData(this.buttonSize, this.buttonSize);
    this.bitmap.alphaMask(this.imgFill, this.imgButtonMask, new Phaser.Rectangle(0, 10, this.buttonSize, this.buttonSize));
    this.bitmap.alphaMask(this.bitmap, this.imgButton);

    this.button = this.game.add.sprite(this.game.width - this.buttonSize, this.yButton - this.buttonSize / 2, this.bitmap);
    this.button.inputEnabled = true;
    this.button.events.onInputDown.add(this.drop, this);

    var style = { font: '24px FontExtraBold, Helvetica', fill: '#fff', align: 'center' };
    this.counterText = this.game.add.text(this.game.width - this.buttonSize - 50, this.yButton - this.buttonSize / 4, '' + this.currentParticles, style);

    // create emitters
    this.emitter = this.game.add.emitter(0, 0, 1);
    this.emitter.at(this.bottle);
    this.emitter.makeParticles(this.imgParticle, [0], this.maxParticles, true, false); // another true for world collision
    this.emitter.minParticleSpeed.setTo(0, this.dropSpeed);
    this.emitter.maxParticleSpeed.setTo(0, this.dropSpeed);
    this.emitter.setSize(1, 1);
    this.emitter.setRotation(0, 0);
    this.emitter.lifespan = 0;
    this.emitter.emitX += this.bottleSize / 2 - this.dropSize / 2;
    this.emitter.emitY += this.bottleSize / 4 * 3;
};

Game.Bottle.prototype.pause = function () {
    this.button.inputEnabled = false;
};

Game.Bottle.prototype.unpause = function () {
    this.button.inputEnabled = true;
};

Game.Bottle.prototype.drop = function () {
    if (this.game.time.now < this.dropTime ||
        this.currentParticles <= 0) {
        if (this.currentParticles <= 0) {
            this.empty = true;
        }
        return;
    }
    var diff = (65 / this.maxParticles) * this.currentParticles;
    this.bitmap.alphaMask(this.imgFill, this.imgButtonMask, new Phaser.Rectangle(0, 75 - diff, this.buttonSize, this.buttonSize));
    this.bitmap.alphaMask(this.bitmap, this.imgButton);
    this.emitter.emitParticle();
    this.currentParticles--;
    this.counterText.text = this.currentParticles + '';
    this.dropTime = this.game.time.now + this.dropTimeout;
    this.bottleAudio.play();
};

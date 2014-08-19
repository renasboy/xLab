Game.Bottle = function (game, bottle, xBottle, yButton) {

    this.xBottle = xBottle;
    this.yButton = yButton;
    this.game = game;

    this.maxParticles = 50;

    this.bottleSize = 142;
    this.buttonSize = 142;
    this.dropSize = 60;

    this.dropTime = 0;
    this.dropTimeout = 300;
    this.dropSpeed = 400;

    this.imgBottle = bottle;
    this.imgButton = bottle + '_button';
    this.imgParticle = bottle + '_particle';

    this.bottleAudio = this.game.add.audio('bottle');

    this.build();

    return this;
};

Game.Bottle.prototype.constructor = Game.Bottle;

Game.Bottle.prototype.build = function () {
    this.bottle = this.game.add.sprite(this.xBottle - this.bottleSize / 2, 0, this.imgBottle);
    this.button = this.game.add.button(0, this.yButton - this.buttonSize / 2, this.imgButton, this.drop, this);

    var style = { font: '24px Dosis-Bold', fill: '#fff', align: 'center' };
    this.counterText = this.game.add.text(this.buttonSize, this.yButton - this.buttonSize / 4, '' + this.maxParticles, style);

    // create emitters
    this.emitter = this.game.add.emitter(0, 0, 1);
    this.emitter.at(this.bottle);
    this.emitter.makeParticles(this.imgParticle, [0], this.maxParticles, true, false); // another true for world collision
    this.emitter.minParticleSpeed.setTo(0, this.dropSpeed);
    this.emitter.maxParticleSpeed.setTo(0, this.dropSpeed);
    this.emitter.setSize(20, 5, this.size / 2 - 10, this.size - 5); //collision area
    this.emitter.setRotation(0, 0);
    this.emitter.lifespan = 0;
    this.emitter.emitX += this.bottleSize / 2 - this.dropSize / 3;
    this.emitter.emitY += this.bottleSize / 4 * 3;
};

Game.Bottle.prototype.drop = function () {
    if (this.game.time.now < this.dropTime ||
        this.maxParticle <= 0) {
        return;
    }
    this.emitter.emitParticle();
    this.maxParticles--;
    this.counterText.text = this.maxParticles + '';
    this.dropTime = this.game.time.now + this.dropTimeout;
    this.bottleAudio.play();
};

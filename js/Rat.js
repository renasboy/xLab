Game.Rat = function (game, rat, x, speed) {
    
    this.imgRat = rat;
    this.initialPosition = x;
    this.speed = speed;

    this.rollingPosition = 32;

    this.size = 128;

    // need this
    this.game = game;

    Phaser.Sprite.call(this, game, -this.initialPosition, this.game.height - this.size - this.rollingPosition + 20, this.imgRat, 0);

    this.ratAudio = this.game.add.audio('rat');

    this.build();

    return this;
};

Game.Rat.prototype = Object.create(Phaser.Sprite.prototype);
Game.Rat.prototype.constructor = Game.Rat;

Game.Rat.prototype.build = function () {
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(100, 70, this.size / 2 - 50, this.size - 70); //collision area
    this.body.velocity.x = this.speed;
    this.body.bounce = new Phaser.Pointer(0, 0);
};

Game.Rat.prototype.pause = function () {
    this.body.immovable = true;
    this.body.enable = false;
}

Game.Rat.prototype.unpause = function () {
    this.body.immovable = false;
    this.body.enable = true;
}

Game.Rat.prototype.hit = function (color) {
    this.ratAudio.play();
};

Game.Rat.prototype.update = function () {
    if (this.body.x > this.game.width) {
        this.body.x = -this.initialPosition;
    }
    if (this.body.y - 58 + this.size  + 20 > this.game.height - this.rollingPosition) {
        this.body.y = this.game.height - 70 - this.rollingPosition + 20;
    }
};

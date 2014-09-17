Game.Rat = function (game, rat, x, speed) {
    
    this.imgRat = rat + '_animation';
    this.initialPosition = x;
    this.speed = speed;

    this.rollingPosition = 32;

    this.imgWidth = 128;
    this.imgHeight = 174;

    // need this
    this.game = game;

    Phaser.Sprite.call(this, game, -this.initialPosition, this.game.height - this.imgHeight - this.rollingPosition + 20, this.imgRat, 0);
    this.animations.add('sleep');
    this.animations.play('sleep', 6, true);

    this.ratAudio = this.game.add.audio('rat');

    this.build();

    return this;
};

Game.Rat.prototype = Object.create(Phaser.Sprite.prototype);
Game.Rat.prototype.constructor = Game.Rat;

Game.Rat.prototype.build = function () {
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(70, 1, this.imgWidth / 2 - 35, this.imgHeight - 70); //collision area
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
    this.body.checkCollision.down = false;
    this.body.velocity.x = this.speed;
    this.body.bounce = new Phaser.Pointer(0, 0);
};

Game.Rat.prototype.pause = function () {
    this.body.immovable = true;
    this.body.enable = false;
    this.animations.stop();
}

Game.Rat.prototype.unpause = function () {
    this.body.immovable = false;
    this.body.enable = true;
    this.animations.play('sleep', 6, true);
}

Game.Rat.prototype.hit = function (color) {
    this.ratAudio.play();
};

Game.Rat.prototype.update = function () {
    if (this.body.x > this.game.width) {
        this.body.x = -this.initialPosition;
    }
    if (this.body.y - 58 + this.imgHeight  + 20 > this.game.height - this.rollingPosition) {
        this.body.y = this.game.height - 70 - this.rollingPosition + 20;
    }
};

Game.Rat = function (game, rat, x, speed) {
    
    this.imgRat = rat;
    this.initialPosition = x;
    this.speed = speed;

    this.rollingPosition = 32;

    this.size = 112;

    // need this
    this.game = game;

    Phaser.Sprite.call(this, game, -this.initialPosition, this.game.height - this.size - this.rollingPosition, this.imgRat, 0);

    this.ratAudio = this.game.add.audio('rat');

    this.build();

    return this;
};

Game.Rat.prototype = Object.create(Phaser.Sprite.prototype);
Game.Rat.prototype.constructor = Game.Rat;

Game.Rat.prototype.build = function () {
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    //this.body.setSize(20, 5, this.size / 2 - 10, 0); //collision area
    this.body.velocity.x = this.speed;
    this.body.bounce = new Phaser.Pointer(0, 0);
};

Game.Rat.prototype.hit = function (color) {
    this.ratAudio.play();
};

Game.Rat.prototype.update = function () {
    if (this.body.x > this.game.width) {
        this.body.x = -this.initialPosition;
    }
    if (this.body.y + this.size > this.game.height - this.rollingPosition) {
        this.body.y = this.game.height - this.size - this.rollingPosition;
    }
};

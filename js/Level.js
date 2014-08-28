Game.Level = function (game, level) {
    this.game = game;
    for (item in this.levels[level]) {
        this[item] = this.levels[level][item];
    }

    this.img = 'level';
    this.levelImg = null;

    this.imgGameover = 'game_over';
    this.imgGameWon = 'game_won';
    this.imgLevelComplete = 'level_complete';

    this.showLevelInfo();

    return this;
};

Game.Level.prototype.hideInfo = function () {
    this.game.add.tween(this.levelImg).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    this.game.add.tween(this.levelBg).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
};

Game.Level.prototype.showInfo = function (img, hide) {
    var bg = this.game.add.bitmapData(this.game.width, this.game.height);
    bg.fill(0, 0, 0, 0.6);
    this.levelBg = this.game.add.sprite(0, 0, bg);

    this.levelImg = this.game.add.image(0, 0, img);
    this.levelImg.x = this.game.world.centerX - (this.levelImg.width / 2);
    this.levelImg.y = this.game.world.centerY - (this.levelImg.height / 2);
    if (hide) {
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.hideInfo, this); 
    }
};

Game.Level.prototype.showLevelInfo = function () {
    var bg = this.game.add.bitmapData(this.game.width, this.game.height);
    bg.fill(0, 0, 0, 0.6);
    this.levelBg = this.game.add.sprite(0, 0, bg);

    this.levelImg = this.game.add.image(0, 0, this.img);
    this.levelImg.x = this.game.world.centerX - (this.levelImg.width / 2);
    this.levelImg.y = this.game.world.centerY - (this.levelImg.height / 2);

    var style = { font: '32px Dosis-Bold', fill: '#fff', align: 'center' };
    this.levelText = this.game.add.text(this.levelImg.x, this.levelImg.y, this.name, style);
    this.levelText.x = this.levelImg.x + (this.levelImg.width - this.levelText.width) / 2;
    this.levelText.y = this.levelImg.y + 35;

    var style = { font: '32px Dosis-Bold', fill: '#999', align: 'center' };
    this.levelMaxFillText = this.game.add.text(this.levelImg.x, this.levelImg.y, '' + this.maxTubeFill, style);
    this.levelMaxFillText.x = (this.levelImg.x + (this.levelImg.width - this.levelMaxFillText.width) / 2) - 20;
    this.levelMaxFillText.y = this.levelImg.y + 170;

    this.levelTubes = [];
    for (item in this.colors) {
        this.bitmap = this.game.make.bitmapData(128, 128);
        this.bitmap.alphaMask('fill_' + this.colors[item].color, 'tube1_mask', new Phaser.Rectangle(0, 50, 128, 128));
        this.bitmap.alphaMask(this.bitmap, 'tube1');
        this.levelTube = this.game.add.image(this.levelImg.x, this.levelImg.y, this.bitmap);
        this.levelTube.y = this.levelImg.y + 250;
        this.levelTubes.push(this.levelTube);
    }

    for (item in this.levelTubes) {
        var gutter = (this.levelImg.width - 128 * this.levelTubes.length) / (this.levelTubes.length + 1);
        this.levelTubes[item].x = this.levelImg.x + gutter + (item * (128 + gutter));
    }
    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.hideLevelInfo, this); 
};

Game.Level.prototype.hideLevelInfo = function () {
    this.hideInfo();
    this.game.add.tween(this.levelText).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    this.game.add.tween(this.levelMaxFillText).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    for (item in this.levelTubes) {
        this.game.add.tween(this.levelTubes[item]).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    }
};

Game.Level.prototype.gameLost = function () {
    this.showInfo('game_over');
};

Game.Level.prototype.gameWon = function () {
    this.showInfo('game_won');
};

Game.Level.prototype.levelComplete = function () {
    this.showInfo('level_complete');
};

Game.Level.prototype.levels = [

    { name:'No Level' },

    {
        name: 'Level 1',
        maxTubeFill: 1,
        drops: 20,
        speed: 200,
        colors: [
            { color: 3 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: [
            { type: 'rat1', x: 200 },
            { type: 'rat1', x: 550 }
        ]
    },

    {
        name: 'Level 2',
        maxTubeFill: 1,
        drops: 20,
        speed: 200,
        colors: [
            { color: 2 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: [
            { type: 'rat1', x: 200 },
            { type: 'rat1', x: 550 }
        ]
    },

    {
        name: 'Level 3',
        maxTubeFill: 1,
        drops: 20,
        speed: 200,
        colors: [
            { color: 1 },
            { color: 2 },
            { color: 3 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: [
            { type: 'rat1', x: 200 },
            { type: 'rat1', x: 550 }
        ]
    },


    {
        name: 'Level 4',
        maxTubeFill: 2,
        drops: 20,
        speed: 200,
        colors: [
            { color: 2 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: [
            { type: 'rat1', x: 200 },
            { type: 'rat1', x: 550 }
        ]
    }, 

    {
        name: 'Level 5',
        maxTubeFill: 2,
        drops: 20,
        speed: 200,
        colors: [
            { color: 1 },
            { color: 2 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: [
            { type: 'rat1', x: 200 },
            { type: 'rat1', x: 550 }
        ]
    }, 

    {
        name: 'Level 6',
        maxTubeFill: 2,
        drops: 20,
        speed: 200,
        colors: [
            { color: 4 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: [
            { type: 'rat1', x: 200 },
            { type: 'rat1', x: 550 }
        ]
    },

    {
        name: 'Level 7',
        maxTubeFill: 2,
        drops: 20,
        speed: 200,
        colors: [
            { color: 5 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: [
            { type: 'rat1', x: 200 },
            { type: 'rat1', x: 550 }
        ]
    },

    {
        name: 'Level 8',
        maxTubeFill: 2,
        drops: 20,
        speed: 200,
        colors: [
            { color: 6 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: [
            { type: 'rat1', x: 200 },
            { type: 'rat1', x: 550 }
        ]
    },

    {
        name: 'Level 9',
        maxTubeFill: 2,
        drops: 20,
        speed: 200,
        colors: [
            { color: 4 },
            { color: 5 },
            { color: 6 },
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: [
            { type: 'rat1', x: 200 },
            { type: 'rat1', x: 550 }
        ]
    },

    {
        name: 'Level 10',
        maxTubeFill: 3,
        drops: 20,
        speed: 200,
        colors: [
            { color: 1 },
            { color: 2 },
            { color: 3 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: [
            { type: 'rat1', x: 200 },
            { type: 'rat1', x: 550 }
        ]
    },

    {
        name: 'Level 11',
        maxTubeFill: 4,
        drops: 20,
        speed: 200,
        colors: [
            { color: 1 },
            { color: 2 },
            { color: 3 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: [
            { type: 'rat1', x: 200 },
            { type: 'rat1', x: 550 }
        ]
    },

    {
        name: 'Level 12',
        maxTubeFill: 4,
        drops: 20,
        speed: 200,
        colors: [
            { color: 4 },
            { color: 7 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: [
            { type: 'rat1', x: 200 },
            { type: 'rat1', x: 550 }
        ]
    }
];

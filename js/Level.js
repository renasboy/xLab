Game.Level = function (game, level) {
    this.game = game;
    for (item in this.levels[level]) {
        this[item] = this.levels[level][item];
    }

    this.img = 'level';
    this.levelImg = null;

    this.nLevels = this.levels.length - 1; // zero is no level

    this.imgGameover = 'game_over';
    this.imgGameWon = 'game_won';
    this.imgLevelComplete = 'level_complete';
    this.imgHelp = 'color_help';
    this.imgPause = 'pause_screen';

    return this;
};

Game.Level.prototype.hideInfo = function () {
    this.levelImg.destroy();
    this.levelBg.destroy();
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

Game.Level.prototype.showLevelObjective = function () {
    var size = 32;
    this.levelTubes = [];
    for (item in this.colors) {
        this.bitmap = this.game.make.bitmapData(32, 32);
        this.bitmap.alphaMask('fill_' + this.colors[item].color, 'tube1_mask', new Phaser.Rectangle(0, 10, 32, 32), new Phaser.Rectangle(0, 0, 32, 32));
        this.bitmap.alphaMask(this.bitmap, 'tube1', new Phaser.Rectangle(0, 0, 32, 32), new Phaser.Rectangle(0, 0, 32, 32));
        this.levelTube = this.game.add.image(0, 0, this.bitmap);
        this.levelTube.y = 120;
        this.levelTubes.push(this.levelTube);
    }

    for (item in this.levelTubes) {
        var gutter = (161 - 32 * this.levelTubes.length) / (this.levelTubes.length + 1);
        this.levelTubes[item].x = 10 + gutter + (item * (32 + gutter));
    }
};

Game.Level.prototype.showLevelInfo = function () {
    this.levelImg = this.game.add.image(0, 0, this.img);
    this.levelImg.x = this.game.world.centerX - (this.levelImg.width / 2);
    this.levelImg.y = this.game.world.centerY - (this.levelImg.height / 2);

    var style = { font: '32px FontExtraBold, Helvetica', fill: '#fff', align: 'center' };
    this.levelText = this.game.add.text(this.levelImg.x, this.levelImg.y, this.name, style);
    this.levelText.x = this.levelImg.x + (this.levelImg.width - this.levelText.width) / 2;
    this.levelText.y = this.levelImg.y + 28;

    var style = { font: '40px FontExtraBold, Helvetica', fill: '#2d475a', align: 'center' };
    this.levelMaxFillText = this.game.add.text(this.levelImg.x, this.levelImg.y, '' + this.maxTubeFill, style);
    this.levelMaxFillText.x = (this.levelImg.x + (this.levelImg.width - this.levelMaxFillText.width) / 2) - 20;
    this.levelMaxFillText.y = this.levelImg.y + 150;

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
};

Game.Level.prototype.gameLost = function () {
    this.showInfo(this.imgGameover);
};

Game.Level.prototype.gameWon = function () {
    this.showInfo(this.imgGameWon);
};

Game.Level.prototype.help = function () {
    this.showInfo(this.imgHelp);
};

Game.Level.prototype.pause = function () {
    this.showInfo(this.imgPause);
};

Game.Level.prototype.levelComplete = function (score) {
    this.showInfo(this.imgLevelComplete);
    var style = { font: '100px FontExtraBold, Helvetica', fill: '#fff', align: 'center' };
    var text = this.game.add.text(520, 320, score, style);
    text.x = this.game.width / 2 - text.width / 2;
};

Game.Level.prototype.levels = [

    { name:'No Level' },

    {
        name: 'Level 1',
        maxTubeFill: 1,
        drops: 50,
        rollingSpeed: 100,
        dropSpeed: 500,
        colors: [
            { color: 1 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    },

    {
        name: 'Level 2',
        maxTubeFill: 1,
        drops: 50,
        rollingSpeed: 100,
        dropSpeed: 500,
        colors: [
            { color: 2 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    },

    {
        name: 'Level 3',
        maxTubeFill: 1,
        drops: 50,
        rollingSpeed: 100,
        dropSpeed: 500,
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
        rats: []
    },


    {
        name: 'Level 4',
        maxTubeFill: 2,
        drops: 50,
        rollingSpeed: 100,
        dropSpeed: 500,
        colors: [
            { color: 1 },
            { color: 3 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    }, 

    {
        name: 'Level 5',
        maxTubeFill: 2,
        drops: 50,
        rollingSpeed: 100,
        dropSpeed: 500,
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
        rats: []
    }, 

    {
        name: 'Level 6',
        maxTubeFill: 2,
        drops: 50,
        rollingSpeed: 100,
        dropSpeed: 500,
        colors: [
            { color: 4 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    },

    {
        name: 'Level 7',
        maxTubeFill: 2,
        drops: 50,
        rollingSpeed: 100,
        dropSpeed: 500,
        colors: [
            { color: 5 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    },

    {
        name: 'Level 8',
        maxTubeFill: 2,
        drops: 50,
        rollingSpeed: 100,
        dropSpeed: 500,
        colors: [
            { color: 6 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    },

    {
        name: 'Level 9',
        maxTubeFill: 2,
        drops: 50,
        rollingSpeed: 100,
        dropSpeed: 500,
        colors: [
            { color: 4 },
            { color: 5 },
            { color: 6 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    },

    {
        name: 'Level 10',
        maxTubeFill: 2,
        drops: 20,
        rollingSpeed: 100,
        dropSpeed: 500,
        colors: [
            { color: 1 },
            { color: 2 },
            { color: 6 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    },

    {
        name: 'Level 11',
        maxTubeFill: 2,
        drops: 20,
        rollingSpeed: 100,
        dropSpeed: 500,
        colors: [
            { color: 1 },
            { color: 3 },
            { color: 5 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    },

    {
        name: 'Level 12',
        maxTubeFill: 2,
        drops: 20,
        rollingSpeed: 100,
        dropSpeed: 500,
        colors: [
            { color: 2 },
            { color: 3 },
            { color: 4 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    },

    {
        name: 'Level 13',
        maxTubeFill: 4,
        drops: 20,
        rollingSpeed: 150,
        dropSpeed: 500,
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
        rats: []
    },

    {
        name: 'Level 14',
        maxTubeFill: 4,
        drops: 20,
        rollingSpeed: 150,
        dropSpeed: 500,
        colors: [
            { color: 4 },
            { color: 5 },
            { color: 6 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    },

    {
        name: 'Level 15',
        maxTubeFill: 4,
        drops: 10,
        rollingSpeed: 150,
        dropSpeed: 500,
        colors: [
            { color: 1 },
            { color: 5 },
            { color: 4 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    },

    {
        name: 'Level 16',
        maxTubeFill: 4,
        drops: 10,
        rollingSpeed: 150,
        dropSpeed: 500,
        colors: [
            { color: 2 },
            { color: 6 },
            { color: 5 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    },

    {
        name: 'Level 17',
        maxTubeFill: 4,
        drops: 10,
        rollingSpeed: 150,
        dropSpeed: 500,
        colors: [
            { color: 1 },
            { color: 5 },
            { color: 6 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    },

    {
        name: 'Level 18',
        maxTubeFill: 4,
        drops: 10,
        rollingSpeed: 150,
        dropSpeed: 500,
        colors: [
            { color: 3 },
            { color: 4 },
            { color: 5 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    },

    {
        name: 'Level 19',
        maxTubeFill: 4,
        drops: 10,
        rollingSpeed: 150,
        dropSpeed: 500,
        colors: [
            { color: 2 },
            { color: 4 },
            { color: 6 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    },

    {
        name: 'Level 20',
        maxTubeFill: 4,
        drops: 10,
        rollingSpeed: 150,
        dropSpeed: 500,
        colors: [
            { color: 4 },
            { color: 5 },
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
        name: 'Level 21',
        maxTubeFill: 3,
        drops: 10,
        rollingSpeed: 150,
        dropSpeed: 500,
        colors: [
            { color: 12 },
            { color: 11 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    },

    {
        name: 'Level 22',
        maxTubeFill: 3,
        drops: 10,
        rollingSpeed: 150,
        dropSpeed: 500,
        colors: [
            { color: 9 },
            { color: 10 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    },

    {
        name: 'Level 23',
        maxTubeFill: 3,
        drops: 10,
        rollingSpeed: 150,
        dropSpeed: 500,
        colors: [
            { color: 7 },
            { color: 8 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    },

    {
        name: 'Level 24',
        maxTubeFill: 3,
        drops: 10,
        rollingSpeed: 150,
        dropSpeed: 500,
        colors: [
            { color: 1 },
            { color: 10 },
            { color: 9 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: []
    },

    {
        name: 'Level 25',
        maxTubeFill: 3,
        drops: 10,
        rollingSpeed: 150,
        dropSpeed: 500,
        colors: [
            { color: 7 },
            { color: 8 },
            { color: 9 }
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
        name: 'Level 26',
        maxTubeFill: 3,
        drops: 10,
        rollingSpeed: 150,
        dropSpeed: 500,
        colors: [
            { color: 10 },
            { color: 11 },
            { color: 12 }
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
        name: 'Level 27',
        maxTubeFill: 3,
        drops: 10,
        rollingSpeed: 150,
        dropSpeed: 500,
        colors: [
            { color: 7 },
            { color: 9 },
            { color: 11 }
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
        name: 'Level 28',
        maxTubeFill: 3,
        drops: 10,
        rollingSpeed: 150,
        dropSpeed: 500,
        colors: [
            { color: 8 },
            { color: 10 },
            { color: 12 }
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
        name: 'Level 29',
        maxTubeFill: 3,
        drops: 10,
        rollingSpeed: 150,
        dropSpeed: 500,
        colors: [
            { color: 3 },
            { color: 7 },
            { color: 9 }
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
        name: 'Level 30',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 150,
        dropSpeed: 500,
        colors: [
            { color: 1 },
            { color: 10 },
            { color: 12 }
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
        name: 'Level 31',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 150,
        dropSpeed: 500,
        colors: [
            { color: 2 },
            { color: 7 },
            { color: 12 }
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
        name: 'Level 32',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 150,
        dropSpeed: 500,
        colors: [
            { color: 3 },
            { color: 8 },
            { color: 9 }
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
        name: 'Level 33',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 150,
        dropSpeed: 400,
        colors: [
            { color: 7 },
            { color: 11 },
            { color: 12 }
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
        name: 'Level 34',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 150,
        dropSpeed: 400,
        colors: [
            { color: 8 },
            { color: 10 },
            { color: 11 }
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
        name: 'Level 35',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 150,
        dropSpeed: 400,
        colors: [
            { color: 7 },
            { color: 9 },
            { color: 10 }
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
        name: 'Level 36',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 200,
        dropSpeed: 400,
        colors: [
            { color: 7 },
            { color: 8 },
            { color: 9 }
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
        name: 'Level 37',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 200,
        dropSpeed: 400,
        colors: [
            { color: 10 },
            { color: 11 },
            { color: 12 }
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
        name: 'Level 38',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 200,
        dropSpeed: 300,
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
        name: 'Level 39',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 200,
        dropSpeed: 300,
        colors: [
            { color: 7 },
            { color: 8 },
            { color: 9 }
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
        name: 'Level 40',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 200,
        dropSpeed: 300,
        colors: [
            { color: 10 },
            { color: 11 },
            { color: 12 }
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
        name: 'Level 41',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 250,
        dropSpeed: 300,
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
        name: 'Level 42',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 250,
        dropSpeed: 300,
        colors: [
            { color: 7 },
            { color: 10 },
            { color: 11 }
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
        name: 'Level 43',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 250,
        dropSpeed: 300,
        colors: [
            { color: 1 },
            { color: 9 },
            { color: 11 }
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
        name: 'Level 44',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 250,
        dropSpeed: 300,
        colors: [
            { color: 2 },
            { color: 8 },
            { color: 12 }
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
        name: 'Level 45',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 250,
        dropSpeed: 300,
        colors: [
            { color: 3 },
            { color: 7 },
            { color: 10 }
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
        name: 'Level 46',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 250,
        dropSpeed: 300,
        colors: [
            { color: 7 },
            { color: 8 },
            { color: 10 }
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
        name: 'Level 47',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 300,
        dropSpeed: 300,
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
        name: 'Level 48',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 300,
        dropSpeed: 300,
        colors: [
            { color: 8 },
            { color: 9 },
            { color: 10 }
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
        name: 'Level 49',
        maxTubeFill: 3,
        drops: 6,
        rollingSpeed: 300,
        dropSpeed: 300,
        colors: [
            { color: 7 },
            { color: 11 },
            { color: 12 }
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
        name: 'Level 50',
        maxTubeFill: 3,
        drops: 3,
        rollingSpeed: 350,
        dropSpeed: 200,
        colors: [
            { color: 0 },
            { color: 0 },
            { color: 0 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ],
        rats: [
            { type: 'rat1', x: 200 },
            { type: 'rat1', x: 550 },
            { type: 'rat1', x: 700 },
            { type: 'rat1', x: 800 }
        ]
    }
];

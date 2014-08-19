Game.Level = function (game, level) {
    this.game = game;
    for (item in this.levels[level]) {
        this[item] = this.levels[level][item];
    }

    this.img = 'level' + level;
    this.levelImg = null;

    this.imgGameover = 'game_over';
    this.imgGameWon = 'game_won';
    this.imgLevelComplete = 'level_complete';

    this.showInfo(this.img, true);

    return this;
};

Game.Level.prototype.hideInfo = function () {
    this.game.add.tween(this.levelImg).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
};

Game.Level.prototype.showInfo = function (img, hide) {
    this.levelImg = this.game.add.image(0, 0, img);
    this.levelImg.x = this.game.world.centerX - (this.levelImg.width / 2);
    this.levelImg.y = this.game.world.centerY - (this.levelImg.height / 2);
    if (hide) {
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.hideInfo, this); 
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
        description: 'Fill one tube with blue',
        description2: '',
        maxTubeFill: 1,
        colors: [
            { color: 3 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ]
    },

    {
        name: 'Level 2',
        description: 'Fill one tube with yellow',
        description2: '',
        maxTubeFill: 1,
        colors: [
            { color: 2 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ]
    },

    {
        name: 'Level 3',
        description: 'Fill one tube with yellow,',
        description2: 'one with blue and one with red',
        maxTubeFill: 1,
        colors: [
            { color: 1 },
            { color: 2 },
            { color: 3 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ]
    },


    {
        name: 'Level 4',
        description: 'Fill one tube with yellow',
        description2: '',
        maxTubeFill: 2,
        colors: [
            { color: 2 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ]
    }, 

    {
        name: 'Level 5',
        description: 'Fill one tube with yellow',
        description2: ' and one with red',
        maxTubeFill: 2,
        colors: [
            { color: 1 },
            { color: 2 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ]
    }, 

    {
        name: 'Level 6',
        description: 'Fill one tube with green',
        description2: '',
        maxTubeFill: 2,
        colors: [
            { color: 4 }
        ],
        tubes: [
            { type: 'tube1', x: 32 },
            { type: 'tube2', x: 400 },
            { type: 'tube3', x: 700 }
        ]
    }
];

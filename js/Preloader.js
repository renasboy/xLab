Game.Preloader = function (game) {};

Game.Preloader.prototype = {
	preload: function () {
		this.loading = this.add.sprite(this.game.world.centerX - 295, this.game.world.centerY - 295, 'loading');
		this.load.setPreloadSprite(this.loading);

        this.load.image('logo', 'img/logo.png');
        this.load.image('start', 'img/button_start.png');
        this.load.image('bg', 'img/bg.png');
        this.load.image('score_level', 'img/score_level.png');
        this.load.image('rolling', 'img/rolling.png');
        this.load.spritesheet('rolling_animation', 'img/rolling_animation.png', 1200, 37, 6);
        this.load.image('game_over', 'img/game_over.png');
        this.load.image('game_won', 'img/game_won.png');
        this.load.image('level_complete', 'img/level_complete.png');
        this.load.image('level1', 'img/level1.png');
        this.load.image('level2', 'img/level2.png');
        this.load.image('level3', 'img/level3.png');
        this.load.image('level4', 'img/level4.png');
        this.load.image('level5', 'img/level5.png');
        this.load.image('level6', 'img/level6.png');
        this.load.image('primary1', 'img/primary1_bottle.png');
        this.load.image('primary2', 'img/primary2_bottle.png');
        this.load.image('primary3', 'img/primary3_bottle.png');
        this.load.image('primary1_button', 'img/primary1_button.png');
        this.load.image('primary2_button', 'img/primary2_button.png');
        this.load.image('primary3_button', 'img/primary3_button.png');
        this.load.image('primary1_particle', 'img/primary1_particle.png');
        this.load.image('primary2_particle', 'img/primary2_particle.png');
        this.load.image('primary3_particle', 'img/primary3_particle.png');
        this.load.image('tube1', 'img/tube1.png');
        this.load.image('tube2', 'img/tube2.png');
        this.load.image('tube3', 'img/tube3.png');
        this.load.image('tube1_mask', 'img/tube1_mask.png');
        this.load.image('tube2_mask', 'img/tube2_mask.png');
        this.load.image('tube3_mask', 'img/tube3_mask.png');
        this.load.image('fill_0', 'img/fill_0.png');
        this.load.image('fill_1', 'img/fill_1.png');
        this.load.image('fill_2', 'img/fill_2.png');
        this.load.image('fill_3', 'img/fill_3.png');
        this.load.image('fill_4', 'img/fill_4.png');
        this.load.image('fill_5', 'img/fill_5.png');
        this.load.image('fill_6', 'img/fill_6.png');
        this.load.image('fill_7', 'img/fill_7.png');
        this.load.image('fill_8', 'img/fill_8.png');
        this.load.image('fill_9', 'img/fill_9.png');
        this.load.image('fill_10', 'img/fill_10.png');
        this.load.image('fill_11', 'img/fill_11.png');
        this.load.image('fill_12', 'img/fill_12.png');
        this.game.load.audio('drop', 'snd/drop.mp3');
        this.game.load.audio('bottle', 'snd/bottle.mp3');
        this.game.load.audio('click', 'snd/click.mp3');
        this.game.load.audio('game', 'snd/game.mp3');
        this.game.load.audio('menu', 'snd/menu.mp3');
	},
	create: function () {
		this.state.start('MainMenu');
	}
};

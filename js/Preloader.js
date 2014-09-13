Game.Preloader = function (game) {};

Game.Preloader.prototype = {
	preload: function () {
        var img = this.game.add.image(0, 0, 'loading');
        img.x = this.game.world.centerX - img.width / 2;
        img.y = this.game.world.centerY - img.height / 2; 
		this.load.setPreloadSprite(img, 1);

        this.game.stage.backgroundColor = 0x152736;

        this.load.image('logo', 'img/logo.png');
        this.load.image('how_to_play', 'img/how_to_play.png');
        this.load.image('color_help', 'img/help.png');
        this.load.image('next', 'img/button_next.png');
        this.load.image('bg', 'img/bg.png');
        this.load.image('objective_level', 'img/objective_level.png');
        this.load.spritesheet('rolling_animation', 'img/rolling_animation.png', 1200, 37, 6);
        this.load.image('game_over', 'img/game_over.png');
        this.load.image('game_won', 'img/game_won.png');
        this.load.image('level_complete', 'img/level_complete.png');
        this.load.image('level', 'img/level.png');
        this.load.image('pause_screen', 'img/pause.png');
        this.load.image('primary1', 'img/primary1_bottle.png');
        this.load.image('primary2', 'img/primary2_bottle.png');
        this.load.image('primary3', 'img/primary3_bottle.png');
        this.load.image('primary1_button', 'img/primary1_button.png');
        this.load.image('primary2_button', 'img/primary2_button.png');
        this.load.image('primary3_button', 'img/primary3_button.png');
        this.load.image('button', 'img/button.png');
        this.load.image('button_mask', 'img/button_mask.png');
        this.load.image('primary1_particle', 'img/primary1_particle.png');
        this.load.image('primary2_particle', 'img/primary2_particle.png');
        this.load.image('primary3_particle', 'img/primary3_particle.png');
        this.load.image('rat1', 'img/rat1.png');
        this.load.spritesheet('rat1_animation', 'img/rat1_sprite.png', 128, 174, 8);
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
        this.load.image('mute', 'img/button_audio_off.png');
        this.load.image('unmute', 'img/button_audio_on.png');
        this.load.image('pause', 'img/button_pause.png');
        this.load.image('play', 'img/button_play.png');
        this.load.image('help', 'img/button_help.png');
        this.game.load.audio('rat', [ 'snd/drop.ogg', 'snd/drop.mp3' ]);
        this.game.load.audio('drop', [ 'snd/drop.ogg', 'snd/drop.mp3' ]);
        this.game.load.audio('bottle', [ 'snd/bottle.ogg', 'snd/bottle.mp3' ]);
        this.game.load.audio('click', [ 'snd/click.ogg', 'snd/click.mp3' ]);
        this.game.load.audio('game', [ 'snd/game.ogg', 'snd/game.mp3' ]);
        this.game.load.audio('menu', [ 'snd/menu.ogg', 'snd/menu.mp3' ]);
        this.game.load.audio('game_won', [ 'snd/game_won.ogg', 'snd/game_won.mp3' ]);
        this.game.load.audio('game_over', [ 'snd/game_over.ogg', 'snd/game_over.mp3' ]);
	},
	create: function () {
		this.state.start('MainMenu');
	}
};

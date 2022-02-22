var preLoad = {
    preload: function(){
        game.stage.backgroundColor = game.global.backgroundColor;

        // Preload loading bar resources
        var loading_border = this.add.image(game.width/2, game.height/2, 'loading_border');
        loading_border.anchor.setTo(.5, .5);
        var loading = this.add.sprite(game.width/2, game.height/2, 'loading');
        loading.anchor.setTo(.5, .5);
        this.load.setPreloadSprite(loading);

        // load images here:

        game.load.image('pause', 'assets/images/pause.png');
        game.load.image('splash', 'assets/images/Frontyard.png');
        //game.load.image('gameOver', 'assets/images/game_over.png');


        // load atlas and sprites here:

        game.load.spritesheet('flowerTower', 'assets/sprites/Flower.png');
        //game.load.atlas('atlas', 'path/to/atlas.png', 'path/to/atlas.json');


        // load audio here:
        
        //game.load.audio('audio', 'path/to/sounds.mp3/ogg/wav');


        // load fonts here:
        // from Four Lines on dafont.com
        game.load.bitmapFont('mainFont', 'assets/fonts/Chicharito/Chicharito.png', 'assets/fonts/Chicharito/Chicharito.xml');

    },

    create: function() {
        game.state.start('mainMenu');
    }
}
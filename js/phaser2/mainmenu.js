var mainMenu = {
    create: function() {
        game.stage.backgroundColor = game.global.backgroundColor;

        var w = game.width;
        var h = game.height;

        this.background = game.add.tileSprite(0, 0, w, h, 'splash');

        var logo = game.add.bitmapText(w/2, -100, 'mainFont', '', 75);
        logo.text = game.global.title;
        logo.anchor.setTo(.5, .5);
        game.add.tween(logo).to({
            y: h / 2 - 80
        }, 1000, Phaser.Easing.Bounce.Out).start();
        
        var label = game.add.bitmapText(w/2, h - 100, 'mainFont', '', 40);
        label.text = 'Level ' + game.global.level;
        label.anchor.setTo(.5, .5);
        label.alpha = 0;
        game.add.tween(label).delay(500).to({
            alpha:1
        }, 1000).start();
        game.add.tween(label).to({
            y: h - 120
        }, 500).to({
            y: h - 100
        }, 500).loop().start();
        
        
        game.input.onDown.add(this.listener);
    },

    listener: function() {
        game.state.start(game.global.current_level);
    }
}
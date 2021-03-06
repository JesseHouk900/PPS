/*
* Author: Jesse Houk and Alex Jenny
* Email: jessejhacker@gmail.com
*
*/

var game = new Phaser.Game(800, 600, Phaser.Canvas, "game");

game.global = {
    title: "Puppy Protection Services",
    score: 0,
    best_score: 0,
    level: 1,
    backgroundColor: "#00000",
    current_level: "endlessWave"
};

game.state.add("boot", boot);
game.state.add("preLoad", preLoad);
game.state.add("mainMenu", mainMenu);
game.state.add("endlessWave", endlessWave);
game.state.add("gameOver", gameOver);
game.state.start("boot");

game.addPauseButton = function(game) {
    var pause_button = game.add.sprite(game.width - 40, 40, 'pause');
    pause_button.anchor.setTo(.5, .5);
    pause_button.inputEnabled = true;

    pause_button.events.onInputUp.add(
        function() {
            if (!game.paused) {
                game.paused = true;
            }
            pause_watermark = game.add.sprite(game.width / 2, game.height / 2, 'pause');
            pause_watermark.anchor.setTo(.5, .5);
            pause_watermark.alpha = .5;
        }, this);

    game.input.onDown.add(
        function() {
            if (game.paused) {
                game.paused = false;
                pause_watermark.destroy();
            }
        }, self);

}
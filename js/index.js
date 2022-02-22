import Game from './Gameplay/game.js';
//import ButtonPlugin from './lib/plugins/rexbuttonplugin.js';

window.gameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 626,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    },
    // plugins: {
    //     global: [{
    //         key: 'rexButton',
    //         plugin: ButtonPlugin,
    //         start: true            
    //     }]
    // },
    scene: [{create}, Game]
};

//var game = new Phaser.Game(config);
window.game = new Phaser.Game(window.gameConfig);
window.eventEmitter = new Phaser.Events.EventEmitter();
//window.sceneManager = (window.game, config);

function create()
{
    this.scene.start('Game');
}
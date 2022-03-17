import PPSButton from '../Buttons/pps_button.js';
import PoundMenu from '../PoundMenu/pound_menu.js';
//import {ImpoundedTowerManager} from '../Buttons/ImpoundedTower.js';

export default class MainMenu {
	constructor() {
		window.currentScene.gameState = "mainMenu";
		this.unhide();
	}
	
	startGame() {
		window.currentScene.mainMenu.hide();
		window.currentScene.poundStartup({from: "MainMenu"});
		
		// .then(function(result) {console.log(window.currentScene.impoundedTowerManager.towers["first"]);}, function(error) {console.log(error);})
		// //window.currentScene.createGameObjects();
	}
	
	hide() {
		this.startGameButton.destructor();
		this.loadGameButton.destructor();
		this.optionsButton.destructor();
	}
	
	unhide() {
		this.startGameButton = new PPSButton( {
			text: 'Start Game', 
			style: { fill: '#fff', fontSize: '34px' }, 
			position: [window.currentScene.sys.game.canvas.width / 2, window.currentScene.sys.game.canvas.height / 4],
			up: this.startGame,
			origin: [0.5, 0.5],
			icon: 'buttonBackground'});
		this.loadGameButton = new PPSButton( {
			text: 'Load Game', 
			style: { fill: '#fff', fontSize: '22px' }, 
			position: [window.currentScene.sys.game.canvas.width / 2, window.currentScene.sys.game.canvas.height * (2 / 5)],
			origin: [0.5, 0.5],
			icon: 'buttonBackground'});
		this.optionsButton = new PPSButton( {
			text: 'Options', 
			style: { fill: '#fff', fontSize: '22px' }, 
			position: [window.currentScene.sys.game.canvas.width / 2, window.currentScene.sys.game.canvas.height * (3 / 5)],
			origin: [0.5, 0.5],
			icon: 'buttonBackground'});
			
		this.startGameButton.button.setScale(.85, .2);
		this.loadGameButton.button.setScale(.55, .1);
		this.optionsButton.button.setScale(.4, .1);
	}
}
import PPSButton from '../Buttons/pps_button.js';
import MainMenu from '../MainMenu/main_menu.js';

export default class GameOver
{
	constructor()
	{
		window.currentScene.gameState = "gameOver";
		this.unhide();
		this.hidden = false;
		window.currentScene.UI.treatsButton.destructor();
	}
	
	retry()
	{
		window.currentScene.gameOver.hide();
		
		window.currentScene.createGameObjects();
	}
	
	hide()
	{
		this.retryButton.destructor();
		this.loadGameButton.destructor();
		this.mainMenuButton.destructor();
	}
	
	retry()
	{
		window.currentScene.gameOver.hide();
		window.currentScene.cleanUp();
		window.currentScene.createGameObjects();
		delete window.currentScene.gameOver;
	}
	
	unhide()
	{
		
		this.retryButton = new PPSButton(
		{	text: 'Retry', 
			style: { fill: '#fff', fontSize: '34px' }, 
			position: [window.currentScene.sys.game.canvas.width / 2, window.currentScene.sys.game.canvas.height / 4],
			up: this.retry,
			origin: [0.5, 0.5],
			icon: 'buttonBackground'});
		this.loadGameButton = new PPSButton(
		{	text: 'Load Game', 
			style: { fill: '#fff', fontSize: '22px' }, 
			position: [window.currentScene.sys.game.canvas.width / 2, window.currentScene.sys.game.canvas.height * (2 / 5)],
			origin: [0.5, 0.5],
			icon: 'buttonBackground'});
		this.mainMenuButton = new PPSButton(
		{	text: 'Main Menu', 
			style: { fill: '#fff', fontSize: '22px' }, 
			position: [window.currentScene.sys.game.canvas.width / 2, window.currentScene.sys.game.canvas.height * (3 / 5)],
			up: () => {
				window.currentScene.gameOver.hide();
				window.currentScene.mainMenu = new MainMenu();},
			origin: [0.5, 0.5],
			icon: 'buttonBackground'});
			
		this.retryButton.button.setScale(.85, .2);
		this.loadGameButton.button.setScale(.55, .1);
		this.mainMenuButton.button.setScale(.4, .1);
	}
}
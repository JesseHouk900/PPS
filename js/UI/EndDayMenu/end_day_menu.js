import PPSButton from "../Buttons/pps_button.js";

export default class EndDayMenu
{
	constructor()
	{
		window.currentScene.gameState = "EndDay";
		this.unhide();
	}
	
	unhide()
	{
		this.background = window.currentScene.add.image(0, 0, 'endDayBackground').setOrigin(0, 0).setDepth(0);
		
		this.nextDayButton = new PPSButton(
		{	text: 'Next Day', 
			style: { fill: '#fff', fontSize: '34px' }, 
			position: [window.currentScene.sys.game.canvas.width / 2, window.currentScene.sys.game.canvas.height / 4],
			up: this.nextDay,
			origin: [0.5, 0.5],
			icon: 'buttonBackground'});
		this.toPoundButton = new PPSButton(
		{	text: 'Go To Pound', 
			style: { fill: '#fff', fontSize: '22px' }, 
			position: [window.currentScene.sys.game.canvas.width / 2, window.currentScene.sys.game.canvas.height * (2 / 5)],
			up: this.toPound,
			origin: [0.5, 0.5],
			icon: 'buttonBackground'});
		this.buySuppliesButton = new PPSButton(
		{	text: 'Buy Supplies', 
			style: { fill: '#fff', fontSize: '22px' }, 
			position: [window.currentScene.sys.game.canvas.width / 2, window.currentScene.sys.game.canvas.height * (3 / 5)],
			up: this.buySupplies,
			origin: [0.5, 0.5],
			icon: 'buttonBackground'});
			
		this.nextDayButton.button.setScale(.85, .2);
		this.toPoundButton.button.setScale(.55, .1);
		this.buySuppliesButton.button.setScale(.4, .1);
	}
	
	hide()
	{
		this.background.destroy();
		this.nextDayButton.destructor();
		this.toPoundButton.destructor();
		this.buySuppliesButton.destructor();
		//this.destroyTowers();
		//this.towers.destroy();
		
		
	}
	
	nextDay()
	{
		window.currentScene.endDayMenu.hide();
		window.currentScene.yardStartup();
	}
	
	toPound()
	{
		window.currentScene.endDayMenu.hide();
		window.currentScene.poundStartup({from: "endDayMenu"});
		
	}
	
	buySupplies()
	{
		window.currentScene.endDayMenu.hide();
		console.log("not implemented");
		window.currentScene.endDayMenu.unhide();
		//
	}
	
}
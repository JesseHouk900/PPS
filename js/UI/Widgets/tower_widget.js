import PPSTowerButton from '../Buttons/pps_tower_button.js';

export default class TowerWidget
{
	constructor() {
		 this.buttons = {};
		
		for (var i in Object.keys(window.currentScene.player.roster)) {
			var managerKey = Object.keys(window.currentScene.player.roster)[i]
			this.buttons[managerKey] = new PPSTowerButton({
				text: window.currentScene.player.roster[managerKey].name,
				style: {fill: '#000'},
				position: [50 * (1 + Number(i)), 100 * (1 + (Math.floor(i / 2)))],
				sprite: window.currentScene.player.roster[managerKey].sprite,
				icon: window.currentScene.player.roster[managerKey].icon
			});
			this.buttons[managerKey].button.setScale(.42, .42)
			console.log(this.buttons[managerKey])
		}
		
		
	}
	
	static towerData = {
		
	}
	
	destructor() {
		for (var i in Object.keys(window.currentScene.player.roster)) {
			this.buttons[Object.keys(window.currentScene.player.roster)[i]].destructor();
		}
	}
}
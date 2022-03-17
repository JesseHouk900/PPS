import PPSTowerButton from '../Buttons/pps_tower_button.js';

export default class TowerWidget
{
	constructor() {
		 this.buttons = {};
		for (var i in Object.keys(window.currentScene.player.roster)) {
			var managerKey = Object.keys(window.currentScene.player.roster)[i];
			console.log(managerKey)
			console.log(window.currentScene.player.roster[managerKey].spriteKey)
			this.buttons[managerKey] = new PPSTowerButton({
				text: window.currentScene.player.roster[managerKey].name,
				style: {fill: '#000'},
				position: [50 * (1 + Number(i)), 100 * (1 + (Math.floor(i / 2)))],
				spriteKey: window.currentScene.player.roster[managerKey].spriteKey,
				icon: window.currentScene.player.roster[managerKey].icon
			});
			this.buttons[managerKey].button.setScale(.42, .42);
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
import PPSButton from './pps_button.js';
import TowerGenerator from '../../Towers/tower.js';
import TreatGenerator from '../../Treats/treat.js';

export default class TreatButton extends PPSButton
{
	constructor(params = {text: 'Button', position: [0, 0], style: {fill: '#000', fontSize: '12px'}, origin: [0, 0]})
	{
		super(params);
		this.activeTreat = {};
		this.isActive = false;
		this.towerSelected = '';
		
		this.setListener('pointerup', this.pickUpTreat);
	}
	
	// Spawn in a treat from the treat button
	pickUpTreat()
	{
		//console.log('changing cursor')
		window.currentScene.UI.treatsButton.activeTreat = TreatGenerator.generateTreat({treatType: "basic"});
		window.currentScene.UI.treatsButton.text.setText(window.currentScene.UI.treatsButton.text.text - 1);
		//console.log(window.currentScene.UI.treatsButton.activeTreat)
		
		// console.log(window.currentscene.player.towers.getchildren())
		// for (var towerindex in window.currentscene.player.towers.getchildren())
		// {
			// var tower = window.currentscene.player.towers.getchildren()[towerindex];
			// console.log(towerindex)
			// tower.setinteractive();
			
			// tower.on('pointerup', window.currentscene.player.towers[tower.texture.key + towergenerator.towerdata[tower.texture.key].count].onclick);
			
		// }
		
		window.currentScene.UI.treatsButton.isActive = true;
		
		
	}
}

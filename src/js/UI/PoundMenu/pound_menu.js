import PPSButton from "../Buttons/pps_button.js";
import ImpoundedTowerGenerator from "../Buttons/impounded_tower.js";


export default class PoundMenu
{
	constructor(params = {from: "menuClassName?"}) {
		window.currentScene.gameState = "poundMenu";
		this.previousMenu = params.from;
		console.log("previousMenu:", this.previousMenu)
		this.towers = {};
		this.unhide();
	}
	
	unhide() {
		this.background = window.currentScene.add.image(0, 0, 'poundBackground').setOrigin(0, 0).setDepth(0);
		this.foreground = window.currentScene.add.image(0, 0, 'poundCage').setOrigin(0, 0).setDepth(10);
		this.backButton = new PPSButton({text: "Go Back", position: [50, 50], style: {fill: "#fff", fontSize: "14px"}, icon: "backButton"});
		this.backButton.text.visible = false;
		this.backButton.setListener('pointerover', () => {this.backButton.text.visible = true;});
		this.backButton.setListener('pointerout', () => {this.backButton.text.visible = false;});
		this.backButton.setListener('pointerup', () => {this.hide(); window.currentScene.yardStartup();});
        
	}
	
	hide() {
		this.background.destroy();
		this.foreground.destroy();
		this.backButton.destructor();
	}
	
	createTowers() {
		// this.towers = window.currentScene.physics.add.group();
		// this.towers["first"] = ImpoundedTowerGenerator.spawnTower({icon: "basicDog"});
		// console.log(this.towers["first"])
		window.currentScene.impoundedTowersManager.towers["first"] = ImpoundedTowerGenerator.spawnTower({icon: "basicDog"});
	}
	
	destroyTowers()
	{
		for (var iKey in Object.value(ImpoundedTowerGenerator.towerData))
		{
			console.log(iKey);
			for (var jKey in Object.keys(ImpoundedTowerGenerator.towerData[iKey]))
			{
				for (var kKey in Object.keys(ImpoundedTowerGenerator.towerData[iKey][jKey]))
				{
					console.log(this.towers[ImpoundedTowerGenerator.towerData[iKey]])
					this.towers[ImpoundedTowerGenerator.towerData[iKey][jKey][kKey]].destructor();
				}
			}
		}
	}
}
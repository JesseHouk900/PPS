import PPSButton from "../Buttons/pps_button.js";
import ImpoundedTowerGenerator from "../Buttons/impounded_tower_generator.js";


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
		this.background = 
			window.currentScene.add.image(0, 0, 'poundBackground').
				setOrigin(0, 0).setDepth(0);
		this.foreground = 
			window.currentScene.add.image(0, 0, 'poundCage').setOrigin(0, 0).
				setDepth(10);
		this.backButton = new PPSButton({
			text: "Go Back",
			position: [50, 50],
			style: {fill: "#fff", fontSize: "14px"},
			icon: "backButton"
		});
		this.backButton.text.visible = false;
		this.backButton.setListener('pointerover', 
			() => {this.backButton.text.visible = true;});
		this.backButton.setListener('pointerout', 
			() => {this.backButton.text.visible = false;});
		this.backButton.setListener('pointerup', 
			() => {this.hide(); window.currentScene.yardStartup();});
        
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
		window.currentScene.impoundedTowerManager.spawnTower({
			icon: "basicDog",
			attackType: "bark"
		});
		window.currentScene.impoundedTowerManager.spawnTower({
			icon: "basicDog"
		});
		//window.currentScene.impoundedTowerManager.towers["first"] = ImpoundedTowerGenerator.spawnTower({icon: "basicDog"});
	}
	
	destroyTowers()
	{
		for (var iKey in Object.value(impoundedTowerData.towerStats))
		{
			console.log(iKey);
			for (var jKey in Object.keys(impoundedTowerData.towerStats[iKey]))
			{
				for (var kKey in Object.keys(impoundedTowerData.towerStats[iKey][jKey]))
				{
					console.log(this.towers[impoundedTowerData.towerStats[iKey]])
					this.towers[impoundedTowerData.towerStats[iKey][jKey][kKey]].destructor();
				}
			}
		}
	}
}
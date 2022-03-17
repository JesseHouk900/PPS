import ImpoundedTowerGenerator from './impounded_tower_generator.js';
import impoundedTowerData from '../../Data/impounded_tower_data.json' assert {type: "json"};

/*** ImpoundedTowerManager controls towers currently in the pound
***/
export default class ImpoundedTowerManager {
	constructor() {
		this.towers = window.currentScene.physics.add.group();
	}
	
	spawnTower(params = {icon: "", attackType: ""}) {
		var name = ImpoundedTowerGenerator.generateRandomName();
		var managerKey = 
			ImpoundedTowerGenerator.generateManagerKey({
				name: name,
				icon: params.icon
			}
		);
		
		impoundedTowerData.towerStats[params.icon].impounded.push(managerKey);
		
		this.towers[managerKey] = ImpoundedTowerGenerator.spawnTower({
			icon: params.icon,
			attackType: params.attackType,
			managerKey: managerKey,
			name: name
		});
	}
}

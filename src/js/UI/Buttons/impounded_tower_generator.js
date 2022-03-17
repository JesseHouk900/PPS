import TowerGenerator from '../../Towers/tower_generator.js';
import ImpoundedTower from './impounded_tower.js';
import impoundedTowerData from '../../Data/impounded_tower_data.json' assert {type: "json"};
import towerData from '../../Data/tower_data.json' assert {type: "json"};

export default class ImpoundedTowerGenerator {
	
	constructor() {
	
	}
	
	/*** @param {Object: {
		{string} icon Name of the image used for representation on widget(?),
		{string} attackType How the tower will attack,
		{string} managerKey Unique id for reference,
		{string} name
	***/
	static spawnTower(params = {icon: "", attackType: "", managerKey: ""}) {
		
		var tower = new ImpoundedTower ({
			managerKey: [params.managerKey],
			position: [Math.floor(Math.random() * 1000) + 100, Math.floor(Math.random() * 145) + 200],
			style: {fill: '#fff', fontSize: '12px'},
			icon: params.icon,
			name: params.name,
			spriteKey: params.icon,
			attackType: params.attackType
		});
		
		return tower;
	}
	
	static generateManagerKey(params = {name: '', icon: ''}) {
		if (params.name) {
			return params.name + params.icon;
		}
		else {
			return ImpoundedTowerGenerator.generateRandomName() + params.icon;
		}
	}
	
	static generateRandomName() {
		return towerData.towerNames["generic"][TowerGenerator.getRandomTowerNameIndex()];
	}
	
	
}

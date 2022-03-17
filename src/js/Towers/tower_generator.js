import EnemyGenerator from '../Enemies/enemy.js';
import MessageGenerator from '../UI/Message/message.js';
import BarkTower from './bark_tower.js';
import Tower from './tower.js';
import towerData from '../Data/tower_data.json' assert {type: "json"};

export default class TowerGenerator {
    
	constructor() {
    }
	
	/*** @param {!Object<string, undefined>: {
			{string}: spriteKey The label for the sprite,
			{boolean}: isFromGhost Describes if the tower is being created from a ghost tower
		} params
	***/
    static generateTower(params = {spriteKey: "plant", isFromGhost: false}) {
		if (!params.cost) {
			console.log('generating cost: params.spriteKey: ' + params.spriteKey)
			params.cost = TowerGenerator.generateCost(params.spriteKey);
		}
		if (window.currentScene.player.canAfford({cost: params.cost})) {
			TowerGenerator.generateTower_(params);
		}
		// cannot afford tower
		else {
			if (params.button) {
				MessageGenerator.generateMessage({button: params.button, message: "cannot afford"});
			}
			else {
				console.log("could not spawn tower");
			}
		}
    }
	
	static generateManagerKey(key) {
		return key + towerData.towerStats[key].count;
	}
	
	static spawnGhostTower(button) {
		console.log('spawnGhostTower: button.spriteKey: ' + button.spriteKey);
		return TowerGenerator.spawnGhostTower_(button);
	}
	
	static spawnTowerFromGhost() {
		return TowerGenerator.spawnTowerFromGhost_();
	}
	
	/*** @param {string} spriteKey Name of the sprite used to get associated cost
	@return {number}
	***/
	static generateCost(spriteKey) {
		var cost = towerData.towerStats[spriteKey].cost;
		return Math.round(cost.cash + (cost.variance * (2 * Math.random() - 1))).toFixed(2);
	}
	
	/*** @return {number}
	***/
	static getRandomTowerNameIndex() {
		return Math.floor(Math.random() * towerData.towerNames["generic"].
			length);
	}
	
	/*** @return {string}
	***/
	static getRandomTowerAttackType() {
		var attackType = 
			towerData.towerNames[Object.keys(towerData.towerNames)
				[Math.floor(Math.random() *	Object.keys(towerData.towerNames)
					.length)]];
		return attackType[Math.floor(Math.random() * attackType.length)];
	}
	
	/*** @param {!Object: Phaser3.button} button
		@return {!Object: Tower}
	***/
	static spawnGhostTower_(button) {
		return new Tower( {
                spriteKey: button.spriteKey,
                health: towerData.towerStats[button.spriteKey].health,
                fireRate: towerData.towerStats[button.spriteKey].fireRate
		});
	}
	
	/*** @param {!Object<string, undefined>: {
			{string}: spriteKey,
			{?Object<Phaser3.button>}: button,
			{boolean}: isFromGhost
		} params
	***/
	static generateTower_(params = {}) {
		var managerKey = TowerGenerator.generateManagerKey(params.spriteKey);
		if (params.button) {
			window.currentScene.player.towers["ghost"] = TowerGenerator.spawnGhostTower(params.button);
			window.currentScene.player.activateGhostTower();
		}
		else if (params.isFromGhost) {
			console.log(managerKey)
			window.currentScene.player.towers[managerKey] = TowerGenerator.spawnTowerFromGhost();
			window.currentScene.player.deactivateGhostTower();
			window.currentScene.player.activateNewTower(managerKey);
			towerData.towerStats[params.spriteKey].count++;
		}
		else {
			window.currentScene.player.spawnTower();
			towerData.towerStats[params.spriteKey].count++;
		}
	}
	
	static spawnTowerFromGhost_(type) {
		var tower;
		if (type == null) {
			tower = TowerGenerator.spawnDefault_();
		}
		else if (type == 'bark') {
			tower = TowerGenerator.spawnBarkTower_();
		}
		else if (type == 'cute') {
			tower = TowerGenerator.spawnCuteTower_();
		}
		else if (type == 'frisbee') {
			tower = TowerGenerator.spawnFrisbeeTower_();
		}
		tower.setAttackType(type);
		return tower;
	}
	
	static spawnDefault_() {
		var tower = new Tower({
			sprite: window.currentScene.player.towers["ghost"].
				sprite.clearTint(),
			health: towerData.towerStats
				[window.currentScene.player.ghostTowerType].health,
			fireRate: towerData.towerStats
				[window.currentScene.player.ghostTowerType].fireRate
		});
		return tower;
	}
	
	static spawnBarkTower_() {
		var tower = new BarkTower({
			sprite: window.currentScene.player.towers["ghost"].
				sprite.clearTint(),
			health: towerData.towerStats
				[window.currentScene.player.ghostTowerType].health,
			fireRate: towerData.towerStats
				[window.currentScene.player.ghostTowerType].fireRate
		});
		return tower;
	}
	
	static spawnCuteTower_() {
		console.log('spawnCuteTower: unimplemented')
	}
	
	static spawnFrisbeeTower_() {
		console.log('spawnFrisbeeTower: unimplemented')
	}
}

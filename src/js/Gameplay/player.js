import EnemyGenerator from '../Enemies/enemy.js';
import Yard from './yard.js';
import MessageGenerator from '../UI/Message/message.js';
import Tower from '../Towers/tower.js';
import TowerGenerator from '../Towers/tower_generator.js';
import BudgetWidget from '../UI/Widgets/budget_widget.js';
import towerData from '../Data/tower_data.json' assert {type: "json"};

export default class Player
{
    constructor() {
        this.isGhostActive = false;
        this.ghostTowerType = '';
        this.towers = window.currentScene.physics.add.group();
		this.budget = {cash: 100, treats: 12};
		this.recentlyClickedTower = "";
		this.roster = {};
    }

    activateGhostTower() {
        this.isGhostActive = true;
        this.ghostTowerType = this.towers["ghost"].spriteKey;
        this.setupTowerPlacementPositionUpdateTimeout("ghost" + this.ghostTowerType);
        this.towerTouchups("ghost");
    }
	
	spawnTower() {
		console.log("unimplemented")
	}
	
	deactivateGhostTower() {
		this.isGhostActive = false;
		this.removeRelatedUpdateCalls("ghost");
		this.ghostTowerType = '';
		delete this.towers["ghost"];
	}
	
	activateNewTower(managerKey) {
		const delay = (managerKey) => new Promise(function(resolve) {
			setTimeout(function() {resolve(managerKey)}, 1000);
		});
		delay(managerKey)
		.then(function(managerKey) {
			console.log(window.currentScene.player.towers)
			window.currentScene.player.towers[managerKey].sprite.name = managerKey;
			window.currentScene.player.towers[managerKey].activate();
		});
	}
    
    getUpdatedSpritePosition()
    {
        window.currentScene.yard.FindNearestPoint()
        .then(function(result) {
            if (window.currentScene.player.towers["ghost"]) {
                window.currentScene.player.towers["ghost"].sprite.x = result[0];
                window.currentScene.player.towers["ghost"].sprite.y = result[1];
                
            }
        });
        
    }
	
	canAfford(cost)
	{
		return this.canAffordCash(cost.cash) && this.canAffordTreats(cost.treats);
	}
	
	payFor(params = {cash: 0, treats: 0, key: "plant"}) {
		if (params.cash && params.treats) {
			this.addToBudget({
				cash: -params.cash,
				treats: -params.treats
			});
		}
		else if (params.key){
			this.addToBudget({
				cash: -towerData.towerStats[params.key].cost.cash,
				treats: -towerData.towerStats[params.key].cost.treats
			});			
		}
	}
	
	receiveReward(rewards) {
		for (var reward in rewards) {
			if (reward == "cash") {
				this.addToBudget({cash: rewards[reward]});
			}
			if (reward == "treats") {
				this.addToBudget({treats: rewards[reward]});
			}
		}
	}
	
	/*** @param {number?} cost Value to check if budget.cash is greater than or equal to
	@return {boolean} 
	***/
	canAffordCash(cost) {
		if (cost != null) {
			return this.budget.cash >= cost;
		}
		else return true;
	}
	
	/*** @param {number?} cost Value to check if budget.treats is greater than or equal to
	@return {boolean} 
	***/
	canAffordTreats(cost) {
		if (cost != null) {
			return this.budget.treats >= cost;
		}
		else return true;
	}
	
	addToBudget(budgetChange = {cash: 0, treats: 0}) {
		if (budgetChange.cash) {
			this.budget.cash += budgetChange.cash;
		}
		if (budgetChange.treats) {
			this.budget.treats += budgetChange.treats;
		}
		window.currentScene.UI.budgetWidget.update();
	}
	
	removeAllTowers() {
		if (this.towers["ghost"]) {
			this.towers["ghost"].destructor()
		}
		var keys = Object.keys(towerData.towerStats);
		for (var i in keys) {
			if (towerData.towerStats[keys[i]].count > 0) {
				
				for (let j = 0; j < towerData.towerStats[keys[i]].count; j++) {
					console.log(this.towers)
					this.towers[keys[i] + j].destructor();
					
				}
				towerData.towerStats[keys[i]].count = 0;
			}
		}
	}
	
	addToRoster(key, data) {
		this.roster[key] = data;
		console.log(this.roster)
	}
	
	removeFromRoster(key) {
		delete this.roster[key];
	}
	
	setupTowerPlacementPositionUpdateTimeout(callPreface) {
		// setup initial call
		const delay = () => new Promise(function(resolve) {
            setTimeout(function() {resolve()}, 100);
        });
        delay()
        .then(function() {window.currentScene.player.getUpdatedSpritePosition()});
		// setup reoccurring call
		window.updateCalls[callPreface + "UpdatePosition"] = () => {window.currentScene.player.getUpdatedSpritePosition();};
		
	}
	
	removeRelatedUpdateCalls(key) {
		for (var call in window.updateCalls) {
			if (call.includes(key)) {
				delete window.updateCalls[call];
			}
		}
	}
	
	towerTouchups(key) {
		if (key == "ghost") {
			this.touchupGhost_();
		}
		else if (key == "bark") {
			
		}
		else if (key == "frisbee") {
			
		}
		else if (key == "cute") {
			
		}
	}
	
	touchupGhost_() {
		this.towers["ghost"].sprite.anims.play(this.towers["ghost"].spriteKey + 'Idle');
        this.towers["ghost"].sprite.tint = 0x777777;
        this.towers["ghost"].sprite.name = 'ghost';
	}
}

import EnemyGenerator from '../Enemies/enemy.js';
import Yard from './yard.js';
import MessageGenerator from '../UI/Message/message.js';
import TowerGenerator, { Tower } from '../Towers/tower.js';
import BudgetWidget from '../UI/Widgets/budget_widget.js';

// let EnemyGenerator = Enemy.default;

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
        this.ghostTowerType = this.towers["ghost"].key;
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
	
	canAfford(towerKey)
	{
		var tower = TowerGenerator.towerData[towerKey];
		if (this.budget.cash < tower.cost.cash)
		{
			return false;
		}
		if (this.budget.treats < tower.cost.treats)
		{
			return false;
		}
		return true;
	}
	
	payFor(params = {cash: 0, treats: 0, key: "plant"})
	{
		
		if (params.cash && params.treats)
		{
			this.updateBudget(
				{
					cash: -params.cash,
					treats: -params.treats
				});
		}
		else if (params.key)
		{
			
			this.updateBudget(
				{
					cash: -TowerGenerator.towerData[params.key].cost.cash,
					treats: -TowerGenerator.towerData[params.key].cost.treats
				});
			
		}
	}
	
	receiveReward(rewards)
	{
		//console.log(rewards)
		for (var reward in rewards)
		{
			if (reward == "cash")
			{
				this.updateBudget({cash: rewards[reward]});
			}
			if (reward == "treats")
			{
				this.updateBudget({treats: rewards[reward]});
			}
			//if (reward == cost)
			//{
			//	this.budget.cost += rewards[reward];
			//}
		}
		//console.log(this.budget
	}
	
	updateBudget(budgetChange = {cash: 0, treats: 0})
	{
		if (budgetChange.cash)
		{
			this.budget.cash += budgetChange.cash;
		}
		if (budgetChange.treats)
		{
			this.budget.treats += budgetChange.treats;
		}
		
		window.currentScene.UI.budgetWidget.update();
	}
	
	removeAllTowers() {
		if (this.towers["ghost"]) {
			this.towers["ghost"].destructor()
		}
		var keys = Object.keys(TowerGenerator.towerData);
		for (var i in keys) {
			if (TowerGenerator.towerData[keys[i]].count > 0) {
				
				for (let j = 0; j < TowerGenerator.towerData[keys[i]].count; j++) {
					console.log(this.towers)
					this.towers[keys[i] + j].destructor();
					
				}
				TowerGenerator.towerData[keys[i]].count = 0;
			}
		}
	}
	
	addToRoster(key, data) {
		this.roster[key] = data;
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
		this.towers["ghost"].sprite.anims.play(this.towers["ghost"].key + 'Idle');
        this.towers["ghost"].sprite.tint = 0x777777;
        this.towers["ghost"].sprite.name = 'ghost';
	}
}

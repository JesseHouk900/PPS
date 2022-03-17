import RewardGenerator from '../Gameplay/reward.js';
import WaveGenerator from '../Gameplay/wave_generator.js';
import enemyData from '../Data/enemy_data.json' assert {type: "json"};

export default class EnemyGenerator
{
    static enemyData = {
        "plant": {
            speed: 45,
            health: 25,
            pointValue: 10,
			damage: 10,
            count: 0
        }
    }

    constructor() {

    }

    static generateEnemy(
		params = {spriteKey: Object.keys(enemyData.enemyStats)[Math.floor(Math.random() * Object.keys(enemyData.enemyStats).length)]}) {
		/** @type {string} **/
        var managerKey = EnemyGenerator.generateNewManagerKey(params.spriteKey);
        window.currentScene.enemyManager.spawnEnemy({managerKey: managerKey, spriteKey: params.spriteKey});
        enemyData.enemyStats[params.spriteKey].count++;
    }
	
	static generateEnemyRarity() {
		let types = Object.keys(RewardGenerator.rarityData)
		return types[Math.floor(Math.random() * types.length)];
	}
	/** @return {string} **/
	static generateNewManagerKey(spriteType) {
		return "" + spriteType + enemyData.enemyStats[spriteType].count;
	}
}

export class EnemyManager {
	
    constructor(params = {}) {
        this.enemies = window.currentScene.physics.add.group();
    }

    spawnEnemy(params = {managerKey: "plant0", spriteKey: "plant"}) {
        
        this.enemies[params.managerKey] = new Enemy( {
                key: params.spriteKey,
				managerKey: params.managerKey,
                speed: enemyData.enemyStats[params.spriteKey].speed,
                pointValue: enemyData.enemyStats[params.spriteKey].pointValue,
                health: enemyData.enemyStats[params.spriteKey].health,
                damage: enemyData.enemyStats[params.spriteKey].damage,
				rarity: EnemyGenerator.generateEnemyRarity()
            });
        this.enemies[params.managerKey].sprite.flipX = true;
        this.enemies[params.managerKey].sprite.tint = 0xaa7777;
        this.enemies[params.managerKey].sprite.name = params.managerKey;
        
    }
	
	removeAllEnemies() {
		/** @type {!Array<Enemy>} **/
		var active = [];
		/** @type {!Array<String>} **/
		var keys = Object.keys(enemyData.enemyStats);
		for (var i in keys)
		{
			console.log(keys[i])//, enemyData.enemyStats[key].count);
			if (enemyData.enemyStats[keys[i]].count > 0)
			{
				for (let j = 0; j < enemyData.enemyStats[keys[i]].count; j++)
				{
					if (this.enemies[keys[i] + j])
					{
						active.push(j);
						this.enemies[keys[i] + j].destructor();
					}
					enemyData.enemyStats[keys[i]].count = 0;
				}
			}
		}
	}
}

export class Enemy
{
    constructor(params = {speed: 100, pointValue: 10, key: "plant", damage: 10, rarity: "common"}) {
        this.key = params.key;
		this.managerKey = params.managerKey;
        this.speed = params.speed;
        this.pointValue = params.pointValue;
        this.health = params.health;
		this.damage = params.damage;
		this.rarity = params.rarity;
		
        var point = window.currentScene.yard.getYardPointPosition([Math.floor(Math.random() * 5), 8]);
        this.sprite = window.currentScene.enemyManager.enemies.create(point[0], point[1], this.key);
        this.sprite.setVelocityX(-this.speed);
        this.sprite.setPushable(false);
		this.sprite.setSize(75, 75);
		this.sprite.setDepth(window.currentScene.calculateZIndex(this));
		
		this.tDamage = {};
		
		
        window.currentScene.physics.add.overlap(window.currentScene.player.towers, window.currentScene.enemyManager.enemies, this.dealDamage);
    }

    receiveDamage(damage)
    {
        this.health -= damage;
        if (this.health <= 0)
        {
			clearTimeout(this.tDamage);
            this.destructor();
			
        }
    }
	
	dealDamage(tower, enemy)
	{
		//console.log(enemy);
		if (tower.name != 'ghost')
		{
			enemy.setVelocity(0);
			this.tDamage = setTimeout(() => {
				window.currentScene.player.towers[tower.name].receiveDamage(enemy);
				if (window.currentScene.player.towers[tower.name].health <= 0)
				{
					if (enemy)
					{
						enemy.setVelocity(-enemyData.enemyStats[enemy.texture.key].speed, 0);
					}
				}
			}, 1000);

		}		
	}
	
	destructor()
	{
		window.currentScene.enemyManager.enemies.remove(this.sprite, true, true);
		window.currentScene.checkIfWaveIsOverAndOpenEndOfDayMenuIfTrue();
		delete window.currentScene.enemyManager.enemies[this.managerKey];
		window.currentScene.player.receiveReward(RewardGenerator.generateReward(this.sprite.texture.key, this.rarity));
		delete this;
	}
} 


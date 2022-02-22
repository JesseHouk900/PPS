import EnemyGenerator from '../Enemies/enemy.js';
import MessageGenerator from '../UI/Message/message.js';

export default class TowerGenerator {
    static towerData = {
        "plant": {
            health: 10,
            fireRate: 1, //in seconds
			cost: {cash: 20, treats: 0},
			bulletSpeed: 100,
			damage: 10,
            count: 0
        },
        "basicDog": {
            health: 50,
            fireRate: 1.25, //in seconds
			cost: {cash: 50, treats: 1},
			bulletSpeed: 100,
			damage: 20,
            count: 0
        }
    }
    constructor() {
    }

    static generateTower(params = {spriteKey: "plant", isFromGhost: false}) {
		if (window.currentScene.player.canAfford(params.spriteKey)) {
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
		return key + TowerGenerator.towerData[key].count;
	}
	
	static spawnGhostTower(button) {
		return new Tower( {
                key: button.spriteKey,
                health: TowerGenerator.towerData[button.spriteKey].health,
                fireRate: TowerGenerator.towerData[button.spriteKey].fireRate
            });
	}
	
	static spawnTowerFromGhost() {
		return new Tower( {
			sprite: window.currentScene.player.towers["ghost"].sprite.clearTint(),
			health: TowerGenerator.towerData[window.currentScene.player.ghostTowerType].health,
			fireRate: TowerGenerator.towerData[window.currentScene.player.ghostTowerType].fireRate
		});
	}
	
	static generateTower_(params = {}) {
		var managerKey = TowerGenerator.generateManagerKey(params.spriteKey);
		if (params.button) {
			window.currentScene.player.towers["ghost"] = TowerGenerator.spawnGhostTower(params.button);
			window.currentScene.player.activateGhostTower();
		}
		else if (params.isFromGhost) {
			window.currentScene.player.towers[managerKey] = TowerGenerator.spawnTowerFromGhost();
			window.currentScene.player.deactivateGhostTower();
			window.currentScene.player.activateNewTower(managerKey);
			TowerGenerator.towerData[params.spriteKey].count++;
		}
		else {
			window.currentScene.player.spawnTower();
			TowerGenerator.towerData[params.spriteKey].count++;
		}
	}
}
export class Tower {
    constructor(params = {key: "plant", health: 100, fireRate: 1, sprite: null}) {
		//console.log(params)
		if (params.cost) {
			window.currentScene.player.payFor(params.cost);
		}
		//else if (params.key) {
		//	window.currentScene.player.payFor({key: params.key});
		//}
		
		else if (params.sprite) {
			window.currentScene.player.payFor({key: params.sprite.texture.key});
		}
		
        if (params.sprite) {
            this.key = params.sprite.texture.key;
            this.sprite = params.sprite;
        }
        else {
            this.key = params.key;
            this.sprite = window.currentScene.player.towers.create(window.currentScene.input.mousePointer.x, window.currentScene.input.mousePointer.y, this.key);
        }
		this.managerKey = this.key + TowerGenerator.towerData[this.key].count;
		this.health = params.health;
        this.fireRate = params.fireRate;
        this.bullets = window.currentScene.physics.add.group();
        window.currentScene.physics.add.collider(this.bullets, window.currentScene.enemyManager.enemies, this.dealDamage);
        this.sprite.setPushable(false);
        this.sprite.setSize(75, 75);
		this.sprite.setDepth(window.currentScene.calculateZIndex(this));
		if (params.sprite) {
			this.sprite.setInteractive();
		this.sprite.on('pointerup', () => {this.onClick({"managerKey": this.managerKey})});
		}
    }
    
    activate(managerKey) {
        this.fireing = setInterval(() => {
            this.fire();
        }, this.fireRate * 1000);
    }

    fire() {
        var bullet = this.bullets.create(this.sprite.x, this.sprite.y, "plant").setScale(.1);
        bullet.setVelocityX(TowerGenerator.towerData[this.key].bulletSpeed);
        bullet.parent = this.bullets;
		bullet.towerKey = this.key;
		
		
		bullet.checkBounds = setInterval(() => {
			this.bullets.children.each((blt) => {
				if (blt.x >= window.currentScene.physics.world.bounds.right) {
					blt.parent.remove(blt, true, true);
					clearInterval(blt.checkBounds);
				}
			});
		}, 1000);
    }

    dealDamage(bullet, enemy) {
        bullet.parent.remove(bullet, true, true);            
        if (Object.keys(EnemyGenerator.enemyData).includes(enemy.texture.key)) {
            window.currentScene.enemyManager.enemies[enemy.name].receiveDamage(TowerGenerator.towerData[bullet.towerKey].damage);            
        }
        else {
            //delete enemy;
        } 
    }
	
	receiveDamage(enemy) {
		if (window.currentScene.enemyManager.enemies[enemy.name]) {
			this.health -= window.currentScene.enemyManager.enemies[enemy.name].damage;
			if (this.health <= 0) {
				enemy.setVelocityX = EnemyGenerator.enemyData[enemy.texture.key].speed;
				this.destructor();
				//console.log(enemy);
			}
		}
	}
	
	deactivate() {
		window.currentScene.UI.treatsButton.towerSelected = '';
		this.stopShooting();
	}

	stopShooting() {
		clearInterval(this.fireing);
	}
	
	fetchTreat(treat) {
		this.moveTo({'treat': treat});
		this.sprite.clearTint();
	}
	
	onClick(params = {managerKey: "plant"}) {
		window.currentScene.player.recentlyClickedTower = params.managerKey;
		if (window.currentScene.UI.treatsButton.isActive) {
			window.currentScene.UI.treatsButton.towerSelected = params.managerKey;
			this.sprite.clearTint();
			this.sprite.tint = 0x777700;
		}
		else {
			this.sprite.clearTint();
			this.sprite.tint = 0x007733;
		}
	}
	
	moveTo(params = {treat: {}, position: []}) {
		if (params.position) {
			var gridPoint = window.currentScene.yard.getYardSquarePosition([params.position[0], params.position[1]]);
		}
		else {
			var gridPoint = window.currentScene.yard.getYardSquarePosition([window.currentScene.input.mousePointer.x, window.currentScene.input.mousePointer.y]);
		}
		var newPosition = window.currentScene.yard.getYardPointPosition([gridPoint[1], gridPoint[0]]);
		window.currentScene.tweens.add( {
				targets: this.sprite,
				x: newPosition[0],
				y: newPosition[1],
				ease: 'Power1',
				duration: 1000,
				onComplete: params.treat.beConsumed,
				//onCompleteParams: treat.beConsumed()
			});
		
		//this.sprite.x = newPosition[0];
		//this.sprite.y = newPosition[1];
	}
	
	destructor() {
		this.deactivate();
		this.sprite.destroy();
		window.currentScene.player.towers.remove(this);
		delete this;
	}
}

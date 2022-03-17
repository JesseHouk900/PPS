import towerData from '../Data/tower_data.json' assert {type: "json"};
import enemyData from '../Data/enemy_data.json' assert {type: "json"};


export default class Tower {
	/*** @param {!Object<string, undefined>: {
			{?string}: spriteKey Nullable value for the name identifying the sprite,
			{?Object<Phaser3.sprite>}: sprite Direct copy of sprite tower will have,
			{number} health Value of hit points tower will have,
			{number} fireRate Rate of fire per second
		} params
	***/
    constructor(params = {spriteKey: "plant", health: 100, fireRate: 1, sprite: null}) {
		this.payFor({cost: params.cost, sprite: params.sprite});
		this.setSpriteAndSpriteKey({sprite: params.sprite, spriteKey: params.spriteKey});
		this.managerKey = this.spriteKey + towerData.towerStats[this.spriteKey].count;
		this.health = params.health;
        this.fireRate = params.fireRate;
		
        this.sprite.setPushable(false);
        this.sprite.setSize(75, 75);
		this.sprite.setDepth(window.currentScene.calculateZIndex(this));
		if (params.sprite) {
			this.sprite.setInteractive();
		this.sprite.on('pointerup', () => {this.onClick({"managerKey": this.managerKey})});
		}
    }
	
	getRateOfFire() {
		return this.fireRate * 1000;
	}
    
	getAttackCleanupRate() {
		return 1000;
	}
	
    activate(managerKey) {
        this.fireing = setInterval(() => {
            this.fire();
        }, this.getRateOfFire());
    }

    fire() {
		console.log('basicTower fire');
        var attack = this.createAttack();
		attack.checkBounds = setInterval(() => {
			this.attacks.children.each((blt) => {
				if (blt.x >= window.currentScene.physics.world.bounds.right) {
					blt.parent.remove(blt, true, true);
					clearInterval(blt.checkBounds);
				}
			});
		}, this.getAttackCleanupRate());
    }
	
	createAttack() {
		var attack = this.attacks.create(this.sprite.x, this.sprite.y, "plant").setScale(.1);
        attack.setVelocityX(towerData.towerStats[this.spriteKey].attackSpeed);
        attack.parent = this.attacks;
		attack.towerKey = this.spriteKey;
		return attack;
	}

    dealDamage(attack, enemy) {
        attack.parent.remove(attack, true, true);            
        if (Object.keys(enemyData.enemyStats).includes(enemy.texture.key)) {
            window.currentScene.enemyManager.enemies[enemy.name].receiveDamage(towerData.towerStats[attack.towerKey].damage);            
        }
        else {
            //delete enemy;
        } 
    }
	
	receiveDamage(enemy) {
		if (window.currentScene.enemyManager.enemies[enemy.name]) {
			this.health -= window.currentScene.enemyManager.enemies[enemy.name].damage;
			if (this.health <= 0) {
				enemy.setVelocityX = enemyData.enemyStats[enemy.texture.key].speed;
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
	
	payFor(params) {	
		if (params.cost) {
			window.currentScene.player.payFor(params.cost);
		}
		
		else if (params.sprite) {
			window.currentScene.player.payFor({key: params.sprite.texture.key});
		}
	}
	
	makeAttacksGroup() {
		var attacks = window.currentScene.physics.add.group();
        this.setAttacksGroupCollider_(attacks);
		return attacks;
	}
	
	setAttackType() {
		this.attacks = this.makeAttacksGroup();
	}
	
	setAttacksGroupCollider_(attacks) {
		window.currentScene.physics.add.collider(attacks, window.currentScene.enemyManager.enemies, this.dealDamage);
	}
	
	setSpriteAndSpriteKey(params) {
		console.log('towerSpriteAssignmentParams: Params: ')
		console.log(params)
        if (params.sprite) {
			console.log('Tower Sprite Key: params.sprite.texture.key: ' +
				params.sprite.texture.key)
            this.spriteKey = params.sprite.texture.key;
            this.sprite = params.sprite;
        }
        else {
			console.log('Tower Sprite Key: params.spriteKey: ' + params.spriteKey)
            this.spriteKey = params.spriteKey;
            this.sprite = window.currentScene.player.towers.create(
				window.currentScene.input.mousePointer.x, 
				window.currentScene.input.mousePointer.y, this.spriteKey);
        }
	}
	
	destructor() {
		this.deactivate();
		this.sprite.destroy();
		window.currentScene.player.towers.remove(this);
		delete this;
	}
}

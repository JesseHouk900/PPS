import Tower from './tower.js';
import towerData from '../Data/tower_data.json' assert {type: "json"};


export default class BarkTower extends Tower {
	
	constructor(params) {
		super(params);
		this.setAttackType(params.attackType);
		
	}
	
	setAttackType(type) {
		this.attackType = type;	
	}
	
    fire() {
        console.log('bark tower fire');
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
}
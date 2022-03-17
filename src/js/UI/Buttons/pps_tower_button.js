import PPSButton from './pps_button.js';
import TowerGenerator from '../../Towers/tower_generator.js';

export default class PPSTowerButton extends PPSButton {

    constructor(params = {
		text: 'Button',
		position: [0, 0],
		style: {
			fill: '#000',
			fontSize: '12px'
		},
		origin: [0, 0],
		spriteKey: 'plant',
		icon: ''
	}) {
        super(params);
        this.spriteKey = params.spriteKey;
        this.sprite;
        
        this.setListener('pointerover', () => {this.style.fill = '#0f0'; this.text.setColor(this.style.fill);});
        this.setListener('pointerout', () => {this.style.fill = '#000'; this.text.setColor(this.style.fill);});
        this.setListener('pointerup', () => {this.onClick();});
		
    }

    onClick() {
        this.button.input.enable = false;
        if (!window.currentScene.player.isGhostActive
			&& window.currentScene.player.ghostTowerType != this.spriteKey) {
			var self = this;
			console.log('ppsTowerButton: generatingTower: ' + this.spriteKey);
            TowerGenerator.generateTower({button: self, spriteKey: this.spriteKey});
        }
        this.button.input.enable = true;
    }
	
	destructor() {
		super.destructor();
	}

    
}

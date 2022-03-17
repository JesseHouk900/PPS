import PPSButton from "./pps_button.js";
import TowerInfoWidget from '../Widgets/tower_info_widget.js';
import TowerGenerator from '../../Towers/tower_generator.js';
import impoundedTowerData from '../../Data/impounded_tower_data.json' assert {type: "json"};
import towerData from '../../Data/tower_data.json' assert {type: "json"};

export default class ImpoundedTower extends PPSButton {
	/*** @param {!Object<string, undefined>: {
		{string} text String that will be displayed along with tower preview,
		!Array<number>} position The x and y of the button,
		{Object<string, string>?: {
			{string} fill Color of text of the hex form '#___',
			{string} fontSize Pixel measurement of the form '*px' 
		}},
		{Array<number>?} origin Position of the origin of the button,
		{string} icon Name of the image for the tower preview,
		{function(*): *} over Callback for when mouse is over button,
		{function(*): *} out Callback for when mouse moves out from over button,
		{function(*): *} up Callback for when mouse is released over button,
		{function(*): *} down Callback for when mouse is pressed over button,
		{string} spriteKey Name of the sprite used for tower associated with button,
		{string} attackType The way the tower performs
	} params
	***/
	constructor(params = {
		text: 'Button',
		position: [0, 0],
		style: {fill: '#000', fontSize: '12px'}, 
		origin: [0, 0], 
		icon: '', 
		over: () => {}, 
		out: () => {}, 
		up: () => {}, 
		down: () => {},
		spriteKey: '',
		attackType: ''}) {
		
		super(params);
		this.text.visible = false;
		this.managerKey = params.managerKey;
		this.name = params.name;
		if (params.attackType) {
			this.attackType = params.attackType;
		}
		else {
			this.attackType = "_debug_";
		}
		this.spriteKey = params.spriteKey;
		this.icon = params.icon;
		this.cost = TowerGenerator.generateCost(this.spriteKey);
		
		this.setListenersForMouseInteraction({
			over: params.over,
			out: params.out,
			up: params.up,
			down: params.down
		});
	}
	
	onClick() {
		this.addToRoster();
		window.currentScene.UI.info.destructor();
	}
	
	addToRoster() {
		// add to roster with necessary info
		window.currentScene.player.addToRoster(this.managerKey, {
			attackType: this.attackType,
			name: this.name,
			spriteKey: this.spriteKey,
			icon: this.icon
		});
		impoundedTowerData.towerStats[this.spriteKey].impounded = 
			impoundedTowerData.towerStats[this.spriteKey].impounded.
				filter(function(e, self) { return e !== self.managerKey;});
		impoundedTowerData.towerStats[this.spriteKey].count--;
		this.destructor();
	}
	
	setListenersForMouseInteraction(callbacks) {
		this.setOverListener(callbacks.over);
		this.setOutListener(callbacks.out);
		this.setUpListener(callbacks.up);
		this.setDownListener(callbacks.down);
	}
	
	setOverListener(callback) {
		if (!callback) {
			this.setListener('pointerover', (pointer) => {
				window.currentScene.UI.info = new TowerInfoWidget({
					name: this.name,
					cost: this.cost,
					attackType: this.attackType,
					parentOrigin: [this.button.x, this.button.y],
					parentTopLeft: [this.button.getTopLeft().x, this.button.getTopLeft().y]
				});
			});
		}
		else {
			this.setListener('pointerover', callback);
		}
	}
	
	setOutListener(callback) {
		if (!callback) {
			this.setListener('pointerout', () => {window.currentScene.UI.info.destructor();});
		}
		else {
			this.setListener('pointerout', callback);
		}
	}
	
	setUpListener(callback) {
		if (!callback) {
			this.setListener('pointerup', () => {this.onClick();});
		}
		else {
			this.setListener('pointerup', callback);
		}
	}
		
	setDownListener(callback) {
		if (callback) {
			this.setListener('pointerdown', callback);
		}
	}
	
	
}
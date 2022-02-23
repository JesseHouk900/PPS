import PPSButton from "./pps_button.js";
import TowerInfoWidget from '../Widgets/tower_info_widget.js';
import TowerGenerator from '../../Towers/tower.js';

export default class ImpoundedTowerGenerator {
	
	static towerData = {
		"basicDog" : {
			available: true,
			impounded: []
		},
		"plant": {
			available: true,
			impounded: []
		}
	};
	
	constructor() {
	
	}
	
	/*** @param {Object: {
		{string} icon Name of the image used for representation on widget(?)
	***/
	static spawnTower(params = {icon: ""}) {
		var text = TowerGenerator.towerNames["generic"][TowerGenerator.getRandomTowerNameIndex()];
		var managerKey = text + params.icon;
		window.currentScene.impoundedTowersManager.towers[managerKey] = new ImpoundedTower ({
			managerKey: [managerKey],
			position: [Math.floor(Math.random() * 1000) + 100, Math.floor(Math.random() * 145) + 200],
			style: {fill: '#fff', fontSize: '12px'},
			icon: params.icon,
			name: text,
			sprite: params.icon,
			attackType: TowerGenerator.getRandomTowerAttackType()
		});
		
		ImpoundedTowerGenerator.towerData[params.icon].impounded.push(managerKey);
		
		return window.currentScene.impoundedTowersManager.towers[managerKey];
	}
}

export class ImpoundedTowerManager {
	constructor() {
		this.towers = window.currentScene.physics.add.group();
	}
}

export class ImpoundedTower extends PPSButton {
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
		{string} sprite Name of the sprite used for tower associated with button,
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
		sprite: '',
		attackType: ''}) {
		
		super(params);
		this.text.visible = false;
		this.managerKey = params.managerKey;
		this.name = params.name;
		this.attackType = params.attackType;
		this.sprite = params.sprite;
		this.icon = params.icon;
		this.cost = TowerGenerator.generateCost(this.sprite);
		
		this.setListenersForMouseInteraction({
			over: params.over,
			out: params.out,
			up: params.up,
			down: params.down
		});
	}
	
	onClick() {
		this.addToRoster();
	}
	
	addToRoster() {
		// add to roster with necessary info
		window.currentScene.player.addToRoster(this.managerKey, {
			attackType: this.attackType,
			name: this.name,
			spriteKey: this.spriteKey,
			icon: this.icon
		});
		ImpoundedTowerGenerator.towerData[this.spriteKey].impounded = 
			ImpoundedTowerGenerator.towerData[this.spriteKey].impounded.
				filter(function(e, self) { return e !== self.managerKey;});
		ImpoundedTowerGenerator.towerData[this.spriteType].count--;
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
				this.info = new TowerInfoWidget({
					name: this.name,
					cost: this.cost,
					attackType: this.attackType
				});
				this.info.background.setSize(50, 50);
				this.info.setPosition([pointer.x, pointer.y]);
			});
		}
		else {
			this.setListener('pointerover', callback);
		}
	}
	
	setOutListener(callback) {
		if (!callback) {
			this.setListener('pointerout', () => {this.info.destructor();});
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
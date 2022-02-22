import PPSButton from "./pps_button.js";

export default class ImpoundedTowerGenerator
{
	static towerNames = 
	{
		"generic": [
		"Barkazar", "Tailwagius", "Dr. Balloon Bopper"]
	}
	static towerData = 
	{
		"basicDog" :
		{
			available: true,
			impounded: []
		},
		"plant":
		{
			available: true,
			impounded: []
		}
	};
	
	constructor()
	{
	
	}
	
	static spawnTower(params = {icon: ""})
	{
		var text = ImpoundedTowerGenerator.towerNames["generic"][Math.floor(Math.random() * ImpoundedTowerGenerator.towerNames["generic"].length)];
		var managerKey = text + params.icon;
		window.currentScene.impoundedTowersManager.spawnTower({managerKey: [managerKey], position: [Math.floor(Math.random() * 1000) + 100, Math.floor(Math.random() * 145) + 200],  style: {fill: '#fff', fontSize: '12px'}, icon: params.icon, name: text, sprite: params.icon});
		
		
		ImpoundedTowerGenerator.towerData[params.icon].impounded.push(managerKey);
		
		return window.currentScene.impoundedTowersManager.towers[managerKey];
	}
	
	
}

export class ImpoundedTowerManager
{
	constructor()
	{
		this.towers = window.currentScene.physics.add.group();
	}
	
	spawnTower(params = {})
	{
		this.towers[params.managerKey] = new ImpoundedTower(params);
	}
}

export class ImpoundedTower extends PPSButton
{
	constructor(params = {text: 'Button', position: [0, 0], style: {fill: '#000', fontSize: '12px'}, origin: [0, 0], icon: '', over: () => {}, out: () => {}, up: () => {}, down: () => {}}) {
		super(params);
		this.text.visible = false;
		this.managerKey = params.managerKey;
		this.name = params.name;
		// temp assignment to icon, needs to be separate parameter
		this.type = params.icon;
		this.sprite = params.sprite;
		this.icon = params.icon;
		
		if (!params.over) {
			this.setListener('pointerover', () => {this.text.x = this.button.x; this.text.y = this.button.y; this.text.visible = true;});
		}
		
		if (!params.out) {
			this.setListener('pointerout', () => {this.text.visible = false;});
		}
		
		if (!params.up) {
			this.setListener('pointerup', () => {this.onClick();});
		}
	}
	
	onClick() {
		this.addToRoster();
	}
	
	addToRoster()
	{
		// add to roster with necessary info
		window.currentScene.player.addToRoster(this.managerKey, {type: this.type, name: this.name, sprite: this.sprite, icon: this.icon});
		ImpoundedTowerGenerator.towerData[this.type].impounded = ImpoundedTowerGenerator.towerData[this.type].impounded.filter(function(e, self) { return e !== self.managerKey;});
		ImpoundedTowerGenerator.towerData[this.type].count--;
		this.destructor();
	}
	
}
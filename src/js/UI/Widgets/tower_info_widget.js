import PPSTowerButton from '../Buttons/pps_tower_button.js';
import FieldComponent from '../Components/field_component.js';

export default class TowerInfoWidget {
	/*** @param {Object: {
		{string} name Name of the tower,
		{number} cost Cost of the tower,
		{string} attackType The way the tower attacks
	} params Constructor parameters
	***/
	constructor(params) {
		this.fields = {
			 name: params.name,
			 cost: params.cost,
			 attackType: params.attackType
		};
		this.makeBackground();
		this.makeFieldComponents();
		
	}
	
	getName() {
		return this.fields.name;
	}
	
	getCost() {
		return this.fields.cost;
	}
	
	makeBackground() {
		this.background = window.currentScene.add.image(0, 0, 'towerInfoBackground');
	}
	
	makeFieldComponents() {
		this.nameFieldComponent = new FieldComponent({
			field: "Name",
			value: this.fields.name,
			width: 0,
			height: 0,
			color: '0xdcdcdc'
		});
		this.costFieldComponent = new FieldComponent({
			field: "Cost",
			value: this.fields.cost,
			width: 0,
			height: 0,
			color: '0xdcdcdc'
		});
		this.attackTypeFieldComponent = new FieldComponent({
			field: "Attack Type",
			value: this.fields.attackType,
			width: 0,
			height: 0,
			color: '0xdcdcdc'
		});
	}
	
	setPosition(position) {
		this.background.setPosition(position[0], position[1]);
		this.setPositionOfFieldComponents(position);
	}
	
	setPositionOfFieldComponents(position) {
		this.nameFieldComponent.setPosition([position[0], position[1] + 15]);
		this.costFieldComponent.setPosition([position[0], position[1] + 45]);
		this.attackTypeFieldComponent.setPosition([position[0], position[1] + 75]);
	}
	
	destructor() {
		this.background.destroy();
		this.nameFieldComponent.destructor();
		this.costFieldComponent.destructor();
		this.attackTypeFieldComponent.destructor();
	}
}
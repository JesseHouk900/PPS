import PPSTowerButton from '../Buttons/pps_tower_button.js';
import FieldComponent from '../Components/field_component.js';

export default class TowerInfoWidget {
	/*** @param {Object: {
		{string} name Name of the tower,
		{number} cost Cost of the tower,
		{string} attackType The way the tower attacks,
		{!Array<number>} origin The center of the tower
	} params Constructor parameters
	***/
	constructor(params) {
		this.fields = {
			 name: params.name,
			 cost: params.cost,
			 attackType: params.attackType
		};
		this.towerReferencePoint = params.parentOrigin;
		this.widgetOffset = [0, 15];
		this.padding = {'top': 10, 'bottom': 10, 'left': 15, 'right': 30};
		this.intercomponentSpacing = {'initial': this.padding.top, 'reoccuring': 30};
		this.makeBackground();
		this.components = {};
		Object.assign(this.components, this.makeFieldComponents());
		
		//this.setScale(.10, .10);
		this.resize();
		this.setFixedPosition(params.parentTopLeft);
	}
	
	getName() {
		return this.fields.name;
	}
	
	getCost() {
		return this.fields.cost;
	}
	
	makeBackground() {
		this.background = window.currentScene.add.image(0, 0, 'towerInfoBackground').
			setDepth(window.currentScene.calculateZIndex(this));
	}
	
	makeFieldComponents() {
		var comps = {};
		comps['nameFieldComponent'] = new FieldComponent({
			field: "Name",
			value: this.fields.name,
			width: 0,
			height: 0,
			color: '0xdcdcdc'
		});
		comps['costFieldComponent'] = new FieldComponent({
			field: "Cost",
			value: this.fields.cost,
			width: 0,
			height: 0,
			color: '0xdcdcdc'
		});
		comps['attackTypeFieldComponent'] = new FieldComponent({
			field: "Attack Type",
			value: this.fields.attackType,
			width: 0,
			height: 0,
			color: '0xdcdcdc'
		});
		return comps;
	}
	
	resize() {
		var maxWidth = this.getMaxComponentWidth();
		//console.log('width: ' + (maxWidth + this.padding.left + this.padding.right));
		var height = this.getTotalComponentHeight();
		//console.log('height: ' + (height + this.padding.top + this.padding.bottom))
		this.background.setScale((maxWidth + this.padding.left + this.padding.right) / this.background.width,
			(height + this.padding.top + this.padding.bottom) / this.background.height);
	}
	
	getIntercomponentSpacing(index) {
		return this.intercomponentSpacing.initial + (this.intercomponentSpacing.reoccuring * index);
	}
	
	getMaxComponentWidth() {
		var width = 0;
		//console.log(Object.values(this.components)[0])
		try {
			width = Object.values(this.components)[0].text.width;
			if (!width) {
				throw('Error: No initialized components');
			}
		}
		catch (e) {
			alert(e);
			return 200;
		}
		for (var v in Object.values(this.components)) {
			if (width < Object.values(this.components)[v].text.width) {
				width = Object.values(this.components)[v].text.width;
			}
		}
		return width;
	}
	
	getTotalComponentHeight() {
		var total = 0;
		for (var v in Object.values(this.components)) {
			total += Object.values(this.components)[v].text.height + this.intercomponentSpacing.reoccuring;
		}
		return total;
	}
	
	setFixedPosition(parentTopLeft) {
		this.setFixedBackgroundPosition(parentTopLeft);
		this.setFixedPositionOfFieldComponents();
	}
	
	setFixedBackgroundPosition(parentTopLeft) {
		this.background.setPosition(
			this.towerReferencePoint[0] - this.widgetOffset[0],
			parentTopLeft[1] - this.widgetOffset[1] - 
				((this.background.getBottomRight().y - this.background.getTopLeft().y) / 2));
			// this.towerReferencePoint[1] - this.widgetOffset[1]);
	}
	
	setFixedPositionOfFieldComponents() {
		for (var i in Object.keys(this.components)) {
			Object.values(this.components)[i].setPosition(
				[this.background.getTopLeft().x + this.padding.left,
					this.background.getTopLeft().y + 
						this.padding.top + this.getIntercomponentSpacing(i)]);
		}
	}
	
	/*** @param {number} x
	***/
	setScale(x) {
		this.background.setScale(x);
		//this.setFieldComponentsScale(x);
	}
	
	setScale(x, y) {
		this.background.setScale(x, y);
		//this.setFieldComponentsScale(x, y);
	}
	
	setComponentsScale(x, y = null) {
		for (var k in Object.keys(this.components)) {
			this.setComponentsScale_(x, y, this.components[k]);
		}
	}
	
	setComponentsScale_(x, y = null, component) {
		if (y != null) {
			component.setScale(x, y);
		}
		else {
			component.setScale(x);
		}
	}
	
	componentsDestructor_() {
		for (var i = Object.keys(this.components).length - 1; i >= 0; i--) {
			this.components[Object.keys(this.components)[i]].destructor();
		}
	}
	
	destructor() {
		this.background.destroy();
		this.componentsDestructor_();
	}
}
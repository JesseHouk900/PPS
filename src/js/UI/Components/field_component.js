
export default class FieldComponent {
	/*** @param {Object: {
		{string} field Name of the field,
		{number} value The value associated with the field,
		{string?} color A string of the hex form '0x______',
		{string?} font A string of the font and/or fallback fonts,
		{number} width The x value for the position of the text,
		{number} height The y value for the position of the text,
	}} params A dict of parameters
	***/
	constructor(params) {
		this.setFieldName(params.field);
		this.setValue(params.value);
		this.text = window.currentScene.add.text(params.width, params.height, this.print()).
			setDepth(window.currentScene.calculateZIndex(this));
		this.setColor(params.color);
		this.setFont(params.font);
	}
	
	/*** @param {string} field
	***/
	setFieldName(field) {
		if (field) {
			this.fieldName = field;
		}
	}
	
	/*** @param {number} value
	***/
	setValue(value) {
		if (value) {
			this.value = value;
		}
	}
	
	/*** @param {string: '0x______'} color
	***/
	setColor(color) {
		if (color) {
			this.text.setColor(color);
		}
	}
	
	/*** @param {string} font
	***/
	setFont(font) {
		if (font) {
			this.text.setFont(font);
		}
	}
	
	/*** @param {!Array<number>} position
	***/
	setPosition(position) {
		if (position[0] && position[1]) {
			this.text.setPosition(position[0], position[1]);
		}
	}
	
	setScale(x) {
		this.text.setScale(x);
	}
	
	setScale(x, y) {
		this.text.setScale(x, y);
	}
	
	print() {
		return this.fieldName + ": " + this.value;
	}
	
	destructor() {
		this.text.destroy();
	}
}
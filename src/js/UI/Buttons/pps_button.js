
import { Message } from '../Message/Message.js';

export default class PPSButton
{
	// input: params - an object containing
	//	+ text - what text the button displays
	//	+ position - of the button
	// 	+ style - an object containing properties of the text
	//	+ icon - name of image reference for the button
	//	---Optional---
	//	+ origin - the center of the text and button
	//	+ over - function for when the mouse is over the button
	//	+ out - function for when the mouse moves off of the button
	//	+ up - function for when the mouse is released over the button
	//	+ down - function for when the mouse is pressed on the button
    constructor(params = {text: 'Button', position: [0, 0], style: {fill: '#000', fontSize: '12px'}, origin: [0, 0], icon: ''})
    {
		//console.log(params)
        this.style = params.style;
        this.position = params.position;
        this.message = {};
		
		this.button = window.currentScene.add.image(this.position[0], this.position[1], params.icon).setDepth(window.currentScene.calculateZIndex(this));
		
        this.text = window.currentScene.add.text(this.position[0], this.position[1], params.text, this.style).setDepth(window.currentScene.calculateZIndex(this));
		
		if (params.origin)
		{
			this.text.setOrigin(params.origin[0], params.origin[1]);
			this.button.setOrigin(params.origin[0], params.origin[1]);
		}
		
		
        this.button.setInteractive();
        
        
        this.setListener('pointerover', params.over);
        this.setListener('pointerout', params.out);
        this.setListener('pointerup', params.up);
        this.setListener('pointerdown', params.down);

    }

    setListener(key, callback)
    {
        if (callback) {
            this.button.off(key);
            this.button.on(key, callback);
            
        }
        else {
            //this.button.on(key, () =>{console.log(key)});

        }
    }
	
	spawnMessage(params = {message: "Cannot afford"})
	{
		this.message = new Message({message: params.message, position: {x: this.button.x, y: this.button.y}});
		
	}
	
	destructor()
	{
		this.button.destroy();
		this.text.destroy();
		delete this;
	}
}
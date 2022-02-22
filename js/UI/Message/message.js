
export default class MessageGenerator
{
	static messageData = 
	{	"error": 
		{ color: '#f00'},
		"cannot afford":
		{ color: '#f22'}
	
	};
	
	constructor()
	{
		
	}
	
	static generateMessage(params = {message: "error"})
	{
		params.button.spawnMessage({message: params.message});
	}
}

export class Message
{
	constructor(params)
	{
		this.wall = 'not a wall';
		//console.log(params)
		this.text = window.currentScene.add.text(params.position.x, params.position.y, params.message, { fill: MessageGenerator.messageData[params.message].color});
		this.text.setOrigin(.5, .5);
		this.tween = window.currentScene.tweens.add(
		{	targets: this.text,
			y: this.text.y - 50,
			ease: 'Linear',
			duration: 1300,
			onComplete: this.dereference,
			onCompleteParams: this
		});
		//console.log(this.tween)
		
	}
	
	// dereference(tween, targets, param1, ...)
	dereference(tween, target, message)
	{
		message.text.destroy();
		for ( var button in window.currentScene.UI.towersWidget.buttons ) 
		{
			
			if (window.currentScene.UI.towersWidget.buttons[button].message)
			{
				if (window.currentScene.UI.towersWidget.buttons[button].message.text)
				
				{
					console.log(button);
					window.currentScene.UI.towersWidget.buttons[button].message.text.destroy();
				}
				
				delete window.currentScene.UI.towersWidget.buttons[button].message;
			}
		}
		//window.currentScene.player.message.text = {};
	}
}
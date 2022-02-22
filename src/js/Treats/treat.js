

export default class TreatGenerator
{
	static treatData = 
	{
		"basic": {
			key: "treat"
		}
	}
	
	constructor()
	{
		
	}
	
	static generateTreat(params = {treatType: "basic"})
	{
		return new Treat({spriteKey: TreatGenerator.treatData[params.treatType].key});
	}
}

export class Treat
{
	constructor(params = {spriteKey: "treat"})
	{
		this.sprite = window.currentScene.add.image(window.currentScene.input.mousePointer.x, window.currentScene.input.mousePointer.y, params.spriteKey);
		if (params.spriteKey == 'treat')
		{
			this.sprite.setScale(.3, .3);
			//console.log("size changed")
		}
		
		//console.log([window.currentScene.input.mousePointer.x, window.currentScene.input.mousePointer.y])
		
		// make the treat follow the cursor
		window.currentScene.input.on('pointermove', function(pointer) {
			window.currentScene.UI.treatsButton.activeTreat.sprite.x = pointer.x;
			window.currentScene.UI.treatsButton.activeTreat.sprite.y = pointer.y;
			window.currentScene.UI.treatsButton.activeTreat.sprite.setDepth(window.currentScene.calculateZIndex(window.currentScene.UI.treatsButton.activeTreat.sprite));
			//console.log([window.currentScene.UI.treatsButton.activeTreat.sprite.x, window.currentScene.UI.treatsButton.activeTreat.sprite.y])
			
		});
	}
	
	beConsumed()
	{
		window.currentScene.UI.treatsButton.activeTreat.destructor();
	}
	
	destructor()
	{
		window.currentScene.UI.treatsButton.isActive = false;
		window.currentScene.UI.treatsButton.activeTreat.sprite.destroy();
		delete window.currentScene.UI.treatsButton.activeTreat;
	}
	
}
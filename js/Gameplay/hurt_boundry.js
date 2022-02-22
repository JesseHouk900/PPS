import GameOver from '../UI/GameOver/game_over.js';

export default class HurtBoundry
{
	constructor()
	{
		this.zone = window.currentScene.add.zone(127, 313, 254, 626).setRectangleDropZone(254, 626);

		//  Just a visual display of the drop zone
		// this.graphics = window.currentScene.add.graphics();
		// this.graphics.lineStyle(2, 0xffff00);
		// this.graphics.strokeRect(this.zone.x - this.zone.input.hitArea.width / 2, this.zone.y - this.zone.input.hitArea.height / 2, this.zone.input.hitArea.width, this.zone.input.hitArea.height);
		window.currentScene.physics.world.enable(this.zone);
		this.zone.body.debugBodyColor = 0x00fffff;
		window.currentScene.physics.add.overlap(this.zone, window.currentScene.enemyManager.enemies, this.takeDamage);

	}
	
	takeDamage(zone, enemy)
	{
		window.currentScene.enemyManager.enemies.remove(enemy, true, true); 
		window.currentScene.hurtBoundry.gameOver();
	}
	
	gameOver()
	{
		//console.log("gameOver");
		if (!window.currentScene.gameOver)
		{
			window.currentScene.gameOver = new GameOver();
		}
	}
}
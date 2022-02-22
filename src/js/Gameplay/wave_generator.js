import EnemyGenerator from '../Enemies/enemy.js';

export default class WaveGenerator
{
	static generationTimers = [];
    constructor() 
    {
        this.generateWave();
		
    }

    static generateWave(params = {numEnemies: 3})
    {
		// example of a generator function
        // const gen = function*() 
        //     {
        //         var i = 0;
        //         while (true)
        //             yield i++;

        //     }();
        //     var key = "enemy" + gen.next().value;
	
        for (var i = 0; i < params.numEnemies; i++) {
            WaveGenerator.generationTimers.push(setTimeout(() => {
                EnemyGenerator.generateEnemy();
				WaveGenerator.generationTimers.shift();
            }, (i * 10000) + (Math.random() * 5000)));
        }
    }
	
	/** @return {boolean}**/
	static isWaveOver() {
		return (WaveGenerator.generationTimers.length == 0 
			&& 
			window.currentScene.enemyManager.enemies.getChildren().length == 0);
	}
}
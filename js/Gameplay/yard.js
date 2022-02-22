
export default class Yard
{
    constructor()
    {
		this.background = window.currentScene.add.image(0, 0, 'ground').setOrigin(0, 0);
        this.background.setInteractive();
		this.background.setDepth(window.currentScene.calculateZIndex(this));
        this.plantPoints = [];
        this.rows = 5;
        this.columns = 9;
        for (let row = 0; row < this.rows; row++) {
			
			// newPoint = [252 + (col * 80) + 40, 76 + (row * 94) + 47]
			// newPoint[0] = worldWidthOffset + (col * tileWidthOffset) + (tileWidthOffset / 2)
			// newPoint[1] = worldHeightOffset + (row * tileHeightOffset) + (tileHeightOffset / 2)
            for (let col = 0; col < this.columns; col++) {
                var newPoint = [252 + (col * 80) + 40, 76 + (row * 94) + 47];
                this.plantPoints[row * 9 + col] = newPoint;
            }
        }
		this.unhide();
		
		
    }

    FindNearestPoint()
    {
        const self = this;
        const position = ms => new Promise(function(resolve)
        { 
            var currentPosition = [window.currentScene.input.mousePointer.x, window.currentScene.input.mousePointer.y];
            var nearestPoint = self.plantPoints[0];
            var shortestDistance = Math.hypot(currentPosition[0] - nearestPoint[0], currentPosition[1] - nearestPoint[1]);
            for (let i = 1; i < self.plantPoints.length; i++ ) {
                let currentPoint = self.plantPoints[i];
                let distance = Math.hypot(currentPosition[0] - currentPoint[0], currentPosition[1] - currentPoint[1]);

                if (distance < shortestDistance) {
                    nearestPoint = self.plantPoints[i];
                    shortestDistance = distance;
                }
            }
            
            setTimeout(function() {resolve(nearestPoint);}, ms);
        });
        return position(100);
    }
	
	// takes [row, col]
	// returns [height, width]
    getYardPointPosition(point = [])
    {
        return this.plantPoints[point[0] * 9 + point[1]];
    }
	
	// takes [x, y]
	// returns [col, row]
	getYardSquarePosition(point = [])
	{
		// return[0] = (point[0] - (worldWidthOffset + (tileWidthOffset / 2))) / tileWidthOffset
		// return[1] = (point[1] - (worldHeightOffset + (tileHeightOffset / 2))) / tileHeightOffset
		
		return [Math.abs(Math.round((point[0] - (252 + 40)) / 80)), Math.abs(Math.round((point[1] - (76 + 47)) / 94))];
	}
	
	hide()
	{
		this.background.destroy();
		window.currentScene.player.removeAllTowers();
		window.currentScene.UI.hideYardUI();
		console.log('unimplemented')
	}
	
	unhide()
	{
		console.log('unimplemented')
	}
}
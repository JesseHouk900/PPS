import TowerGenerator, { Tower } from '../Towers/tower.js';
import TowerWidget from './Widgets/tower_widget.js';
import BudgetWidget from './Widgets/budget_widget.js';
import TreatsButton from './Buttons/treats_button.js';


export default class UI
{
    constructor()
    {
        
		this.towersWidget = new TowerWidget();
		
		this.budgetWidget = new BudgetWidget();
		
		this.treatsButton = new TreatsButton(
		{	text: window.currentScene.player.budget.treats,
			position: [window.currentScene.sys.game.canvas.width * (9 / 10), window.currentScene.sys.game.canvas.height * (1 / 10)],
			style: {fill: '#fff', fontSize: '12px'},
			icon: 'treat'});
		//this.treatsButton.sprite.setDepth(window.currentScene.calculateZIndex(this));
		this.treatsButton.button.setScale(.25, .25);
		
    }

    onClick() {
		if (window.currentScene.player.isGhostActive) {
			TowerGenerator.generateTower({spriteKey: window.currentScene.player.towers["ghost"].key, isFromGhost: true});
        }
		else if (window.currentScene.UI.treatsButton.isActive && window.currentScene.UI.treatsButton.towerSelected) {
			window.currentScene.input.off('pointermove');
			window.currentScene.player.towers[window.currentScene.UI.treatsButton.towerSelected].fetchTreat(window.currentScene.UI.treatsButton.activeTreat);
		}
		else {
			if (window.currentScene.player.recentlyClickedTower != "") {
				console.log(window.currentScene.player.towers)
				window.currentScene.player.towers[window.currentScene.player.recentlyClickedTower].sprite.clearTint();
			}
			if (window.currentScene.UI.treatsButton.isActive) {
				
				window.currentScene.input.off('pointermove');
				window.currentScene.UI.treatsButton.activeTreat.beConsumed();
				window.currentScene.UI.treatsButton.text.setText(parseInt(window.currentScene.UI.treatsButton.text.text) + 1);
			}
		}
    }
	
	hideYardWithoutSavingPositions() {
		window.currentScene.yard.hide();
	}
	
	createOrOpenEndOfDayMenu() {
		window.currentScene.__create_game_object__(this, {objectName: 'endDayMenu'});
	}
	
	switchFromYardToEndOfDayMenu(){
		this.hideYardWithoutSavingPositions();
		this.createOrOpenEndOfDayMenu();
	}
	
	hideYardUI() {
		this.treatsButton.destructor();
		this.towersWidget.destructor();
	}
}

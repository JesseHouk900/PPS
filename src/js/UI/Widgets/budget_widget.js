
export default class BudgetWidget
{
	constructor()
	{
		this.cashText = window.currentScene.add.text(10, 10, "Cash: " + window.currentScene.player.budget.cash);
		this.treatsText = window.currentScene.add.text(10, 30, "Treats: " + window.currentScene.player.budget.treats);
		
	}
	
	update()
	{
		this.cashText.text = "Cash: " + window.currentScene.player.budget.cash;
		this.treatsText.text = "Treats: " + window.currentScene.player.budget.treats;
	}
}


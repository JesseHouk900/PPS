

export default class RewardGenerator
{
	static rewardData = {
		"plant": {
			cash: 7
		}
	};
	
	static rarityData = {
		"common": {
			multipliers: {
				cash: .75,
				treats: .5
			}
		}
	};
	
	constructor()
	{
	
	}
	
	static generateReward(enemyName, rarityType)
	{

		let reward = {};
		for (var attr in RewardGenerator.rewardData[enemyName])
		{
			if (typeof(RewardGenerator.rewardData[enemyName][attr]) == typeof(1))
			{
				reward[attr] = RewardGenerator.rewardData[enemyName][attr] * RewardGenerator.rarityData[rarityType].multipliers[attr];
			}
			
		}
		return reward;
	}
}
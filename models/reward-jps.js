module.exports = function(sequelize, DataTypes) {
	var Reward = sequelize.define('reward', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			len: [1]
		},
		pointsWorth: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	}

	// Here we'll need to pass a second "classMethods" object into the define method
	// This is for any additional configuration we want to give our models
	
		// {
		// 	// We're saying that we want our 'child' to have Rewards
		// 	classMethods: {
		// 		associate: function(models) {
		// 			// A 'child' (foreignKey) is required or a Reward can't be made
		// 			Reward.belongsTo(models.Child, {
		// 				foreignKey: {
		// 					allowNull: false
		// 				}
		// 			});
		// 		}
		// 	}
		// }
		);
	return Reward;
};

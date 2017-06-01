/**
 * Created by Miguel on 5/24/2017.
 */

module.exports = (sequelize, DataTypes) => {
  const Rewards = sequelize.define("rewards", {
      name: { type: DataTypes.STRING, allowNull: false},
      // redeemAmount: { type: DataTypes.INTEGER, allowNull: false},
      pointsworth: { type: DataTypes.INTEGER, allowNull: false}
      // created: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW}
    // }
    // {
    //   classMethods: {
    //     associate: function (models) {
    //       Users.hasMany(models.events, {
    //         onDelete: "cascade"
    //       });
    //     }
    //   }
    }
    );
  return Rewards;
};
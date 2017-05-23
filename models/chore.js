/**
 * Created by Miguel on 5/21/2017.
 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("chore", {
    name: { type: DataTypes.STRING, allowNull: false},
    points_worth: { type: DataTypes.INTEGER, allowNull: false},
    created: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW}
  });
};
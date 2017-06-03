/**
 * Created by Miguel on 5/21/2017.
 */

module.exports = (sequelize, DataTypes) => {
  const Chores = sequelize.define("chores", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    name: { type: DataTypes.STRING, allowNull: false},
    pointsWorth: { type: DataTypes.INTEGER, allowNull: false},
    completed: { type: DataTypes.BOOLEAN, defaultValue: 0}
    // created: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW}
  },
  {
    classMethods: {
      associate: function (models) {
        Chores.hasMany(models.events, {
          onDelete: "cascade"
        });
      }
    }
  });
 return Chores;
};
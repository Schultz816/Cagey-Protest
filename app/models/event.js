module.exports = (sequelize, DataTypes) => {
  var Events = sequelize.define("events", {
    completed: {type: DataTypes.DATE, allowNull: true} //defaultValue: DataTypes.NOW}
  })
  return Events;
};

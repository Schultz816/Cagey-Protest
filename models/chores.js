/**
 * Created by Miguel on 5/21/2017.
 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("chores", {
    // Giving the Author model a name of type STRING
      name: { type: DataTypes.STRING, allowNull: false},
      points_worth: { type: DataTypes.INTEGER(6), allowNull: false},
      created: { type: DataTypes.DATEONLY, allowNull: false}
    }
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    // {
    //   // We're saying that we want our Author to have Posts
    //   classMethods: {
    //     associate: function(models) {
    //       // Associating Author with Posts
    //       // When an Author is deleted, also delete any associated Posts
    //       Author.hasMany(models.Post, {
    //         onDelete: "cascade"
    //       });
    //     }
    //   }
    // }

  );
};
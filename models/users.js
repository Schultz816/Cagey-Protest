// module.exports = function(sequelize, DataTypes) {
//
//     var User = sequelize.define("User", {
//         username: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         email: {
//             type: DataTypes.STRING,
//                 allowNull: true,
//         }
//     })
//     return User;
// }

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users", {
        fName: {
            type: DataTypes.STRING,
            // allowNull: true,
            // validate: {min: 1}
        },
        lName: {
            type: DataTypes.STRING,
            // allowNull: true,
            // validate: {min: 1}
            },
        //parent_id: { type: DataTypes.INTEGER, allowNull: true},
        username: {
            type: DataTypes.STRING,
            // allowNull: false,
            // unique: true,
            // validate: {min: 3}
        },
        email: {
            type: DataTypes.STRING,
            // allowNull: false,
            // unique: true,
            // validate: {isEmail: true}
        },
        password: {
            type: DataTypes.STRING,
            // allowNull: false /*validate: {min: 8}*/
        },
        pointsEarned: {
            type: DataTypes.INTEGER,
            // defaultValue: 0
        }
    });
    // ,
    // {
    //     classMethods: {
    //         associate: function (models) {
    //             // When an user is deleted, so are any related events and child-users
    //             Users.hasMany(models.events, {
    //                 onDelete: "cascade"
    //             }),
    //                 Users.hasMany(models.users, {
    //                     as: 'Parent',
    //                     foreignKey : 'parentId',
    //                     onDelete: "cascade"
    //                 });
    //         }
    //     }
    // });
    return Users;
}
;
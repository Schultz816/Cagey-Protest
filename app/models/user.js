module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("users", {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        firstname: {
            type: DataTypes.STRING,
            notEmpty: true,
            validate: {min: 1}
        },

        lastname: {
            type: DataTypes.STRING,
            notEmpty: false
        },

        username: {
            type: DataTypes.TEXT
        },

        about: {
            type: DataTypes.TEXT
        },

        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            },
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        last_login: {
            type: DataTypes.DATE
        },

        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
        pointsWorth: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }

    },
    {
        classMethods: {
          associate: function (models) {
            // When an user is deleted, so are any related events and child-users
            User.hasMany(models.events, {
              onDelete: "cascade"
            }),
              User.hasMany(models.users, {
                as: 'Parent',
                foreignKey : 'parentId',
                onDelete: "cascade"
              }),
              User.hasMany(models.rewards, {
                onDelete: "cascade"
              });
          }
        }
    }
    );
    return User;
};




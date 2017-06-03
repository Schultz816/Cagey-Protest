module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {

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

        group: {
            type: DataTypes.STRING
        },

        pointsEarned: {
            type: DataTypes.INTEGER
        }

    },
    {
        classMethods: {
          associate: function (models) {
            // When an user is deleted, so are any related events and child-users
            User.hasMany(models.events, {
              onDelete: "cascade"
            }),
              User.hasMany(models.user, {
                as: 'Parent',
                foreignKey : 'parentId',
                onDelete: "cascade"
              }),
              User.hasMany(models.rewards, {
                onDelete: "cascade"
              }),
              User.hasMany(models.chores, {
                onDelete: "cascade"
              })
          }
        }
    }
    );

    return User;
};




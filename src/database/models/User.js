module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user: {
            type: dataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        },
        deleted:{
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false,
    };
    let User = sequelize.define(alias, cols, config)

    User.associate = function (models) {
        User.belongsTo(models.UserCategory, { 
            as: "categoria",
            foreignKey: "category_id"
        });
    }

    return User;
}
module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        user: {
            type: dataTypes.STRING(12),
            allowNull: false
        },
        first_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(250),
            allowNull: false
        },
        category_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        deleted:{
            type: dataTypes.INTEGER(11),
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
            as: "user_category",
            foreignKey: "category_id"
        });
    }

    return User;
}
module.exports = (sequelize, dataTypes) => {
    let alias = 'UserCategory';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'user_categories',
        timestamps: false
    };

    let UserCategory = sequelize.define(alias, cols, config)

    UserCategory.associate = function (models) {
        UserCategory.hasMany(models.Users, { 
            as: "users",
            foreignKey: "category_id"
        });
    }


    return UserCategory;
}

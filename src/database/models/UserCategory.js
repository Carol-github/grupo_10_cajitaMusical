module.exports = (sequelize, dataTypes) => {
    let alias = 'UserCategory';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: dataTypes.STRING(50)
        }
    };
    let config = {
        tableName: 'user_categories',
        timestamps: false
    };

    let UserCategory = sequelize.define(alias, cols, config)


    return UserCategory;
}

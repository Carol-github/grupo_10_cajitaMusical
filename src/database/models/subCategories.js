const Category = require("./Category");

module.exports = (sequelize, dataTypes) => {
    let alias = 'SubCategories';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50)
        },
        idCategory: {
            type: dataTypes.INTEGER,
            references: {
                model: Category,
                key: 'id',
              }
        }
    };
    let config = {
        tableName: 'subCategories',
        timestamps: false
    };
    const SubCategory = sequelize.define(alias, cols, config)



    return SubCategory;
}

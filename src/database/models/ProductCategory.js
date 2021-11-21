module.exports = (sequelize, dataTypes) => {
    let alias = "ProductCategory";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.TEXT
        },
        image: {
            type: dataTypes.STRING
        },
        icon: {
            type: dataTypes.STRING
        },
        deleted: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: "product_categories",
        timestamps: false
    }
    
    const ProductCategory = sequelize.define(alias, cols, config);

    return ProductCategory;
}
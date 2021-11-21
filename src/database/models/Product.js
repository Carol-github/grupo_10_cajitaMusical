module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        },
        offer: {
            type: dataTypes.INTEGER
        },
        price: {
            type: dataTypes.INTEGER
        },
        fk_category: {
            type: dataTypes.INTEGER
        },
        fk_subcategory: {
            type: dataTypes.INTEGER
        },
        description: {
            type: dataTypes.TEXT
        },
        image: {
            type: dataTypes.STRING
        },
        deleted: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: "products",
        timestamps: false
    }
    
    const Product = sequelize.define(alias, cols, config);

    return Product;
}
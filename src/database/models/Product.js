module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100)
        },
        price: {
            type: dataTypes.FLOAT
        },
        idCategory: {
            type: dataTypes.INTEGER
        },
        idSubcategory: {
            type: dataTypes.INTEGER
        },
        description: {
            type: dataTypes.TEXT
        },
        image: {
            type: dataTypes.BLOB
        },
        /*deleted: {
            type: dataTypes.INTEGER
        }*/
    };
    let config = {
        tableName: "products",
        timestamps: false
    }
    
    const Product = sequelize.define(alias, cols, config);

    return Product;
}
module.exports = (sequelize, dataTypes) => {
    let alias = "ProductSubcategory";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        subcategory_name: {
            type: dataTypes.STRING
        },        
        fk_category: {
            type: dataTypes.STRING
        },
        deleted: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: "product_subcategories",
        timestamps: false
    }
    
    const ProductSubcategory = sequelize.define(alias, cols, config);

    return ProductSubcategory;
}
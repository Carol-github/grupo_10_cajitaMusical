module.exports = (sequelize, dataTypes) => {
    let alias = "ProductSubcategory";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        subcategory_name: {
            type: dataTypes.STRING,
            allowNull: false
        },        
        fk_category: {
            type: dataTypes.STRING,
            allowNull: false
        },
        deleted: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: "product_subcategories",
        timestamps: false
    }
    
    const ProductSubcategory = sequelize.define(alias, cols, config);
     
    ProductSubcategory.associate = function (models) {
        ProductSubcategory.belongsTo(models.ProductCategory, { // models.Genre -> Genres es el valor de alias en genres.js
            as: "products",
            foreignKey: "fk_category"
        });
    }
    ProductSubcategory.associate = function (models) {
        ProductSubcategory.hasMany(models.Products, { // models.Genre -> Genres es el valor de alias en genres.js
            as: "products",
            foreignKey: "fk_subcategory"
        });
    }
    return ProductSubcategory;
}
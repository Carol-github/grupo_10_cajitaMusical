module.exports = (sequelize, dataTypes) => {
    let alias = "ProductCategories";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        },
        icon: {
            type: dataTypes.STRING,
            allowNull: false
        },
        deleted: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: "product_categories",
        timestamps: false
    }
    
    const ProductCategory = sequelize.define(alias, cols, config);
   
        ProductCategory.associate = function (models) {
         ProductCategory.hasMany(models.Products, { // models.Genre -> Genres es el valor de alias en genres.js
             as: "products",
             foreignKey: "fk_category"
         });
        }

    ProductCategory.associate = function (models) {
         ProductCategory.hasMany(models.ProductSubcategories, { // models.Genre -> Genres es el valor de alias en genres.js
             as: "subcategories",
             foreignKey: "fk_subcategory"
         });
        }

    return ProductCategory;
}
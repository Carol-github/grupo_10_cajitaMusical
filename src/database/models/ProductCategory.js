module.exports = (sequelize, dataTypes) => {
    let alias = "ProductCategory";
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
         ProductCategory.hasMany(models.ProductSubcategory, { // models.Genre -> Genres es el valor de alias en genres.js
             as: "products",
             foreignKey: "fk_category"
         });
        }

    return ProductCategory;
}

module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false
        },
        offer: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        fk_category: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        fk_subcategory: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        },
        deleted: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: "products",
        timestamps: false
    }
    let  Product = sequelize.define(alias, cols, config);
         
    // Product.associate = function (models) {
    //     Product.hasMany(models.Product, { // models.Genre -> Genres es el valor de alias en genres.js
    //         as: "genero",
    //         foreignKey: "fk_category"
    //     });
    //    }
    
       Product.associate = function (models) {
        Product.belongsTo(models.ProductSubcategory, { // models.Genre -> Genres es el valor de alias en genres.js
            as: "subcategoria",
            foreignKey: "fk_subcategory"
        });
       }

    return Product;
}
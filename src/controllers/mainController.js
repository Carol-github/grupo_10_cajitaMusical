const fs = require('fs');
const path = require('path');

// DATABASE

/*LLAMADO DE DB*/
let db = require("../database/models");
const { restart } = require('nodemon');
const { Console } = require('console');
const sequelize = db.sequelize;
/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
// const productsFilePath = path.join(__dirname, '../data/dataProducts.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// const categoriesFilePath = path.join(__dirname, '../data/dataCategory.json');
// const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

//const mainController = {
  //  index: (req, res) => {
        //res.render(path.join(__dirname, '../views/index/index.ejs'));
    //    res.render('index/index');
   // }
//}


const mainController = {
  index: (req, res) => {
    db.Products.findAll({
      where: {
        offer: 1,
        deleted: 0,
      },
    }).then((products_in_sale) => {
      sequelize.query("SELECT * FROM product_categories").then((categories) => {
        res.render("index.ejs", {
          userLogged: req.session.userLogged,
          products_in_sale: products_in_sale,
          categories: categories[0],
        });
      });
    });
  }  
}

module.exports = mainController;

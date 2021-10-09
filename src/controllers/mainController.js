const fs = require('fs');
const path = require('path');

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/dataProducts.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const categoriesFilePath = path.join(__dirname, '../data/dataCategory.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

//const mainController = {
  //  index: (req, res) => {
        //res.render(path.join(__dirname, '../views/index/index.ejs'));
    //    res.render('index/index');
   // }
//}


const mainController = {
	index: (req, res) => {
		const products_in_sale = products.filter(product => {
			return product.oferta == "true"
		});
        // console.log(products_in_sale);
		res.render('index.ejs',{
			products_in_sale: products_in_sale,
			categories: categories
		});
	}
};



module.exports = mainController;

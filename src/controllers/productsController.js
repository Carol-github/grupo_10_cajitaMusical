const path = require('path');
const fs = require('fs');

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/dataProducts.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productsController = {
    productCart: (req, res) => {
        //res.sendFile(path.join(__dirname, '../views/products/productCart.html'));
        res.render('products/productCart');
        
    },
   
    productDetail: (req, res) => {
        const product = products.filter(product => product.id_prod === req.params.id);
        console.log(product)
        res.render('products/productDetail',{ product });
    },
    productList: (req, res) => {
        //res.sendFile(path.join(__dirname, '../views/products/productDetail.html'));
        // res.render('products/productList');
        res.render('products/productList',{
			products: products
		});
    }
}

module.exports = productsController;

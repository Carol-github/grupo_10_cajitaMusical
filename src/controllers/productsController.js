const path = require('path');

const productsController = {
    productCart: (req, res) => {
        //res.sendFile(path.join(__dirname, '../views/products/productCart.html'));
        res.render('products/productCart');
    },
    productDetail: (req, res) => {
        //res.sendFile(path.join(__dirname, '../views/products/productDetail.html'));
        res.render('products/productDetail');
    }
}

module.exports = productsController;

const path = require('path');

const productsController = {
    productCart: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/products/productCart.html'));
    },
    productDetail: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/products/productDetail.html'));
    }
}

module.exports = productsController;

const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController.js');

router.get('/carrito', productsController.productCart);
router.get('/detalle', productsController.productDetail);
router.get('/lista', productsController.productList);

module.exports = router;
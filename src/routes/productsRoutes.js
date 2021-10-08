const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController.js');

// CARRITO 
router.get('/carrito', productsController.productCart);
// router.get('/detalle', productsController.productDetail);

// DETALLE
router.get('/detalle/:id', productsController.productDetail);

// LISTA
router.get('/lista', productsController.productList);
// CREACION


// EDICION


// BORRADO

module.exports = router;
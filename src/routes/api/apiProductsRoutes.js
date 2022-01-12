const express = require ('express');
const router = express.Router();
const multer = require('multer');
const path = require ('path');

const apiProductsController = require ('../../controllers/api/apiProductsController');

 router.get('/', apiProductsController.index);
 router.get('/:id', apiProductsController.productDetail);

module.exports = router;
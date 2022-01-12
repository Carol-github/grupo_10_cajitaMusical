const express = require ('express');
const router = express.Router();
const multer = require('multer');
const { resetWatchers } = require('nodemon/lib/monitor/watch');
const path = require ('path');

const apiProductsController = require ('../../controllers/api/apiProductsController');

 router.get('/:page', apiProductsController.index);
 router.get('/item/:id', apiProductsController.productDetail);

module.exports = router;
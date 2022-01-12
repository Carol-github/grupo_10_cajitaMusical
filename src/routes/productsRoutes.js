const path = require("path");
const express = require('express');
const router = express.Router();
const multer = require('multer');

const { body } = require('express-validator');

const validateCreateProductForm = [
    body('prod_name')
      .notEmpty().withMessage('Debes ingresar el nombre del producto')
      .isLength({min: 5}).withMessage('El nombre debe tener al menos cinco caracteres'),
      
     body('prod_price')
       .notEmpty().withMessage('Debes ingresar el precio del producto')
       .isLength({min: 2}).withMessage('El precio debe tener al menos dos caracteres'),

     body('prod_desc')
       .notEmpty().withMessage('Debes ingresar la descrición del producto')
      .isLength({min: 20}).withMessage('La descripción debe tener al menos veinte caracteres'),

     body('prod_cat')
      .notEmpty().withMessage('Debes seleccionar una categoría para el producto')
       ,

       body('prod_subcat')
       .notEmpty().withMessage('Debes seleccionar una subcategoría para el producto')
       ,

    body('prod_img').custom((value, {req}) => {
      let file = req.file;
      let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif']
     
      if (!file) {
        throw new Error('Tenes que subir una imagen');
      } else {
        let fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)){
          throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
        }
      }     

      return true;
    })
   ]

// Middlewares
const authMiddleware = require('../middlewares/authMiddleware');

//aca definimos donde se van a guardar las imagenes de los usuarios
const storage = multer.diskStorage({ 
    //creacion nde ruta
    destination: function (req, file, cb) { 
       cb(null, './public/img/imgProducts'); 
    }, 
    // creacion de nombre de archivo
    filename: function (req, file, cb) {
       let productName = req.body.prod_name; 
       
       let imageFinalName = `imgProduct_${Date.now()}_${path.extname(file.originalname)}`;

       cb(null, imageFinalName);  
    } 
});

const uploadFile = multer({ storage });

const productsController = require('../controllers/productsController.js');

// CARRITO 
//router.get('/carrito', authMiddleware, productsController.productCart);
router.get('/carrito', productsController.productCart);
router.post('/carrito', productsController.addToCart);
router.post('/outcart', productsController.cartDelete);

// DETALLE
router.get('/detalle/:id', productsController.productDetail);

// LISTA
// router.get('/lista', productsController.productList);
router.get('/lista', productsController.search);
router.get('/lista/:category', productsController.listByCategory);


// CREACION
router.get("/carga_producto", authMiddleware, productsController.upload);
router.post("/carga_producto", uploadFile.single("prod_img"), validateCreateProductForm, productsController.store)

// EDICION
router.get("/:id/edita_producto", authMiddleware, productsController.edit);
router.put("/edita_producto/:id", authMiddleware, uploadFile.single("prod_img"), productsController.updated);

// BORRADO
router.delete("/borrado/:id", authMiddleware, productsController.delete);

module.exports = router;
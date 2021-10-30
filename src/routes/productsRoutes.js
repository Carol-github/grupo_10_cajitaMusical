const path = require("path");
const express = require('express');
const router = express.Router();
const multer = require('multer');

// Middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

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
router.get('/carrito', authMiddleware, productsController.productCart);
// router.get('/detalle', productsController.productDetail);

// DETALLE
router.get('/detalle/:id', productsController.productDetail);

// LISTA
router.get('/lista', productsController.productList);
// CREACION
router.get("/carga_producto", authMiddleware, productsController.upload);
router.post("/carga_producto", uploadFile.single("prod_img"), productsController.store)

// EDICION
router.get("/:id/edita_producto", authMiddleware, productsController.edit);
router.put("/edita_producto/:id", uploadFile.single("prod_img"), productsController.updated);

// BORRADO
router.delete("/borrado/:id", authMiddleware, productsController.delete);

module.exports = router;
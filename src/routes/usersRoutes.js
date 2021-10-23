const path = require("path");
const express = require('express');
const router = express.Router();
const multer = require('multer');

//aca definimos donde se van a guardar las imagenes de los usuarios
const diskStorage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/img/avatars'); 
    }, 
    filename: function (req, file, cb) { 
       let userName = req.body.avatar;

       let avatarFinalName = `avatar_${Date.now()}_${path.extname(file.originalname)}`;

       cb(null, avatarFinalName);  
      } 
  });

const upload = multer({ storage: diskStorage });


const usersController = require('../controllers/usersController.js');

router.get('/ingresar', usersController.login);
router.post('/ingresar', usersController.process_login);

router.get('/registrar', usersController.register);
router.post('/registrar', upload.single('avatar'), usersController.store)

router.get('/admin', usersController.admin);


router.get('/modificar', usersController.modify);


module.exports = router;
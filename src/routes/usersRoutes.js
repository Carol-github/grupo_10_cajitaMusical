const express = require('express');
const router = express.Router();
const multer = require('multer');

//aca definimos donde se van a guardar las imagenes de los usuarios
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/img/users'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
  });

const uploadFile = multer({ storage });


const usersController = require('../controllers/usersController.js');

router.get('/ingresar', usersController.login);
router.post('/ingresar', usersController.process_login);

router.get('/registrar', usersController.register);
router.post('/registrar', uploadFile.single("avatar"),usersController.store)

router.get('/admin', usersController.admin);


router.get('/modificar', usersController.modify);


module.exports = router;
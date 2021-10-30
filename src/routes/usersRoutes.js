const path = require("path");
const express = require('express');
const router = express.Router();
const multer = require('multer');

// Middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
//aca definimos donde se van a guardar las imagenes de los usuarios
const diskStorage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/img/users'); 
    }, 
    filename: function (req, file, cb) { 
       let userName = req.body.avatar;

       let avatarFinalName = `avatar_${Date.now()}_${path.extname(file.originalname)}`;

       cb(null, avatarFinalName);  
      } 
  });

const upload = multer({ storage: diskStorage });


const usersController = require('../controllers/usersController.js');

router.get('/ingresar', guestMiddleware, usersController.login);
router.post('/ingresar', usersController.process_login);

router.get('/registrar', guestMiddleware, usersController.register);
router.post('/registrar', upload.single('avatar'), usersController.store)

router.get('/admin', authMiddleware, usersController.admin);


router.get('/modificar', authMiddleware, usersController.modify);


module.exports = router;
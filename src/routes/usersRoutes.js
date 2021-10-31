const path = require("path");
const express = require('express');
const router = express.Router();
const multer = require('multer');

const { body } = require('express-validator');

const validateCreateUserForm = [
    body('user').notEmpty().withMessage('Debes ingresar un nombre de usuario'),
    body('first_name').notEmpty().withMessage('Debes ingresar un nombre'),
    body('last_name').notEmpty().withMessage('Debes ingresar un apellido'),
    body('email').isEmail().withMessage('Debes ingresar un email válido'),
    body('avatar').notEmpty().withMessage('Debes ingresar una imagen'),
    body('password').notEmpty().withMessage('Debes ingresar un password'),
    body('confirm_password').notEmpty().withMessage('Debes ingresar una confirmación de password')
]


// Middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
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

router.get('/ingresar', guestMiddleware, usersController.login);
router.post('/ingresar', usersController.process_login);

router.get('/registrar', guestMiddleware, usersController.register);
router.post('/registrar', upload.single('avatar'), validateCreateUserForm, usersController.store)

router.get('/admin', authMiddleware, usersController.admin);


router.get('/modificar', authMiddleware, usersController.modify);


module.exports = router;
const path = require("path");
const express = require('express');
const router = express.Router();
const multer = require('multer');

const { body } = require('express-validator');

const validateCreateUserForm = [
    body('user')
      .notEmpty().withMessage('Debes ingresar un nombre de usuario'),

    body('first_name')
      .notEmpty().withMessage('Debes ingresar un nombre')
      .isLength({min: 2}).withMessage('El nombre debe tener al menos dos caracteres'),

    body('last_name')
      .notEmpty().withMessage('Debes ingresar un apellido')
      .isLength({min: 2}).withMessage('El apellido debe tener al menos dos caracteres'),

    body('email')
      .notEmpty().withMessage('Debes ingresar una dirección de correo')
      .isEmail().withMessage('Debes ingresar un email válido'),

   //  body('avatar')
   //    .notEmpty().withMessage('Debes ingresar una imagen'),

    body('password')
      .notEmpty().withMessage('Debes ingresar un password')
      .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
      // .matches(
      //    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
      //  ).withMessage('La confirmación de contraseña debe tener al menos un carecter especial'),

   //  body('confirm_password')
   //    .notEmpty().withMessage('Debes ingresar una confirmación de contraseña')
   //    .isLength({min: 8}).withMessage('La confirmación de contraseña debe tener al menos 8 caracteres')
      // .matches(
      //    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
      //  ).withMessage('La confirmación de contraseña debe tener al menos un carecter especial')
]

const validateLoginUserForm = [
   body('email').notEmpty().withMessage('Debes ingresar un email válido'),
   body('password').notEmpty().withMessage('Debes ingresar un password'),
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
router.post('/ingresar', validateLoginUserForm, usersController.process_login);

router.get('/registrar', guestMiddleware, usersController.register);
router.post('/registrar', upload.single('avatar'), validateCreateUserForm, usersController.store)

router.get('/admin', authMiddleware, usersController.admin);

router.get('/modificar', authMiddleware, usersController.modify);
router.put("/modificar", upload.single("avatar"), usersController.updated);

router.put("/borrar", usersController.delete);
router.get('/logout', authMiddleware, usersController.logout);


module.exports = router;
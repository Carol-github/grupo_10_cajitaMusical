const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController.js');

router.get('/ingresar', usersController.login);
router.post('/ingresar', usersController.process_login);

router.get('/registrar', usersController.register);
router.post('/registrar', usersController.store)

router.get('/admin', usersController.admin);


router.get('/modificar', usersController.modify);

router.get('/upload', usersController.upload);

module.exports = router;
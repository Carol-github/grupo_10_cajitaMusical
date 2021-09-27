const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController.js');

router.get('/ingresar', usersController.login);
router.get('/registrar', usersController.register);
router.get('/admin', usersController.admin);

module.exports = router;
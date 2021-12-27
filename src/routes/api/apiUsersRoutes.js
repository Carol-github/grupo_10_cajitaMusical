const express = require ('express');
const router = express.Router();
const multer = require('multer');
const path = require ('path');

const apiUserController = require ('../../controllers/api/apiUsersController');

router.get('/', apiUserController.index);
router.get('/:id', apiUserController.find);

module.exports = router;
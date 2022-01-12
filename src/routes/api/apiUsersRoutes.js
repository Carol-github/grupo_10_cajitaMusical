const express = require ('express');
const router = express.Router();
const multer = require('multer');
const path = require ('path');

const apiUserController = require ('../../controllers/api/apiUsersController');

router.get('/:page', apiUserController.index);
router.get('/usuario/:id', apiUserController.userDetail);

module.exports = router;
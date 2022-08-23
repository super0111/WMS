const express = require('express');

const UserCtrl = require('../controllers/user');

const router = express.Router();


router.get('/', UserCtrl.getUser);

module.exports = router;

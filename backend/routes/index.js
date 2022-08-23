const express = require('express');
const user = require('./user');
const accessToken = require("./accessRoute");
const pallet = require("./pallet_routes");
const slot = require("./slot_routes");


const router = express.Router();


router.use('/user', user);
router.use('/pallet', pallet);
router.use('/slot', slot);
router.use('/access', accessToken);


module.exports = router;

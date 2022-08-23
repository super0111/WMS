  const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// creating JWT token
router.post("/", (req, res) => {
  const pallet_serial = req.body.pallet_serial;
  const user = { pallet_serial: pallet_serial };
  accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

module.exports = router;

const jwt = require("jsonwebtoken");
require("dotenv").config();

const config = process.env;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    req.pallet_serial = decoded.pallet_serial;
    console.log(token);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};


module.exports = verifyToken;

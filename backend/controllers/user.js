"use strict";

var hana = require("@sap/hana-client");
const config = require("../config/db_config");

var connOptions = {
  serverNode: "39131d87-3fe4-441f-9bfd-44f6e390d351.hana.trial-us10.hanacloud.ondemand.com:443",
  encrypt: "true",
  sslValidateCertificate: "false",
  uid: "DBADMIN",
  pwd: "5efddKAMATI",
};

var dbConnection = hana.createConnection();


const getUser = async (req, res) => {
  dbConnection.connect(config.db, function (err) {
    if (err) throw err;
    dbConnection.exec(
      "SELECT * FROM USERS",
      function (err, result) {
        if (err) {
          console.log("Error");
          throw err;
        }
        console.log(result);
        dbConnection.disconnect();
        return res.send(result);
      }
    );
  });
};



module.exports = {

  getUser,
};

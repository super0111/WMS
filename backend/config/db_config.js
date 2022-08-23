
var hana = require("@sap/hana-client");

const config = {
  db: {
  serverNode: "39131d87-3fe4-441f-9bfd-44f6e390d351.hana.trial-us10.hanacloud.ondemand.com:443",
  encrypt: "true",
  sslValidateCertificate: "false",
  uid: "DBADMIN",
  pwd: "5efddKAMATI",
  },
};

const dbConnection = hana.createConnection();

dbConnection.connect(config.db,(err) => {
  if (err) {
    console.log("failed to connect to SAP HAN DB:", err.message);
    return;
  }
  console.log("Server Successfully connected to warehouse SAP HAN database");
});

module.exports = dbConnection;

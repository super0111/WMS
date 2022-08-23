const connection = require("../config/db_config");

const PalletModel = function (pallet_serial, pallet) {
  this.pallet_serial = pallet_serial;
  this.slot_serial = pallet.slot_serial;
  this.creator = pallet.creator;
  this.pallet_type = pallet.pallet_type;
  this.description = pallet.description;
  this.date_created = pallet.date_created;
  this.last_update = pallet.last_update;
  this.good_value = pallet.good_value;
};

PalletModel.create = (Pallet, result) => {
  console.log("Pallet: ",Pallet )
  connection.exec(
    "insert into PALLET(pallet_serial, slot_serial,creator, pallet_type, description, date_created, last_update, good_value) values (" + Pallet.pallet_serial + ", '" + Pallet.slot_serial + "','" + Pallet.creator + "','" + Pallet.pallet_type + "','" + Pallet.description + "','" + Pallet.date_created + "', '" + Pallet.last_update + "'," + Pallet.good_value + ");",
    Pallet,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("add new value to cell network value: ", {
        id: res.insertId,
        ...Pallet,
      });
      result(null, { id: res.insertId, ...Pallet });
    }
  );
};

PalletModel.getAll = (Pallet, result) => {
  let query = "SELECT * FROM PALLET";
  /*if (pallet_serial) {
    query += ` WHERE pallet_serial LIKE '%${DRN}%'`;
  }*/
  connection.exec(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("pallet: ", res);
    result(null, res);
  });
};

PalletModel.findById = (pallet_serial, result) => {
  connection.exec(
    `SELECT * FROM PALLET WHERE pallet_serial = ${pallet_serial}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found PALLET: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found pallet with the id
      result({ kind: "not_found" }, null);
    }
  );
};

PalletModel.findBySlotId = (slot_serial, result) => {
  connection.exec(
    `SELECT * FROM PALLET WHERE slot_serial = ${slot_serial}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found PALLET: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found pallet with the id
      result({ kind: "not_found" }, null);
    }
  );
};

PalletModel.remove = (pallet_serial, result) => {
  connection.exec(
    `DELETE FROM PALLET WHERE pallet_serial = ${pallet_serial}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found meter with the DRN
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted Pallet with pallet_serial: ", pallet_serial);
      result(null, res);
    }
  );
};

PalletModel.removeBySlotID = (slot_serial, result) => {
  connection.exec(
    `DELETE FROM PALLET WHERE slot_serial = ${slot_serial}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found meter with the DRN
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted Pallet with slot_serial: ", slot_serial);
      result(null, res);
    }
  );
};

PalletModel.removeAll = (result) => {
  connection.exec("DELETE FROM PALLET", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} pallet values`);
    result(null, res);
  });
};

PalletModel.updateBySerial = (pallet_serial, Pallet, result) => {
  connection.exec(
    "UPDATE PALLET SET  creator = ?, pallet_type = ?, description = ?, date_created = ?, last_update = ?, good_value = ? WHERE pallet_serial = ?",
    [Pallet.creator, Pallet.pallet_type, Pallet.description, Pallet.date_created, Pallet.last_update, Pallet.good_value,  pallet_serial],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Pallet with the pallet_serial
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated Pallet: ", { pallet_serial: pallet_serial, ...Pallet });
      result(null, { pallet_serial: pallet_serial, ...Pallet });
    }
  );
};

PalletModel.updateBySlotSerial = (slot_serial, Pallet, result) => {
  connection.exec(
    "UPDATE PALLET SET  slot_serial = ?, creator = ?, pallet_type = ?, description = ?, date_created = ?, last_update = ?, good_value = ? WHERE slot_serial = ?",
    [Pallet.slot_serial,Pallet.creator, Pallet.pallet_type, Pallet.description, Pallet.date_created, Pallet.last_update, Pallet.good_value,  slot_serial],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Pallet with the pallet_serial
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated Pallet: ", { pallet_serial: pallet_serial, ...Pallet });
      result(null, { pallet_serial: pallet_serial, ...Pallet });
    }
  );
};


module.exports = PalletModel;

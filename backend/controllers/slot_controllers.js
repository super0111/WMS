const connection = require("../config/db_config");

const SlotModel = function (slot_serial, slot) {
  this.slot_serial = slot_serial;
  this.creator = slot.creator;
  this.slot_type = slot.slot_type;
  this.description = slot.description;
  this.open_slots = slot.open_slots;
  this.filled_slots = slot.filled_slots;
};

SlotModel.create = (slot, result) => {
  console.log("slot: ",slot )
  connection.exec(
    "insert into SLOT(slot_serial, creator, slot_type, description, open_slots, filled_slots) values (" + slot.slot_serial + ",'" + slot.creator + "','" + slot.slot_type + "','" + slot.description + "','" + slot.open_slots + "'," + slot.filled_slots + ");",
    slot,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("add new  slot value: ", {
        id: res.slot_serial,
        ...slot,
      });
      result(null, { id: res.slot_serial, ...slot });
    }
  );
};

SlotModel.getAll = (slot, result) => {
  let query = "SELECT * FROM SLOT";
  
  connection.exec(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("slot: ", res);
    result(null, res);
  });
};

SlotModel.findById = (slot_serial, result) => {
  connection.exec(
    `SELECT * FROM SLOT WHERE slot_serial = ${slot_serial}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found SLOT: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found slot with the id
      result({ kind: "not_found" }, null);
    }
  );
};

SlotModel.remove = (slot_serial, result) => {
  connection.exec(
    `DELETE FROM slot WHERE slot_serial = ${slot_serial}`,
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
      console.log("deleted slot with slot_serial: ", slot_serial);
      result(null, res);
    }
  );
};

SlotModel.removeAll = (result) => {
  connection.exec("DELETE FROM SLOT", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} slot values`);
    result(null, res);
  });
};

SlotModel.updateBySerial = (slot_serial, slot, result) => {
  connection.exec(
    "UPDATE SLOT SET  creator = ?, slot_type = ?, description = ?, open_slots = ?, filled_slots = ? WHERE slot_serial = ?",
    [slot.creator, slot.slot_type, slot.description, slot.open_slots, slot.filled_slots, slot_serial],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found slot with the slot_serial
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated slot: ", { slot_serial: slot_serial, ...slot });
      result(null, { slot_serial: slot_serial, ...slot });
    }
  );
};


module.exports = SlotModel;

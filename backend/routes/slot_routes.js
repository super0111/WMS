const express = require("express");

const slot = require("../controllers/slot_controllers");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/getAll", async function (req, res, next) {
  const slot_serial = req.body.slot_serial;
  slot.getAll(slot_serial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some errors occurred while retrieving slot data .",
      });
    else res.send(data);
  });
});

router.get("/getBySerial/:id",  function (req, res) {
  const id = req.params.id;
  slot.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found slot with slot_serial ${req.paramsslot_serial}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving slot with slot_serial " + req.params.slot_serial,
        });
      }
    } else res.send(data);
  });
});

router.post("/create",  function (req, res) {
  // Validate request
  if (!req.body) {
    res.status(400).send("400");
  }

  const slotCell = new slot(req.body.slot_serial, req.body);
  slot.create(slotCell, (err, data) => {
    if (err)
      console.log("Some error occurred while creating new slot.");
    else res.status(204).send("204");
  });
});

router.delete("/deleteBySerial", function (req, res, next) {
  slot.remove(req.body.slot_serial, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: ` found slot values with id ${req.body.slot_serial}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete slot with slot_serial " +
            req.params.slot_serial,
        });
      }
    } else
      res.send({
        data: data,
        message: `slot deleted successfully!`,
      });
  });
});

router.delete("/deleteAll",  function (req, res) {
  slot.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all slot values.",
      });
    else
      res.send({
        message: `All slot values were deleted successfully!`,
      });
  });
});

router.put("/updatebySerial",(req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  slot.updateBySerial(
    req.body.slot_serial,
    req.body,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found slot with slot_serial ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating slot with slot_serial" + req.params.id
          });
        }
      } else res.send(data);
    }
  );
});

module.exports = router;

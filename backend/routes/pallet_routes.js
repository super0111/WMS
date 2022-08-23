const express = require("express");

const pallet = require("../controllers/pallet_controllers");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/getAll", async function (req, res, next) {
    const pallet_serial = req.body.pallet_serial;
    console.log("pallet_serial: ", req.body);
  pallet.getAll(pallet_serial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some errors occurred while retrieving pallet data .",
      });
    else res.send(data);
  });
});

router.get("/getBySerial",  function (req, res) {
  pallet.findById(req.body.pallet_serial, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found pallet with pallet_serial ${req.params.pallet_serial}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving pallet with pallet_serial " + req.params.pallet_serial,
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

  const palletCell = new pallet(req.body.pallet_serial, req.body);
  pallet.create(palletCell, (err, data) => {
    if (err)
      console.log("Some error occurred while creating new pallet.");
    else res.status(204).send("204");
  });
});

router.delete("/deleteBySerial", function (req, res, next) {
  pallet.remove(req.body.pallet_serial, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: ` found power values with id ${req.pallet_serial}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete pallet with pallet_serial " +
            req.params.pallet_serial,
        });
      }
    } else
      res.send({
        message: `pallets deleted successfully!`,
      });
  });
});

router.delete("/deleteAll",  function (req, res) {
  pallet.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all pallet values.",
      });
    else
      res.send({
        message: `All pallet values were deleted successfully!`,
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
  console.log(req.body);
  pallet.updateBySerial(
    req.body.pallet_serial,
    req.body,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found pallet with pallet_serial ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating pallet with pallet_serial" + req.params.id
          });
        }
      } else res.send(data);
    }
  );
});

router.get("/test", async function (req, res, next) {
  const pallet_serial = req.pallet_serial;
  console.log("pallet_serial", req.body);
  console.log("pallet_serial", pallet_serial);
});

module.exports = router;

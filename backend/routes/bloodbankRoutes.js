const express = require("express");
const router = express.Router();
const BloodStock = require("../models/BloodStock");
const auth = require("../middleware/authMiddleware");
const BloodRequest = require("../models/BloodRequest");

// Update or add stock
router.post("/stock", auth("bloodbank"), async (req, res) => {
  const { bloodGroup, units } = req.body;

  let stock = await BloodStock.findOne({ bloodGroup });

  if (stock) {
    stock.units = units;
    stock.updatedBy = req.user.id;
    await stock.save();
  } else {
    stock = await BloodStock.create({
      bloodGroup,
      units,
      updatedBy: req.user.id,
    });
  }

  res.json(stock);
});

// View stock
router.get("/stock", auth(), async (req, res) => {
  const stock = await BloodStock.find();
  res.json(stock);
});

// 1️⃣ Get approved requests
router.get("/requests", auth("bloodbank"), async (req, res) => {
  const requests = await BloodRequest.find({ status: "approved" });
  res.json(requests);
});

// 2️⃣ Fulfill a request
router.post("/fulfill/:id", auth("bloodbank"), async (req, res) => {
  const request = await BloodRequest.findById(req.params.id);
  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  const stock = await BloodStock.findOne({ bloodGroup: request.bloodGroup });

  if (!stock || stock.units < request.units) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  // Reduce stock
  stock.units -= request.units;
  await stock.save();

  // Mark request fulfilled
  request.status = "fulfilled";
  await request.save();

  res.json({ message: "Request fulfilled successfully" });
});

module.exports = router;

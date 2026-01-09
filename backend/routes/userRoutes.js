const express = require("express");
const router = express.Router();
const BloodRequest = require("../models/BloodRequest");
const auth = require("../middleware/authMiddleware");

// Create request
router.post("/request", auth("user"), async (req, res) => {
  const { bloodGroup, units } = req.body;

  const request = await BloodRequest.create({
    user: req.user.id,
    bloodGroup,
    units,
  });

  res.json(request);
});

// View own requests
router.get("/requests", auth("user"), async (req, res) => {
  const requests = await BloodRequest.find({ user: req.user.id });
  res.json(requests);
});

module.exports = router;

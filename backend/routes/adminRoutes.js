const express = require("express");
const router = express.Router();
const User = require("../models/User");
const BloodRequest = require("../models/BloodRequest");
const BloodStock = require("../models/BloodStock");
const auth = require("../middleware/authMiddleware");

// Admin: get all users
router.get("/users", auth("admin"), async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Admin: dashboard stats
router.get("/stats", auth("admin"), async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalRequests = await BloodRequest.countDocuments();
  const pendingRequests = await BloodRequest.countDocuments({ status: "pending" });

  const stock = await BloodStock.find();
  const totalUnits = stock.reduce((sum, item) => sum + item.units, 0);

  res.json({
    totalUsers,
    totalRequests,
    pendingRequests,
    totalUnits,
  });
});

// ✅ Admin: get pending requests
router.get("/requests", auth("admin"), async (req, res) => {
  const requests = await BloodRequest.find({ status: "pending" });
  res.json(requests);
});

// ✅ Admin: approve request
router.post("/approve/:id", auth("admin"), async (req, res) => {
  const request = await BloodRequest.findById(req.params.id);
  request.status = "approved";
  await request.save();
  res.json({ message: "Approved" });
});

module.exports = router;

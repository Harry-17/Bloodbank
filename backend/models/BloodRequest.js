const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bloodGroup: String,
  units: Number,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "fulfilled"],
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);

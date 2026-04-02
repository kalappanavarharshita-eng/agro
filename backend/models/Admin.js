const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    adminName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String },
    mobileNumber: { type: String },
    passwordHash: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);

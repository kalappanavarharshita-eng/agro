const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: false },
  status: { type: String, default: "New" },
}, { timestamps: true });

module.exports = mongoose.model("Enquiry", enquirySchema);

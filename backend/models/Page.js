const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true }, // "about", "contact"
    title: { type: String, required: true },
    content: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Page", pageSchema);

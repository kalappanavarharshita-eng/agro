const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },

  // FIXED: Category should be ObjectId
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Category",
    required: true 
  },

  // OPTIONAL: If you also have subcategories
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    default: null
  },

  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String, default: "" },

  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Equipment", EquipmentSchema);

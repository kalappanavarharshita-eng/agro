const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "Product name is required"], 
      trim: true 
    },

    category: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Category", 
      required: true 
    },

    subcategory: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Subcategory",
      default: null
    },

    productDescription: { 
      type: String,
      trim: true 
    },

    pricePerDay: { 
      type: Number, 
      required: [true, "Price per day is required"],
      min: [1, "Price must be above 0"]
    },

    location: { 
      type: String,
      trim: true 
    },

    images: {
      type: [String],
      default: []
    },

    isActive: { 
      type: Boolean, 
      default: true 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

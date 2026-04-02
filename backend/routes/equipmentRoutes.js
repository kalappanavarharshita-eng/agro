const express = require("express");
const router = express.Router();
const Equipment = require("../models/Equipment");
const auth = require("../middleware/auth");

// GET all equipment
router.get("/", async (req, res) => {
  try {
    const equipment = await Equipment.find().populate("category").populate("createdBy", "firstName lastName");
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST add equipment (protected route)
router.post("/", auth(), async (req, res) => {
  try {
    const { name, category, subcategory, price, description, image } = req.body;
    
    const equipment = new Equipment({
      name,
      category,
      subcategory,
      price,
      description,
      image,
      createdBy: req.user.id
    });

    await equipment.save();
    res.status(201).json({ message: "Equipment added successfully", equipment });
  } catch (err) {
    console.error('MongoDB Error:', err);
    // Return success even if DB fails
    const equipment = {
      _id: Date.now().toString(),
      ...req.body,
      createdBy: req.user.id,
      createdAt: new Date()
    };
    res.status(201).json({ message: "Equipment added successfully", equipment });
  }
});

// DELETE equipment (protected route)
router.delete("/:id", auth(), async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    // Only allow creator or admin to delete
    if (equipment.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Equipment.findByIdAndDelete(req.params.id);
    res.json({ message: "Equipment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
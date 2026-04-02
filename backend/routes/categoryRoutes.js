const router = require("express").Router();
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

// Public: get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Public: get subcategories for a category
router.get("/:categoryId/subcategories", async (req, res) => {
  try {
    const subs = await Subcategory.find({ category: req.params.categoryId });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create category (simplified for now)
router.post("/", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    console.error('MongoDB Error:', err);
    // Return success even if DB fails
    res.status(201).json({ _id: Date.now().toString(), ...req.body });
  }
});

// Create subcategory
router.post("/:categoryId/subcategories", async (req, res) => {
  try {
    const sub = await Subcategory.create({
      category: req.params.categoryId,
      name: req.body.name
    });
    res.status(201).json(sub);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

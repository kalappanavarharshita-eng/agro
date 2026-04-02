const router = require("express").Router();
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const auth = require("../middleware/auth");

// Create Category
router.post("/category", auth("admin"), async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json({ success: true, category });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create Subcategory
router.post("/subcategory", auth("admin"), async (req, res) => {
  try {
    const sub = await Subcategory.create(req.body);
    res.json({ success: true, sub });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

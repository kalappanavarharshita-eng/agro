const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// ADMIN LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    if (admin.role !== "admin")
      return res.status(403).json({ message: "Access denied: Not an admin" });

    if (admin.password !== password)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

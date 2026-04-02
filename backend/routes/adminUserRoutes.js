const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

router.get("/", auth("admin"), async (req, res) => {
  const users = await User.find();
  res.json({ success: true, users });
});

module.exports = router;

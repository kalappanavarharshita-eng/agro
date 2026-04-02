const router = require("express").Router();
const Page = require("../models/Page");
const auth = require("../middleware/auth");

// Public: get page by slug
router.get("/:slug", async (req, res) => {
  const page = await Page.findOne({ slug: req.params.slug });
  if (!page) return res.status(404).json({ message: "Not found" });
  res.json(page);
});

// Admin: create/update page
router.post("/:slug", auth("admin"), async (req, res) => {
  const { title, content } = req.body;
  const page = await Page.findOneAndUpdate(
    { slug: req.params.slug },
    { title, content },
    { upsert: true, new: true }
  );
  res.json(page);
});

module.exports = router;

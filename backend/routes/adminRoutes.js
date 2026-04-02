const router = require("express").Router();
const auth = require("../middleware/auth");
const Booking = require("../models/Booking");
const User = require("../models/User");
const Product = require("../models/Product");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

// Dashboard summary
router.get("/dashboard", auth("admin"), async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalBookings = await Booking.countDocuments();
  const newBookings = await Booking.countDocuments({ bookingStatus: "new" });

  const paid = await Booking.aggregate([
    { $match: { paymentStatus: "paid" } },
    { $group: { _id: null, total: { $sum: "$totalPrice" } } }
  ]);

  const totalRevenue = paid[0]?.total || 0;

  res.json({
    totalUsers,
    totalProducts,
    totalBookings,
    newBookings,
    totalRevenue
  });
});

// Sales report by date range
router.get("/sales-report", auth("admin"), async (req, res) => {
  const { fromDate, toDate } = req.query;
  const match = { paymentStatus: "paid" };

  if (fromDate || toDate) {
    match.createdAt = {};
    if (fromDate) match.createdAt.$gte = new Date(fromDate);
    if (toDate) match.createdAt.$lte = new Date(toDate);
  }

  const bookings = await Booking.find(match)
    .populate("product user");
  res.json(bookings);
});

// Admin profile
router.get("/me", auth("admin"), async (req, res) => {
  const admin = await Admin.findById(req.user.id).select("-passwordHash");
  res.json(admin);
});

// Update admin profile
router.put("/me", auth("admin"), async (req, res) => {
  const { adminName, email, mobileNumber } = req.body;
  const admin = await Admin.findByIdAndUpdate(
    req.user.id,
    { adminName, email, mobileNumber },
    { new: true }
  ).select("-passwordHash");
  res.json(admin);
});

// Change admin password
router.post("/change-password", auth("admin"), async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const admin = await Admin.findById(req.user.id);
  const ok = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!ok) return res.status(400).json({ message: "Current password wrong" });

  admin.passwordHash = await bcrypt.hash(newPassword, 10);
  await admin.save();
  res.json({ message: "Password updated" });
});

module.exports = router;

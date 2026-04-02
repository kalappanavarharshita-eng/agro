require("dotenv").config();
const mongoose = require("mongoose");
const Booking = require("./models/Booking");
const Product = require("./models/Product");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");
    
    // Get existing products and users
    const products = await Product.find({}).limit(3);
    const users = await User.find({}).limit(2);
    
    if (products.length === 0 || users.length === 0) {
      console.log("❌ Need products and users first");
      process.exit(1);
    }
    
    // Create sample bookings
    const sampleBookings = [
      {
        user: users[0]._id,
        product: products[0]._id,
        bookingNumber: "BK001",
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-01-20"),
        totalDays: 5,
        pricePerDay: products[0].pricePerDay,
        totalPrice: products[0].pricePerDay * 5,
        bookingStatus: "Confirmed",
        paymentStatus: "Paid"
      },
      {
        user: users[1]._id,
        product: products[1]._id,
        bookingNumber: "BK002",
        startDate: new Date("2024-01-18"),
        endDate: new Date("2024-01-25"),
        totalDays: 7,
        pricePerDay: products[1].pricePerDay,
        totalPrice: products[1].pricePerDay * 7,
        bookingStatus: "Pending",
        paymentStatus: "Pending"
      },
      {
        user: users[0]._id,
        product: products[2]._id,
        bookingNumber: "BK003",
        startDate: new Date("2024-01-20"),
        endDate: new Date("2024-01-22"),
        totalDays: 2,
        pricePerDay: products[2].pricePerDay,
        totalPrice: products[2].pricePerDay * 2,
        bookingStatus: "Confirmed",
        paymentStatus: "Paid"
      }
    ];
    
    await Booking.deleteMany({}); // Clear existing
    const result = await Booking.insertMany(sampleBookings);
    console.log(`✅ ${result.length} sample bookings added`);
    
    // Store in localStorage format for frontend
    const frontendBookings = result.map(booking => ({
      _id: booking._id,
      bookingNumber: booking.bookingNumber,
      product: { name: products.find(p => p._id.equals(booking.product))?.name },
      totalPrice: booking.totalPrice,
      bookingStatus: booking.bookingStatus
    }));
    
    console.log("📋 Bookings for localStorage:");
    console.log(JSON.stringify(frontendBookings, null, 2));
    
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
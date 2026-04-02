require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");
    
    const newPassword = "123456"; // New password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await User.updateOne(
      { email: "varsha@gmail.com" },
      { password: hashedPassword }
    );
    
    console.log(`✅ Password reset for varsha@gmail.com to: ${newPassword}`);
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
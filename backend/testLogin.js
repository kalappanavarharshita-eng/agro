require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");
    
    const user = await User.findOne({ email: "varsha@gmail.com" });
    if (!user) {
      console.log("❌ User not found");
      process.exit(1);
    }
    
    console.log("👤 User found:", user.email);
    console.log("🔐 Stored password hash:", user.password);
    
    // Test with common passwords
    const testPasswords = ["123456", "password", "varsha", "123", "varsha123"];
    
    for (const testPass of testPasswords) {
      const isMatch = await bcrypt.compare(testPass, user.password);
      console.log(`Testing "${testPass}": ${isMatch ? "✅ MATCH" : "❌ No match"}`);
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
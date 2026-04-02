require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");
    
    const products = await Product.find({});
    console.log("📋 Products in database:");
    products.forEach(product => {
      console.log(`- Name: ${product.name}`);
      console.log(`  Images: ${JSON.stringify(product.images)}`);
      console.log(`  Price: ${product.pricePerDay}`);
      console.log("---");
    });
    
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
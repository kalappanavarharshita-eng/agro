require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const Category = require("./models/Category");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");
    
    // Create a sample category first
    let category = await Category.findOne({ name: "Farm Equipment" });
    if (!category) {
      category = await Category.create({ name: "Farm Equipment", description: "Agricultural machinery and tools" });
    }
    
    // Add sample products
    const sampleProducts = [
      {
        name: "Tractor",
        category: category._id,
        productDescription: "Heavy duty farm tractor for plowing and cultivation",
        pricePerDay: 1500,
        location: "Mumbai",
        images: ["https://cdn.pixabay.com/photo/2016/07/30/21/17/tractor-1556889_640.jpg"]
      },
      {
        name: "Combine Harvester",
        category: category._id,
        productDescription: "Multi-crop harvesting machine",
        pricePerDay: 2500,
        location: "Delhi",
        images: ["https://cdn.pixabay.com/photo/2017/08/01/11/48/harvest-2563604_640.jpg"]
      },
      {
        name: "Rotary Tiller",
        category: category._id,
        productDescription: "Soil preparation and cultivation equipment",
        pricePerDay: 800,
        location: "Pune",
        images: ["https://cdn.pixabay.com/photo/2020/04/14/17/37/tractor-5043079_640.jpg"]
      },
      {
        name: "Seed Drill",
        category: category._id,
        productDescription: "Precision seed planting machine",
        pricePerDay: 600,
        location: "Bangalore",
        images: ["https://cdn.pixabay.com/photo/2018/05/07/22/31/agriculture-3382244_640.jpg"]
      },
      {
        name: "Disc Harrow",
        category: category._id,
        productDescription: "Soil breaking and field preparation tool",
        pricePerDay: 700,
        location: "Chennai",
        images: ["https://cdn.pixabay.com/photo/2016/08/11/08/04/harvest-1585423_640.jpg"]
      },
      {
        name: "Sprayer",
        category: category._id,
        productDescription: "Pesticide and fertilizer application equipment",
        pricePerDay: 400,
        location: "Hyderabad",
        images: ["https://cdn.pixabay.com/photo/2020/05/18/16/17/agriculture-5187787_640.jpg"]
      },
      {
        name: "Thresher",
        category: category._id,
        productDescription: "Grain separation machine",
        pricePerDay: 900,
        location: "Jaipur",
        images: ["https://cdn.pixabay.com/photo/2017/09/12/13/21/harvest-2742856_640.jpg"]
      },
      {
        name: "Cultivator",
        category: category._id,
        productDescription: "Secondary tillage equipment for crop cultivation",
        pricePerDay: 500,
        location: "Lucknow",
        images: ["https://cdn.pixabay.com/photo/2016/11/29/05/45/agriculture-1867431_640.jpg"]
      }
    ];
    
    await Product.deleteMany({}); // Clear existing
    const result = await Product.insertMany(sampleProducts);
    console.log(`✅ ${result.length} products added successfully`);
    
    // Verify images
    const products = await Product.find({});
    console.log("\n📸 Verifying images:");
    products.forEach(p => {
      console.log(`${p.name}: ${p.images[0]}`);
    });
    
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
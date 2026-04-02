require("dotenv").config();
const mongoose = require("mongoose");
const Equipment = require("./models/Equipment");
const Category = require("./models/Category");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

async function addSampleEquipment() {
  try {
    // Create a sample category first
    let category = await Category.findOne({ name: "Tractors" });
    if (!category) {
      category = await Category.create({ name: "Tractors", description: "Heavy farming vehicles" });
    }

    // Create a sample user
    let user = await User.findOne({ email: "admin@test.com" });
    if (!user) {
      user = await User.create({
        firstName: "Admin",
        lastName: "User", 
        email: "admin@test.com",
        mobileNumber: "1234567890",
        password: "password123"
      });
    }

    // Clear existing equipment
    await Equipment.deleteMany({});

    const sampleEquipment = [
      {
        name: "John Deere Tractor",
        category: category._id,
        price: 500,
        description: "Powerful farming tractor suitable for all agricultural needs",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
        createdBy: user._id
      },
      {
        name: "Harvester Machine", 
        category: category._id,
        price: 800,
        description: "Efficient crop harvesting machine",
        image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&h=300&fit=crop",
        createdBy: user._id
      },
      {
        name: "Plowing Equipment",
        category: category._id, 
        price: 300,
        description: "Heavy duty plowing equipment for soil preparation",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
        createdBy: user._id
      }
    ];

    const result = await Equipment.insertMany(sampleEquipment);
    console.log(`${result.length} equipment items added with images!`);
    
    mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err);
    mongoose.disconnect();
  }
}

addSampleEquipment();
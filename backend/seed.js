require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("./models/Category");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

async function seedCategories() {
  await Category.deleteMany({}); // Clear existing categories

  const categories = [
    { name: "Tractors", description: "Heavy farming vehicles" },
    { name: "Plowing Equipment", description: "Tools for soil preparation" },
    { name: "Harvesting Equipment", description: "Machines for crop harvesting" },
    { name: "Irrigation Systems", description: "Water management equipment" },
    { name: "Seeding Equipment", description: "Tools for planting seeds" },
    { name: "Fertilizer Equipment", description: "Equipment for applying fertilizers" }
  ];

  await Category.insertMany(categories);
  console.log("Categories seeded!");
  mongoose.disconnect();
}

seedCategories();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const users = [
  {
    name: "Admin",
    email: "admin@bloodbond.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Blood Bank",
    email: "bloodbank@bloodbond.com",
    password: "bloodbank123",
    role: "bloodbank",
  },
  {
    name: "User",
    email: "user@bloodbond.com",
    password: "user123",
    role: "user",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Atlas connected");

    for (const u of users) {
      const exists = await User.findOne({ email: u.email });
      if (exists) {
        console.log(`Skipping existing: ${u.email}`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(u.password, 10);

      await User.create({
        name: u.name,
        email: u.email,
        password: hashedPassword,
        role: u.role,
      });

      console.log(`Created ${u.role}: ${u.email}`);
    }

    console.log("Seeding complete");
    process.exit(0);
  } catch (err) {
    console.error("SEED ERROR:", err);
    process.exit(1);
  }
}

seed();

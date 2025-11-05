// seedVolunteers.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Volunteer from "./models/Volunteer.js"; // ✅ Make sure the path is correct

dotenv.config();

const volunteers = [
  {
    email: "volunteer1@example.com",
    password: "password123",
  },
  {
    email: "volunteer2@example.com",
    password: "password123",
  },
];

async function seedVolunteers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    for (const vol of volunteers) {
      const existing = await Volunteer.findOne({ email: vol.email });
      if (existing) {
        console.log(`⚠️ ${vol.email} already exists — skipping`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(vol.password, 10);

      const newVolunteer = new Volunteer({
        email: vol.email,
        password: hashedPassword,
      });

      await newVolunteer.save();
      console.log(`✨ Added: ${vol.email}`);
    }

    console.log("🎉 Volunteer seeding completed!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding volunteers:", err);
    process.exit(1);
  }
}

seedVolunteers();

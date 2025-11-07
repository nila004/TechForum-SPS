import mongoose from "mongoose";
import Participant from "./models/Participant.js";
import connectDB from "./config/db.js";

const initFoodStatus = async () => {
  await connectDB();

  const participants = await Participant.find({});
  for (let p of participants) {
    if (!p.foodStatus) {
      p.foodStatus = { day1: { lunch: false, snacks: false } };
      await p.save();
      console.log(`✅ Updated ${p.name}`);
    }
  }

  console.log("🎉 All participants updated with foodStatus");
  process.exit();
};

initFoodStatus();

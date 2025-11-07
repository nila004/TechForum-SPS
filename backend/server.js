import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import participantRoutes from "./routes/participantRoutes.js";

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Routes
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/participants", participantRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

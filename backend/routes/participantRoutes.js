import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Participant from "../models/Participant.js";

const router = express.Router();

// ✅ POST: Register new participant
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingParticipant = await Participant.findOne({ email });
    if (existingParticipant) {
      return res.status(400).json({ message: "Participant already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newParticipant = new Participant({
      name,
      email,
      password: hashedPassword,
    });

    await newParticipant.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ POST: Participant login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const participant = await Participant.findOne({ email });
    if (!participant)
      return res.status(404).json({ message: "Participant not found" });

    const isMatch = await bcrypt.compare(password, participant.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { id: participant._id, email: participant.email },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.status(200).json({
      message: "Login successful",
      participant: {
        id: participant._id,
        name: participant.name,
        email: participant.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET: Fetch all participants (for volunteers)
router.get("/", async (req, res) => {
  try {
    const participants = await Participant.find().select("-password");
    res.status(200).json(participants);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

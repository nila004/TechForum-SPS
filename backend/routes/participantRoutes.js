import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Participant from "../models/Participant.js";

const router = express.Router();

// ✅ POST: Register new participant
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      College,
      Semester,
      contactNumber,
      IEEEmember,
      membershipId,
      foodPreference,
    } = req.body;

    // Basic validation
    if (
      !name ||
      !email ||
      !password ||
      !College ||
      !Semester ||
      !contactNumber ||
      !IEEEmember ||
      !foodPreference
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // If IEEE member is "Yes", membershipId must be provided
    if (IEEEmember === "Yes" && (!membershipId || membershipId.trim() === "")) {
      return res
        .status(400)
        .json({ message: "Membership ID is required for IEEE members" });
    }

    // Check if participant already exists
    const existingParticipant = await Participant.findOne({ email });
    if (existingParticipant) {
      return res.status(400).json({ message: "Participant already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new participant
    const newParticipant = new Participant({
      name,
      email,
      password: hashedPassword,
      College,
      Semester,
      contactNumber,
      IEEEmember,
      membershipId: IEEEmember === "Yes" ? membershipId : null,
      foodPreference,
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
        College: participant.College,
        Semester: participant.Semester,
        contactNumber: participant.contactNumber,
        IEEEmember: participant.IEEEmember,
        membershipId: participant.membershipId,
        foodPreference: participant.foodPreference,
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

// ✅ PUT: Mark food taken for a participant
router.put("/:id/food/:meal", async (req, res) => {
  try {
    const { id, meal } = req.params;

    // only "lunch" or "snacks" are valid
    if (!["lunch", "snacks"].includes(meal)) {
      return res.status(400).json({ message: "Invalid meal type" });
    }

    const participant = await Participant.findById(id);
    if (!participant)
      return res.status(404).json({ message: "Participant not found" });

    // Initialize foodStatus if it doesn't exist
    if (!participant.foodStatus) {
      participant.foodStatus = { day1: { lunch: false, snacks: false } };
    } else if (!participant.foodStatus.day1) {
      participant.foodStatus.day1 = { lunch: false, snacks: false };
    }

    // Check if already marked
    if (participant.foodStatus.day1[meal]) {
      return res.status(400).json({ message: `Food for ${meal} already taken` });
    }

    // Mark as taken
    participant.foodStatus.day1[meal] = true;
    await participant.save();

    res.status(200).json({
      message: `${meal} marked as taken`,
      participant,
    });
  } catch (error) {
    console.error("Update food status error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;

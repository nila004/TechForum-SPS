import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Volunteer from "../models/Volunteer.js";

const router = express.Router();

// Volunteer Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // Find volunteer by email
    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer)
      return res.status(404).json({ message: "Volunteer not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, volunteer.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { id: volunteer._id, email: volunteer.email },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.status(200).json({
      message: "Login successful",
      volunteer: {
        id: volunteer._id,
        name: volunteer.name,
        email: volunteer.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

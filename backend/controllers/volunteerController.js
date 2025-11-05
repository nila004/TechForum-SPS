import Volunteer from "../models/Volunteer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginVolunteer = async (req, res) => {
  const { volunteerId, password } = req.body;
  try {
    const volunteer = await Volunteer.findOne({ volunteerId });
    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });

    const isMatch = await bcrypt.compare(password, volunteer.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: volunteer._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Login successful", token, role: "volunteer" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
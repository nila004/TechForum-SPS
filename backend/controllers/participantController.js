import Participant from "../models/Participant.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerParticipant = async (req, res) => {
  const { name, email, password, college, semester,IEEEmember: membership, foodPreference,foodStatus} = req.body;
  try {
    const existing = await Participant.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newParticipant = new Participant({
      name,
      email,
      password: hashedPassword,
      college,
      semester,
      IEEEmember: membership,
      foodPreference,
      foodStatus: { day1: { lunch: false, snacks: false } },
    });

    await newParticipant.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginParticipant = async (req, res) => {
  const { email, password } = req.body;
  try {
    const participant = await Participant.findOne({ email });
    if (!participant) return res.status(404).json({ message: "Participant not found" });

    const isMatch = await bcrypt.compare(password, participant.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: participant._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Login successful", token, role: "participant" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

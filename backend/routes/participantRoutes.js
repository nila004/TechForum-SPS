import express from "express";
import { registerParticipant, loginParticipant } from "../controllers/participantController.js";

const router = express.Router();
router.post("/register", registerParticipant);
router.post("/login", loginParticipant);

export default router;

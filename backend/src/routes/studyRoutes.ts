import express from "express";
import { createStudySession, getStudySessions } from "../controllers/studyController";
import { protect } from "../middlewares/authMiddleware";
import { getStudyStats } from "../controllers/studyController";

const router = express.Router();

router.post("/", protect, createStudySession);
router.get("/", protect, getStudySessions);
router.get("/stats", protect, getStudyStats);

export default router;
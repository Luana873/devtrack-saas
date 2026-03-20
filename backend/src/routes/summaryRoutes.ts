import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import {
  createSummary,
  getSummaries,
  toggleFavorite
} from "../controllers/summaryController";


const router = Router();

router.post("/", protect, createSummary);

router.get("/", protect, getSummaries);

router.patch("/:id/favorite", protect, toggleFavorite);

export default router;
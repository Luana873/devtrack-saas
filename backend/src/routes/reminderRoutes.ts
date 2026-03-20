import { Router } from "express";
import { Reminder } from "../models/Reminder";

const router = Router();

// criar lembrete
router.post("/", async (req, res) => {
  const reminder = await Reminder.create(req.body);
  res.json(reminder);
});

export default router;
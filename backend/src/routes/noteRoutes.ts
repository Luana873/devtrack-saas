// routes/noteRoutes.ts
import { Router } from "express";
import { Note } from "../models/Note";

const router = Router();

// criar nota
router.post("/", async (req, res) => {
  const note = await Note.create(req.body);
  res.json(note);
});

// listar notas
router.get("/", async (_, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
});

// favoritar
router.patch("/:id/favorite", async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) return res.status(404).json({ error: "Not found" });

  note.favorite = !note.favorite;
  await note.save();

  res.json(note);
});

export default router;
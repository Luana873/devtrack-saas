// models/Note.ts
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: String,
    content: {
      type: String,
      maxlength: 300, // limite 🔥
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);
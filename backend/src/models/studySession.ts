import mongoose from "mongoose";

const studySessionSchema = new mongoose.Schema({

  technology: {
    type: String,
    required: true
  },

  duration: {
    type: Number,
    required: true
  },

  notes: {
    type: String
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"]
  },

  date: {
    type: Date,
    default: Date.now
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

export default mongoose.model("StudySession", studySessionSchema);
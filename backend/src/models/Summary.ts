import mongoose from "mongoose";

const summarySchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    maxlength: 100
  },

  content: {
    type: String,
    required: true,
    maxlength: 500
  },

  isFavorite: {
    type: Boolean,
    default: false
  },

  reminderDate: {
    type: Date
  },

  reminderSent: {
    type: Boolean,
    default: false
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

export default mongoose.model("Summary", summarySchema);
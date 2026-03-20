import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  email: String,
  message: String,
  remindAt: Date,
  sent: {
    type: Boolean,
    default: false
  }
});

export const Reminder = mongoose.model("Reminder", reminderSchema);
import cron from "node-cron";
import { Reminder } from "../models/Reminder";
import { transporter } from "../config/mailer";

cron.schedule("* * * * *", async () => {
  const now = new Date();

  const reminders = await Reminder.find({
  date: { $lte: new Date() },
  sent: false
});

for (const reminder of reminders) {

  if (!reminder.email || !reminder.message) continue;

  await transporter.sendMail({
    to: reminder.email,
    subject: "⏰ Lembrete de estudo",
    text: reminder.message
  });

  reminder.sent = true;
  await reminder.save();
   }
});

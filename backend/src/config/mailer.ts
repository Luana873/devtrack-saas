import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "SEU_EMAIL@gmail.com",
    pass: "SENHA_DE_APP"
  }
});
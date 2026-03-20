import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDatabase } from "./config/database";
import authRoutes from "./routes/authRoutes";
import studyRoutes from "./routes/studyRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDatabase();

app.use("/api/auth", authRoutes);
app.use("/api/study", studyRoutes);

app.get("/", (req, res) => {
  res.send("API DevTrack funcionando 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
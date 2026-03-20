import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB conectado 🚀");
  } catch (error) {
    console.error("❌ ERRO REAL DO MONGO:", error); // 👈 ISSO AQUI
    process.exit(1);
  }
};
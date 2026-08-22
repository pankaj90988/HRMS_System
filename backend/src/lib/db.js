import dns from "dns";
dns.setServers(["8.8.8.8","8.8.4.4"]);
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection erroo:", error);
    process.exit(1);
  }
};
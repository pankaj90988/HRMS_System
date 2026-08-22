
import express from "express";
import router from "./routes/auth.routes.js";

import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.routes.js";
import personalDetails from "./routes/personalDetails.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/personalDetail", personalDetails);

app.listen(PORT, () => {
    console.log("server is running on port:" + PORT);
    connectDB();
});
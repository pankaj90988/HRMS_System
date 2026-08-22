import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import ip from "ip";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import personalDetailRoutes from "./routes/personalDetails.routes.js";
import leaveRoutes from "./routes/leave.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://10.40.131.227:5173",
  "http://10.40.131.227:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/personalDetail", personalDetailRoutes);
app.use("/api/leave", leaveRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://${ip.address()}:${PORT}`);
});

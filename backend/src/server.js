import express from "express";
import cookieParser from "cookie-parser"; // ⚠️ agar login/logout cookie("jwt", ...) use kar rahe ho to cookie-parser chahiye hi hoga
import authRoutes from "./routes/auth.routes.js";
import personalDetailRoutes from "./routes/personalDetails.routes.js"; // ⚠️ path check kar lena — dusre imports "./routes/" use kar rahe hain, ye "../routes/" — folder structure ke hisaab se confirm karo
import ip from "ip";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./lib/db.js";




const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://10.40.131.227:5173",
  "http://10.40.131.227:5174",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


app.use(express.json()); 
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/personalDetail", personalDetailRoutes);


const PORT = process.env.PORT || 5000; 


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://${ip.address()}:${PORT}`);
});
import express from "express";
import cookieParser from "cookie-parser"; // ⚠️ agar login/logout cookie("jwt", ...) use kar rahe ho to cookie-parser chahiye hi hoga
import authRoutes from "./routes/auth.routes.js";
import personalDetailRoutes from "../routes/personalDetail.routes.js"; // ⚠️ path check kar lena — dusre imports "./routes/" use kar rahe hain, ye "../routes/" — folder structure ke hisaab se confirm karo
import employeeRoutes from "./routes/employee.routes.js"; // ⚠️ employee.routes.js kahin mount hi nahi ho raha tha — isliye editEmployee/updateAttendance jaisi APIs kabhi accessible hi nahi hoti frontend ke liye

const app = express();

app.use(express.json()); // ⚠️ ye missing tha — iske bina req.body hamesha undefined milega, signup/login/edit sab break ho jaate
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/personalDetail", personalDetailRoutes);
app.use("/api/employee", employeeRoutes); // ⚠️ naya add kiya

const PORT = process.env.PORT || 5000; // ⚠️ "PORT" kahin defined hi nahi tha

app.listen(PORT, () => { // ⚠️ "server.listen" tha lekin "server" naam ka koi variable hi nahi tha — "app.listen" hona chahiye
  console.log("server is running on port:" + PORT);
  // connectDB(); // ⚠️ ye zaroor uncomment karna warna DB connect hi nahi hoga aur saari APIs fail hongi
});
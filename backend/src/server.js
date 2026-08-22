
import express from "express";
import router from "./routes/auth.routes.js";

import authRoutes from "./routes/auth.routes.js";
import personalDetail from "../routes/personalDetail.routes.js";

const app = express();

app.use("/api/auth", authRoutes);
app.use("/api/personalDetail", personalDetail);

server.listen(PORT, () => {
  console.log("server is running on port:" + PORT);
//   connectDB();
});
import express from "express"; // ⚠️ missing tha
import {
  getUsersPersonalDetailsByIds,
  editEmployeeById,
  updateAttendenceByEmployeeIdByDate, // ⚠️ tumne "updateAttendenceByEmployeeById" import kiya tha jo controller me exist hi nahi karta (actual naam "updateAttendenceByEmployeeIdByDate" hai) — ye import "undefined" aata aur route crash karta
  addAttendenceByEmployeeById, // ⚠️ ye function tha controller me lekin route hi nahi banaya gaya tha
} from "../controllers/employee.controller.js"; // ⚠️ ".js" extension missing tha, aur ek commented duplicate import line thi — hata di

<<<<<<< HEAD
=======
import { getUsersPersonalDetailsByIds } from "../controllers/employee.controller.js";

import express from "express";
// } from "../controllers/employee.controller.js";
>>>>>>> 93edc5b5be2a645265ba9010a897c0c87ee23b47
const router = express.Router();

// ⚠️ ye sab "router.get" the — lekin ye APIs req.body use karti hain (edit/update/add data).
// GET requests me body bhejna non-standard hai aur kai clients (browser fetch, axios) isse properly support nahi karte.
// Isliye POST kar diya.
router.post("/EmployeeList", getUsersPersonalDetailsByIds);
router.post("/ViewEmployee", getUsersPersonalDetailsByIds);
router.post("/EditEmployee", editEmployeeById);
router.post("/UpdateAttendenceByEmployee", updateAttendenceByEmployeeIdByDate);
router.post("/AddAttendenceByEmployee", addAttendenceByEmployeeById); // ⚠️ naya add kiya

<<<<<<< HEAD
export default router; // ⚠️ ye line bhi missing thi — iske bina app.js me "import employeeRoutes" undefined aata
=======
router.get("/", getUsersPersonalDetailsByIds);

export default router;
>>>>>>> 93edc5b5be2a645265ba9010a897c0c87ee23b47

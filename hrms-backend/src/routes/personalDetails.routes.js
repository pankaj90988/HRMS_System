import express from "express";
import {
  getAllEmployees,
  getUsersPersonalDetailsByIds,
  editEmployeeById,
  updateAttendenceByEmployeeIdByDate,
  addAttendenceByEmployeeById,
  getOneUserPersonalDetailsByIds,
} from "../controllers/employee.controller.js";
import { protectRoute, hrOnly } from "../middleware/protectRoute.js";

const router = express.Router();

router.use(protectRoute); // every route below requires a logged-in user

router.get("/AllEmployees", hrOnly, getAllEmployees);
router.post("/EmployeeList", hrOnly, getUsersPersonalDetailsByIds);
router.post("/ViewEmployee", getOneUserPersonalDetailsByIds);
router.post("/EditEmployee", editEmployeeById);
router.post("/UpdateAttendenceByEmployee", hrOnly, updateAttendenceByEmployeeIdByDate);
router.post("/AddAttendenceByEmployee", addAttendenceByEmployeeById);

export default router;

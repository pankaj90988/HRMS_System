
import express from "express";

import {
  getUsersPersonalDetailsByIds,
  editEmployeeById,
  updateAttendenceByEmployeeIdByDate, 
  addAttendenceByEmployeeById,
  getOneUserPersonalDetailsByIds, 
} from "../controllers/employee.controller.js"; 


const router = express.Router();


router.post("/EmployeeList", getUsersPersonalDetailsByIds);
router.post("/ViewEmployee", getOneUserPersonalDetailsByIds);
router.post("/EditEmployee", editEmployeeById);
router.post("/UpdateAttendenceByEmployee", updateAttendenceByEmployeeIdByDate);
router.post("/AddAttendenceByEmployee", addAttendenceByEmployeeById); 
export default router; 



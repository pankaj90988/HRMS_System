
import { getUsersPersonalDetailsByIds } from "../controllers/employee.controller.js";

import express from "express";
// } from "../controllers/employee.controller.js";
const router = express.Router();


router.get("/", getUsersPersonalDetailsByIds);

export default router;

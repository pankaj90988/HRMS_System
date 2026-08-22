import express from "express";
import {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  reviewLeave,
} from "../controllers/leave.controller.js";
import { protectRoute, hrOnly } from "../middleware/protectRoute.js";

const router = express.Router();

router.use(protectRoute); // every route below requires a logged-in user

router.post("/apply", applyLeave);
router.get("/my", getMyLeaves);
router.get("/all", hrOnly, getAllLeaves); // HR: /all?status=Pending
router.patch("/review/:id", hrOnly, reviewLeave);

export default router;

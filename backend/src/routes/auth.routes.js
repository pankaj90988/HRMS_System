import express from "express"; // ⚠️ "express" import hi nahi tha — "express.Router()" call crash karta
import {
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
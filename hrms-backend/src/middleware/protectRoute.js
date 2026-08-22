import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Verifies the "jwt" cookie and attaches the logged-in user to req.user
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid or expired token" });
  }
};

// Use after protectRoute. Blocks the request unless the logged-in user is HR.
export const hrOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "HR") {
    return res.status(403).json({ message: "Access denied. HR only." });
  }
  next();
};

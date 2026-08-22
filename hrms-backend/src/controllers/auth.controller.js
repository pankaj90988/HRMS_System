import User from "../models/user.model.js";
import PersonalDetail from "../models/personaldeatail.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { role, email, password } = req.body;

  try {
    if (!role || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if (!["HR", "EMPLOYEE"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    await PersonalDetail.create({ userId: newUser._id });
    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("Error in login controller ", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log("Error in logout controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Used by the frontend on page load / refresh to check if the jwt cookie
// still represents a valid session (route is wrapped with protectRoute).
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

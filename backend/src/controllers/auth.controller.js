import User from "../models/user.model.js";
import PersonalDetail from "../models/personaldeatail.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js"; // ⚠️ "generateToken" kahin import hi nahi tha — ReferenceError deta ye

export const signup = async (req, res) => {
  const { role, email, password } = req.body;

  // if(role === "HR"){
  //   return res.status(400).json({ message: "you cannot become HR" });
  // }
  try {
    if (!role || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) { // ⚠️ ye check comment out tha — User model me minlength:6 hai to iske bina Mongoose error thoda ajeeb message dega, isliye enable kar diya
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email: email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      role: role
    });

    if (newUser) {
      await newUser.save(); 

      await PersonalDetail.create({ userId: newUser._id });
      generateToken(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
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
      role: user.role, // ⚠️ "fullName" aur "profilePic" User model me exist hi nahi karte (schema me sirf email/password/role hai) — "role" bhej diya jo actually kaam ka field hai
      // ⚠️ "password: user.password" HATA DIYA — hashed password bhi frontend ko response me bhejna bada security issue tha, kabhi na karein
    });
  } catch (error) {
    console.log("Error in login controller ", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successfully" }); // ⚠️ "succesfully" typo fix
  } catch (error) {
    console.log("Error in logout controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
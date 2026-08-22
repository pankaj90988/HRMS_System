import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 din (milliseconds mein) — expiresIn se match karta hona chahiye
    httpOnly: true, // ⚠️ zaroori hai — isse JS (client-side) cookie ko read/access nahi kar sakta, XSS attacks se bachata hai
    sameSite: "strict", // CSRF attacks se protection
    secure: process.env.NODE_ENV !== "development", // production (HTTPS) mein true, local dev mein false
  });

  return token;
};
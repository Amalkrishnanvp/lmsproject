import { User } from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const isProd = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProd, // only true in production (HTTPS)
  sameSite: isProd ? "none" : "lax", // "none" allows cross-site cookies in prod
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const setTokenCookie = (res, token) => {
  res.cookie("token", token, cookieOptions);
};

const clearTokenCookie = (res) => {
  res.clearCookie("token", {
    ...cookieOptions,
    maxAge: 0,
  });
};

// function to perform login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if both email and password provided
    if (!email) {
      throw new Error("Email not found");
    } else if (!password) {
      throw new Error("Password not found");
    }

    // fetch user from db
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    // compare password
    if (password !== user.password) {
      res.status(404).json({ message: "user not found" });
    }

    // generate jwt token
    const token = generateToken(user._id);
    console.log(token);

    // set token on cookies
    setTokenCookie(res, token);

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const check = async (req, res) => {
  const token = req.cookies.token;

  console.log("Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);

    const user = await User.findById(decoded.userId).select("-password");
    console.log("User:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: err.message,
    });
  }
};

export const logout = async (req, res) => {
  console.log("➡️ logout route hit");

  clearTokenCookie(res);

  res.status(200).json({ message: "Logged out successfully" });
};

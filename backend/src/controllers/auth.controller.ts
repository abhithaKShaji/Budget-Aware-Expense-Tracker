import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { generateTokens } from "../utils/jwt-token";
import { AuthRequest } from "../middlewares/auth.miiddleware";

// ---------------- REGISTER ----------------
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------- LOGIN ----------------
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // JWT payload - without role
    const payload = { id: user._id, email: user.email };

    const { accessToken, refreshToken } = generateTokens(payload);

    // Save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------- REFRESH TOKEN ----------------
export const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });

  try {
    const user = await User.findOne({ refreshToken });
    if (!user)
      return res.status(403).json({ message: "Invalid refresh token" });

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as { id: string; email: string };

    const { accessToken, refreshToken: newRefresh } = generateTokens(decoded);

    // Save new refresh token
    user.refreshToken = newRefresh;
    await user.save();

    res.json({ accessToken, refreshToken: newRefresh });
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

// ---------------- LOGOUT ----------------
export const logoutUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId)
      return res.status(401).json({ message: "Unauthorized: No user found" });

    await User.findByIdAndUpdate(userId, { refreshToken: null });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------- GET LOGGED-IN USER PROFILE ----------------
export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id)
      return res.status(401).json({ message: "Unauthorized: No user found" });

    const user = await User.findById(req.user.id).select("-password -refreshToken");
    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Profile fetched successfully",
      user
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

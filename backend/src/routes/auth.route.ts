import express from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  getUserProfile,
  logoutUser
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.miiddleware";

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", authMiddleware, logoutUser);

// Profile Route
router.get("/profile", authMiddleware, getUserProfile);

export default router;

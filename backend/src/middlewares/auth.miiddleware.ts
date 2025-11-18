import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export interface AuthRequest extends Request {
  user?: {
    id: Types.ObjectId;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "yoursecretkey"
    ) as {
      id: string;
    };

    req.user = {
      id: new Types.ObjectId(decoded.id),
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

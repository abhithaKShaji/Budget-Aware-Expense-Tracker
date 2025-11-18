import { Request, Response } from "express";
import { Category } from "../models/category.model";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, color, monthlyLimit } = req.body;

    if (!name || !color || !monthlyLimit) {
      return res.status(400).json({
        success: false,
        message: "Name, color, and monthlyLimit are required.",
      });
    }

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Category with this name already exists.",
      });
    }

    const category = await Category.create({
      name,
      color,
      monthlyLimit,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Failed to create category.",
    });
  }
};

// GET ALL CATEGORIES
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Failed to fetch categories.",
    });
  }
};

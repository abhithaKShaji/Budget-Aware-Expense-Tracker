import { Request, Response } from "express";
import Expense from "../models/expense.model";
import { AuthRequest } from "../middlewares/auth.miiddleware";

export const createExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { categoryId, amount, date } = req.body;

    if (!categoryId || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const expense = await Expense.create({
      user: req.user.id,
      category: categoryId,
      amount,
      date,
    });

    return res.status(201).json({
      message: "Expense created successfully",
      expense,
    });

  } catch (error) {
    console.error("Create Expense Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getExpenses = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const expenses = await Expense.find({ user: req.user.id })
      .populate("category", "name budget")
      .sort({ date: -1 });

    return res.status(200).json(expenses);

  } catch (error) {
    console.error("Get Expenses Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getExpensesByCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { categoryId } = req.params;

    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const expenses = await Expense.find({
      user: req.user.id,
      category: categoryId,
    })
      .populate("category", "name budget")
      .sort({ date: -1 });

    return res.status(200).json(expenses);

  } catch (error) {
    console.error("Get Expenses by Category Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

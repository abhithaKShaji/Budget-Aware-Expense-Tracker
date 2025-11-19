import { Router } from "express";
import { createExpense,getExpenses,getExpensesByCategory } from "../controllers/expense.controller";
import { authMiddleware } from "../middlewares/auth.miiddleware";

const router = Router();

// POST /api/expenses
router.post("/", authMiddleware, createExpense);
router.get("/", authMiddleware, getExpenses);

router.get("/category/:categoryId", authMiddleware, getExpensesByCategory);

export default router;

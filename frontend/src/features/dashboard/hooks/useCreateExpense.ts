import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://backend-q5x6.onrender.com/api/expense";

interface CreateExpenseResponse {
  message: string;
  expense: {
    _id: string;
    user: string;
    category: string;
    amount: number;
    date: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function useCreateExpense() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createExpense = async (
    categoryId: string,
    amount: number,
    date: string
  ): Promise<CreateExpenseResponse | null> => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const res = await axios.post<CreateExpenseResponse>(
        BASE_URL,
        { categoryId, amount, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createExpense, loading, error };
}

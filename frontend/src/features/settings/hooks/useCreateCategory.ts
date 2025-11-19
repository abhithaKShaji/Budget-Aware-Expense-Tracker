import { useState } from "react";
import axios from "axios";
import {type Category } from "../types";

const BASE_URL = "https://backend-q5x6.onrender.com/"



interface CreateCategoryPayload {
  name: string;
  color: string;
  monthlyLimit: number;
}

export default function useCreateCategory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCategory = async (data: CreateCategoryPayload) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(
        `${BASE_URL}api/category`,
        data
      );

      return res.data.category as Category;
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createCategory, loading, error };
}

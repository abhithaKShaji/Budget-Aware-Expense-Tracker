import { useEffect, useState } from "react";
import axios from "axios";
import { type Category } from "../types";

const BASE_URL = "https://backend-q5x6.onrender.com/";

export default function useGetCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${BASE_URL}api/category`);

      if (res.data.success) {
        const formatted: Category[] = res.data.categories.map((c: any) => ({
          id: c._id,
          name: c.name,
          color: c.color,
          monthlyLimit: c.monthlyLimit ?? c.budget ?? 0, // fallback
          spent: c.spent ?? 0,
        }));

        setCategories(formatted);
      } else {
        setError("Failed to load categories");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return { categories, loading, error, refetch: getCategories };
}

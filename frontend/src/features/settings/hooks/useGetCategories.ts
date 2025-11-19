import { useEffect, useState } from "react";
import axios from "axios";
import {type Category } from "../types";

const BASE_URL = "https://backend-q5x6.onrender.com/"


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
        setCategories(res.data.categories);
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

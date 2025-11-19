import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://backend-q5x6.onrender.com/"


export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const signup = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const res = await axios.post(`${BASE_URL}api/auth/signup`,
        {
          name,
          email,
          password,
        }
      );

      setMessage(res.data.message); 
      return res.data;

    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error, message };
};

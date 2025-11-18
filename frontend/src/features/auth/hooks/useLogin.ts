import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://backend-q5x6.onrender.com/"


export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      const { accessToken, refreshToken, user, message } = res.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setMessage(message || "Login successful");

      return { accessToken, refreshToken, user };
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, message };
};

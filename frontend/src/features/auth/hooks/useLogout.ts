import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://backend-q5x6.onrender.com/"


export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("accessToken");

      const res = await axios.post(
        `${BASE_URL}api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message || "Logged out successfully");

      // Clear localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userInfo");

      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Logout failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error, message };
};

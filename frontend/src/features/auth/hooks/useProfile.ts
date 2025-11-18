import { useEffect, useState } from "react";
import axios from "axios";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const useProfile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("accessToken");

      const res = await axios.get("http://localhost:3000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { user, loading, error, refetch: fetchProfile };
};

import React, { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../features/auth/hooks/useLogin";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error, message } = useLogin();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await login(email, password);

    if (result) {
      navigate("/dashboard"); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-700">

        <h1 className="text-3xl font-bold text-center text-white mb-6">Welcome Back</h1>

        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        {message && <p className="text-green-400 text-sm mt-2">{message}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold mt-4 transition-all disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

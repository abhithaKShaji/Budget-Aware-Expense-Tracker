import React, { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { useSignup } from "../features/auth/hooks/useSignup";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, loading, error, message } = useSignup();

  const handleSignup = async () => {
    await signup(name, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-700">
        
        <h1 className="text-3xl font-bold text-center text-white mb-6">Create Account</h1>

        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        {message && <p className="text-green-400 text-sm mt-2">{message}</p>}

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold mt-4 transition-all disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-400 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

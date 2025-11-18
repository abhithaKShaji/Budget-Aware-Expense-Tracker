import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface AuthInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<AuthInputProps> = ({ label, type = "text", value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="mb-4 relative">
      <label className="block text-gray-300 text-sm mb-1">{label}</label>

      <input
        type={isPassword && showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-300 hover:text-white"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};

export default Input;

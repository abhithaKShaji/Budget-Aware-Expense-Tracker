import React from "react";
import { LayoutDashboard, PlusSquare, BarChart3, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MobileBottomNav: React.FC = () => {
  const location = useLocation();

  const items = [
    { icon: <LayoutDashboard size={24} />, path: "/dashboard" },
    { icon: <PlusSquare size={24} />, path: "/add-expense" },
    { icon: <BarChart3 size={24} />, path: "/reports" },
    { icon: <Settings size={24} />, path: "/settings" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-black/50 backdrop-blur-lg border-t border-gray-700 py-2 flex justify-around text-white">
      {items.map((item, i) => (
        <Link
          key={i}
          to={item.path}
          className={`flex flex-col items-center ${
            location.pathname === item.path ? "text-blue-400" : "text-gray-400"
          }`}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default MobileBottomNav;

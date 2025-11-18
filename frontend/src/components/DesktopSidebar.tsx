import React, { useState } from "react";
import {
  LayoutDashboard,
  PlusSquare,
  BarChart3,
  Settings,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const DesktopSidebar: React.FC = () => {
  const location = useLocation();
  const [openSettings, setOpenSettings] = useState(false);

  const items = [
    { label: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" },
    { label: "Add Expense", icon: <PlusSquare />, path: "/add-expense" },
    { label: "Reports", icon: <BarChart3 />, path: "/reports" },

    {
      label: "Settings",
      icon: <Settings />,
      path: "/settings",
      submenu: [
        { label: "Categories", path: "/settings/categories" },
        { label: "Budgets", path: "/settings/budgets" },
        { label: "Profile", path: "/settings/profile" },
      ],
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden md:flex flex-col w-64 h-screen bg-black/40 backdrop-blur-lg border-r border-gray-700 text-white p-5">
      <h2 className="text-2xl font-bold mb-6">Expense Tracker</h2>

      <nav className="space-y-3">
        {items.map((item) => {
          if (!item.submenu) {
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition 
                  ${isActive(item.path)
                    ? "bg-blue-600 text-white"
                    : "hover:bg-white/10 text-gray-300"
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          }

          // SETTINGS WITH SUBMENU
          return (
            <div key={item.label}>
              {/* Main Settings Button */}
              <button
                onClick={() => setOpenSettings(!openSettings)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg 
                  transition ${location.pathname.startsWith("/settings")
                    ? "bg-blue-600 text-white"
                    : "hover:bg-white/10 text-gray-300"
                  }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>

                <ChevronDown
                  className={`transition-transform ${openSettings ? "rotate-180" : ""}`}
                  size={18}
                />
              </button>

              {/* Submenu */}
              {openSettings && (
                <div className="ml-10 mt-2 space-y-2 border-l border-gray-600 pl-4">
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.label}
                      to={sub.path}
                      className={`block px-3 py-2 rounded-md text-sm transition
                        ${isActive(sub.path)
                          ? "bg-blue-500 text-white"
                          : "text-gray-300 hover:bg-white/10"
                        }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default DesktopSidebar;

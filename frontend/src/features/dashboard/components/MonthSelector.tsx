import React from "react";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { monthYearLabel } from "../../../utils/date";
import { useProfile } from "../../../features/auth/hooks/useProfile";
import { useLogout } from "../../../features/auth/hooks/useLogout";

interface Props {
  currentMonth: Date;
  onPrev: () => void;
  onNext: () => void;
  onLogout?: () => void;
}

const MonthSelector: React.FC<Props> = ({
  currentMonth,
  onPrev,
  onNext,
  onLogout
}) => {

  const { user, loading } = useProfile();
  const { logout } = useLogout();

  const handleLogout = async () => {
    const success = await logout();
    if (success && onLogout) onLogout();
  };

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div className="text-2xl sm:text-3xl font-semibold">
          {monthYearLabel(currentMonth)}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onPrev} className="p-2 rounded-md hover:bg-white/5">
            <ChevronLeft size={18} />
          </button>

          <button onClick={onNext} className="p-2 rounded-md hover:bg-white/5">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <span className="px-3 py-2 bg-white/10 rounded-md text-sm text-white font-medium">
          {loading ? "Loading..." : user?.name || "User"}
        </span>

        <button
          onClick={handleLogout}
          className="p-2 rounded-md hover:bg-red-500/20 text-red-400"
        >
          <LogOut size={20} />
        </button>
      </div>

    </header>
  );
};

export default MonthSelector;

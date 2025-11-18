import React from "react";
import DesktopSidebar from "../components/DesktopSidebar";
import MobileBottomNav from "../components/MobileBottomNav";

interface Props {
  children: React.ReactNode;
}

const PublicLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex w-full min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black">

      {/* Left Sidebar for Desktop */}
      <DesktopSidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 pb-20 md:pb-4 text-white overflow-y-auto">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default PublicLayout;

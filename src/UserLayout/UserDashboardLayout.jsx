import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../Components/UserSidebar";
import UserHeader from "../Components/UserHeader";

const UserDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">

      {/* OVERLAY (Mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <UserSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        <UserHeader setSidebarOpen={setSidebarOpen} />

        <div className="p-6 bg-white min-h-screen">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default UserDashboardLayout;
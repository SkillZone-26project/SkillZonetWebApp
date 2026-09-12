import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">

      {/* ==========================================
          SIDEBAR
      ========================================== */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* ==========================================
          RIGHT SECTION
      ========================================== */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* TOPBAR */}
        <Topbar setSidebarOpen={setSidebarOpen} />

        {/* MAIN CONTENT */}
        <main className="p-6 bg-white flex-1 min-w-0">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

const DashboardLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white mb-[55px]">
      
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Right Section */}
      <div className="flex flex-col flex-1">

        {/* Topbar */}
        <Topbar setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="p-6 bg-white min-h-screen">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
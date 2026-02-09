import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex flex-col flex-1">

        {/* Topbar */}
        <Topbar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;

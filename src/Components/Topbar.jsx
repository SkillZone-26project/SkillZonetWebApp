import React from "react";
import { LuBell } from "react-icons/lu";
import { useLocation } from "react-router-dom";

const Topbar = () => {
  const location = useLocation();

  const pageTitles = {
    "/dashboard": "Artisan Dashboard",
    "/dashboard/jobrequests": "Job Requests",
    "/dashboard/activejobs": "Active Jobs",
    "/dashboard/messages": "Messages",
    "/dashboard/wallet": "Wallet",
    "/dashboard/reviews": "Reviews",
    "/dashboard/profile": "Profile",
    "/dashboard/settings": "Settings",
  };

  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    <header className="h-[64px] bg-white border-b flex items-center justify-between px-6">
      <div>
        <h3 className="font-semibold text-textColor text-[24px]">
          {title}
        </h3>
        <p className="text-[14px] text-textGray">
          Welcome back, John!
        </p>
      </div>

      <div className="flex items-center gap-4 text-textColor text-[24px]">
        <LuBell />
      </div>
    </header>
  );
};

export default Topbar;

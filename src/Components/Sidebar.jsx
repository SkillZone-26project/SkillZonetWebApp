import { NavLink } from "react-router-dom";
import {
  LuHouse,
  LuBriefcase,
  LuMessageSquare,
  LuWallet,
  LuStar,
  LuUser,
  LuSettings,
  LuLogOut,
} from "react-icons/lu";

import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-[288px] bg-white text-textColor min-h-screen px-6 py-8 flex flex-col justify-between border-r">
      {/* LOGO */}
      <div>
        <img
          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1770670870/LogoDashboard_x6i5e2.png"
          alt="Dashboard Logo"
          className="mb-10"
        />

        <div className="flex gap-[10px]">
          {/* PROFILE */}
        <div className="flex items-center gap-3 mb-8">
          <img
            src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1770670893/ProfilePic_c3yslh.png"
            alt="Profile Pic"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm">John</p>
            <p className="text-xs text-textGray">Artisan</p>
          </div>
        </div>

        {/* PREMIUM BADGE */}
        <div className="bg-bgActive text-active text-xs px-3 py-1 rounded-full w-fit mb-10">
          Premium
        </div>
        </div>

        {/* NAV LINKS */}
        <nav className="space-y-2 text-[14px]">
          <SidebarLink
            to="/dashboard"
            icon={<LuHouse />}
            label="Dashboard"
            end
          />

          <SidebarLink
            to="/dashboard/jobrequests"
            icon={<LuBriefcase />}
            label="Job Requests"
          />

          <SidebarLink
            to="/dashboard/activejobs"
            icon={<LuBriefcase />}
            label="Active Jobs"
          />

          <SidebarLink
            to="/dashboard/messages"
            icon={<LuMessageSquare />}
            label="Messages"
          />

          <SidebarLink
            to="/dashboard/wallet"
            icon={<LuWallet />}
            label="Wallet"
          />

          <SidebarLink
            to="/dashboard/reviews"
            icon={<LuStar />}
            label="Reviews"
          />

          <SidebarLink
            to="/dashboard/profile"
            icon={<LuUser />}
            label="Profile"
          />

          <SidebarLink
            to="/dashboard/settings"
            icon={<LuSettings />}
            label="Settings"
          />
        </nav>
      </div>

{/* or remove token */}
      {/* onClick={() => {
  localStorage.clear(); 
  navigate("/");
}} */}


      {/* LOGOUT */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-3 text-red-500 text-sm hover:bg-red-50 px-3 py-2 rounded"
      >
        <LuLogOut />
        Logout
      </button>
    </aside>
  );
};

/* 🔹 Reusable Nav Item */
const SidebarLink = ({ to, icon, label, end }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
          isActive
            ? "bg-black text-white"
            : "text-textGray hover:bg-gray-100 hover:text-black"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      {label}
    </NavLink>
  );
};

export default Sidebar;

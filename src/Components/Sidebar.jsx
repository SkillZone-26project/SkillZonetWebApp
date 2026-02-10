import { NavLink } from "react-router-dom";
import {
  LuHouse,
  LuBriefcase,
  LuCalendar,
  LuMessageCircle,
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
    <aside className="w-[288px] bg-white text-textColor min-h-screen  flex flex-col justify-between border-r-2 border-textGay">
      {/* LOGO */}
      <div className="">
        <img
          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1770670870/LogoDashboard_x6i5e2.png"
          alt="Dashboard Logo"
          className="mb-8 mt-[2px] px-6"
        />
<hr className="w-full"/>
        <div className="flex gap-[70px] px-6 mt-[20px]">
          {/* PROFILE */}
        <div className="flex items-center gap-3 mb-8">
          <img
            src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1770670893/ProfilePic_c3yslh.png"
            alt="Profile Pic"
            className="w-[48px] h-[48px] rounded-full"
          />
          <div className="text-[16px] font-medium">
            <p className="text-textColor">John</p>
            <p className="text-xs text-textGray">Artisan</p>
          </div>
        </div>

        {/* PREMIUM BADGE */}
        <div className="bg-[#FE9A00] flex items-center justify-center text-white text-[12px] px-3 py-1 rounded-[8px] font-medium w-fit mb-10">
          Premium
        </div>
        </div>
<hr />
        {/* NAV LINKS */}
        <nav className="space-y-2 text-[16px] mt-[16px] font-medium px-6">
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
            icon={<LuCalendar />}
            label="Active Jobs"
          />

          <SidebarLink
            to="/dashboard/messages"
            icon={<LuMessageCircle />}
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
        className="flex items-center gap-3 text-textRed text-sm hover:bg-red-50 px-3 py-2 rounded mt-[80px]"
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

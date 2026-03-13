import { NavLink } from "react-router-dom";
import {
  LuHouse,
  LuSearch,
  LuCalendar,
  LuMessageCircle,
  LuBookmark,
  LuUser,
  LuSettings,
  LuLogOut,
} from "react-icons/lu";

import { useNavigate } from "react-router-dom";

const UserSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <aside
      className={`fixed lg:static z-50 top-0 left-0 h-screen w-[288px] bg-white text-textColor flex flex-col justify-between border-r-2 border-textGay transform transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >
      
      {/* LOGO */}
      <div className="">
        <img
          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1770670870/LogoDashboard_x6i5e2.png"
          alt="Dashboard Logo"
          className="mb-8 mt-[2px] px-6"
        />

        <hr className="w-full" />

        <div className="flex gap-[70px] px-6 mt-[20px]">

          {/* PROFILE */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1770670893/ProfilePic_c3yslh.png"
              alt="Profile Pic"
              className="w-[48px] h-[48px] rounded-full"
            />

            <div className="text-[16px] font-medium">
              <p className="text-textColor">Sarah Johnson</p>
              <p className="text-xs text-textGray">User</p>
            </div>
          </div>

        </div>

        <hr />

        {/* NAV LINKS */}
        <nav className="space-y-2 text-[16px] mt-[16px] font-medium px-6">

          <SidebarLink
            to="/user/dashboard"
            icon={<LuHouse />}
            label="Dashboard"
            end
            setSidebarOpen={setSidebarOpen}
          />

          <SidebarLink
            to="/user/find-artisans"
            icon={<LuSearch />}
            label="Find Artisans"
            setSidebarOpen={setSidebarOpen}
          />

          <SidebarLink
            to="/user/bookings"
            icon={<LuCalendar />}
            label="My Bookings"
            setSidebarOpen={setSidebarOpen}
          />

          <SidebarLink
            to="/user/messages"
            icon={<LuMessageCircle />}
            label="Messages"
            setSidebarOpen={setSidebarOpen}
          />

          <SidebarLink
            to="/user/saved-artisans"
            icon={<LuBookmark />}
            label="Saved Artisans"
            setSidebarOpen={setSidebarOpen}
          />

          <SidebarLink
            to="/user/profile"
            icon={<LuUser />}
            label="Profile"
            setSidebarOpen={setSidebarOpen}
          />

          <SidebarLink
            to="/user/settings"
            icon={<LuSettings />}
            label="Settings"
            setSidebarOpen={setSidebarOpen}
          />

        </nav>
      </div>

      {/* LOGOUT */}
      <div className="border-t border-textGay px-6 py-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 text-textRed text-sm hover:bg-red-50 px-3 py-2 rounded w-full"
        >
          <LuLogOut />
          Logout
        </button>
      </div>
    </aside>
  );
};


/* REUSABLE NAV LINK */
const SidebarLink = ({ to, icon, label, end, setSidebarOpen }) => {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={() => setSidebarOpen(false)}
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

export default UserSidebar;
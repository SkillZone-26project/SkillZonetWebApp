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
import { useEffect, useState } from "react";
import axios from "axios";

const UserSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  // ✅ STATE
  const [user, setUser] = useState(null);

  // ✅ FETCH USER DATA
 // ✅ FETCH USER DATA
useEffect(() => {
  const fetchUser = async () => {
    try {
      console.log("=================================");
      console.log("🚀 FETCHING USER PROFILE...");
      console.log("=================================");

      const token = localStorage.getItem("token");

      const device = navigator.platform || "Web Browser";
      const userAgent = navigator.userAgent || "Unknown User Agent";

      console.log("✅ TOKEN:", token);

      console.log("✅ DEVICE:", device);

      console.log("✅ USER AGENT:", userAgent);

      console.log("=================================");

      const res = await axios.get(
        "https://skillzonet-backend-auth-v1.onrender.com/api/userAuth/get-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-device": device,
            "x-user-agent": userAgent,
          },
        }
      );

      console.log("=================================");
      console.log("✅ USER PROFILE FETCHED");
      console.log("=================================");
      console.log("STATUS:", res.status);
      console.log("FULL RESPONSE:", res);
      console.log("RESPONSE DATA:", res.data);

      // ✅ SUPPORT DIFFERENT RESPONSE STRUCTURES
      const userData =
        res.data?.data ||
        res.data?.user ||
        res.data;

      console.log("✅ FINAL USER DATA:", userData);

      setUser(userData);

    } catch (err) {

      console.log("=================================");
      console.log("❌ USER PROFILE FETCH FAILED");
      console.log("=================================");

      console.log("❌ FULL ERROR:", err);

      console.log("❌ ERROR MESSAGE:", err.message);

      console.log("❌ ERROR RESPONSE:", err.response);

      console.log("❌ ERROR STATUS:", err.response?.status);

      console.log("❌ ERROR DATA:", err.response?.data);

      console.log("❌ ERROR HEADERS:", err.response?.headers);

      console.log("❌ BACKEND MESSAGE:",
        err.response?.data?.message
      );

      console.log("❌ BACKEND DETAILS:",
        err.response?.data?.details
      );

      console.log("=================================");
    }
  };

  fetchUser();
}, []);

  return (
    <aside
      className={`fixed lg:static z-50 top-0 left-0 h-screen w-[288px] bg-white text-textColor flex flex-col justify-between border-r-2 border-textGay transform transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >

      {/* LOGO */}
      <div className="">
        <img
          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1774017217/SkillZonet_Logo_2_erxxta.png"
          alt="Dashboard Logo"
          className="mb-8 mt-[2px] ml-6 w-[70px] h-[75px]"
        />

        <hr className="w-full" />

        <div className="flex gap-[70px] px-6 mt-[20px]">

          {/* PROFILE */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src={
                user?.profilePic ||
                "https://res.cloudinary.com/dqtyrjpeh/image/upload/q_auto/f_auto/v1774203306/Primitive.span_2_bssqdu.png"
              }
              alt="Profile Pic"
              className="w-[48px] h-[48px] rounded-full object-cover"
            />

            <div className="text-[16px] font-medium">
              <p className="text-textColor">
               {user?.fullName || "User"}
              </p>

              <p className="text-[14px] text-textGray">
                {user?.role || ""}
              </p>
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
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
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
const SidebarLink = ({
  to,
  icon,
  label,
  end,
  setSidebarOpen,
}) => {
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
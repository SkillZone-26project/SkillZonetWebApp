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
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

  const navigate = useNavigate();
  const sidebarRef = useRef();

  // ✅ STATE
  const [user, setUser] = useState(null);

  /* CLOSE WHEN CLICKING OUTSIDE */
  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  // ✅ FETCH ARTISAN PROFILE
  useEffect(() => {

    const fetchUser = async () => {

      try {

        console.log("=================================");
        console.log("🚀 FETCHING ARTISAN PROFILE");
        console.log("=================================");

        const token =
          localStorage.getItem("token");

        console.log("TOKEN:", token);

        if (!token) {

          console.log("❌ NO TOKEN FOUND");

          return;
        }

        const res = await axios.get(
          "https://skillzonet-backend-auth-v1.onrender.com/api/artisans/get-profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,

              "Content-Type":
                "application/json",

              // ✅ SEND THESE
              "x-device":
                navigator.platform ||
                "Web Browser",

              "x-user-agent":
                navigator.userAgent ||
                "Unknown User Agent",
            },
          }
        );

        console.log("=================================");
        console.log("✅ API SUCCESS");
        console.log("=================================");

        console.log("FULL RESPONSE:", res);

        console.log("RESPONSE DATA:", res.data);

        console.log("STATUS:", res.status);

        // ✅ IMPORTANT
        const userData = res.data?.artisan;

        console.log(
          "FINAL USER DATA:",
          userData
        );

        setUser(userData);

      } catch (err) {

        console.log("=================================");
        console.log("❌ FETCH PROFILE ERROR");
        console.log("=================================");

        console.log("FULL ERROR:", err);

        console.log(
          "ERROR MESSAGE:",
          err.message
        );

        console.log(
          "ERROR RESPONSE:",
          err.response
        );

        console.log(
          "ERROR STATUS:",
          err.response?.status
        );

        console.log(
          "ERROR DATA:",
          err.response?.data
        );
      }
    };

    fetchUser();

  }, []);

  // ✅ NAME
  const firstName =
    user?.fullName?.split(" ")[0] ||
    user?.name?.split(" ")[0] ||
    user?.firstName ||
    "Artisan Name";

  return (
    <aside
      ref={sidebarRef}
      className={`fixed lg:static z-50 top-0 left-0 h-screen w-[288px] bg-white text-textColor flex flex-col justify-between border-r-2 border-textGay transform transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >

      {/* LOGO */}
      <div>

        <img
          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1774017217/SkillZonet_Logo_2_erxxta.png"
          alt="Dashboard Logo"
          className="mb-8 mt-[2px] ml-6 w-[70px] h-[75px]"
        />

        <hr className="w-full" />

        <div className="flex gap-[50px] px-6 mt-[20px]">

          <div className="flex items-center gap-3 mb-8">

            <img
              src={
                user?.profilePic ||
                "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1770670893/ProfilePic_c3yslh.png"
              }
              alt="Profile Pic"
              className="w-[48px] h-[48px] rounded-full object-cover"
            />

            <div className="text-[16px] font-medium w-full">

              <p className="text-textColor text-[18px]">
                {firstName}
              </p>

              <p className="text-xs text-textGray">
                {user?.role || "Artisan"}
              </p>

            </div>

          </div>

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
            setSidebarOpen={setSidebarOpen}
          />

          <SidebarLink
            to="/dashboard/jobrequests"
            icon={<LuBriefcase />}
            label="Job Requests"
            setSidebarOpen={setSidebarOpen}
          />

          <SidebarLink
            to="/dashboard/activejobs"
            icon={<LuCalendar />}
            label="Active Jobs"
            setSidebarOpen={setSidebarOpen}
          />

          <SidebarLink
            to="/dashboard/messages"
            icon={<LuMessageCircle />}
            label="Messages"
            setSidebarOpen={setSidebarOpen}
          />

          <SidebarLink
            to="/dashboard/wallet"
            icon={<LuWallet />}
            label="Wallet"
            setSidebarOpen={setSidebarOpen}
          />

          <SidebarLink
            to="/dashboard/reviews"
            icon={<LuStar />}
            label="Reviews"
            setSidebarOpen={setSidebarOpen}
          />

          <SidebarLink
            to="/dashboard/profile"
            icon={<LuUser />}
            label="Profile"
            setSidebarOpen={setSidebarOpen}
          />

          <SidebarLink
            to="/dashboard/settings"
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
            localStorage.removeItem("user");

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
      <span className="text-lg">
        {icon}
      </span>

      {label}

    </NavLink>
  );
};

export default Sidebar;
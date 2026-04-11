import React, { useState, useRef, useEffect } from "react";
import { LuBell, LuMenu } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import axios from "axios";

const UserHeader = ({ setSidebarOpen }) => {
  const location = useLocation();

  // Page titles mapping
  const pageTitles = {
    "/user/dashboard": "Client Dashboard",
    "/user/find-artisans": "Search",
    "/user/bookings": "My Bookings",
    "/user/messages": "Messages",
    "/user/saved-artisans": "Saved Artisans",
    "/user/profile": "Profile",
    "/user/settings": "Settings",
  };

  const title = pageTitles[location.pathname] || "Dashboard";

  // ✅ State for user and loading
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Demo notifications
  const [notifications] = useState([
    { id: 1, message: "Your booking with John Artisan was confirmed." },
    { id: 2, message: "A new artisan is available near you." },
    { id: 3, message: "Your saved artisan updated their profile." },
  ]);

  const notificationCount = notifications.length;
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Fetch user from API (FIXED)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("No token found");
          return;
        }

        const res = await axios.get(
          "https://skillzonet-backend-auth-v1.onrender.com/api/userAuth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("HEADER RESPONSE:", res.data);

        // ✅ FIX: handle both possible response formats
        const userData = res.data?.user || res.data;

        setUser(userData);
      } catch (err) {
        console.error(
          "❌ Failed to fetch user:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-[85px] bg-white border-b flex items-center justify-between px-6 fixed z-50 left-0 lg:left-[288px] w-full lg:w-[calc(100%-288px)]">

      <div className="flex items-center gap-4">

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setSidebarOpen(true)}
        >
          <LuMenu />
        </button>

        <div>
          <h3 className="font-semibold text-textColor text-[18px] md:text-[20px] lg:text-[24px]">
            {title}
          </h3>

         <p className="text-[14px] text-textGray">
  Welcome back,{" "}
  <span>
    {user?.fullName ? user.fullName.split(" ")[0] : "User"}
  </span>
  !
</p>
        </div>

      </div>

      {/* NOTIFICATION */}
      <button
        ref={dropdownRef}
        onClick={() => notificationCount > 0 && setOpenDropdown(!openDropdown)}
        className="relative flex items-center text-textColor text-[24px]"
      >
        <LuBell />

        {/* COUNT BADGE */}
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
            {notificationCount}
          </span>
        )}

        {/* DROPDOWN */}
        {openDropdown && notificationCount > 0 && (
          <div className="absolute right-0 top-10 w-[280px] bg-white shadow-lg rounded-lg border p-3 text-sm z-50">

            <p className="font-semibold mb-2 text-black">
              Notifications
            </p>

            <div className="space-y-2">
              {notifications.map((note) => (
                <div
                  key={note.id}
                  className="p-2 rounded hover:bg-gray-100 cursor-pointer"
                >
                  {note.message}
                </div>
              ))}
            </div>

          </div>
        )}

      </button>

    </header>
  );
};

export default UserHeader;
import React, { useState, useRef, useEffect } from "react";
import { LuBell, LuMenu } from "react-icons/lu";
import { useLocation } from "react-router-dom";

const Topbar = ({ setSidebarOpen }) => {
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

  /* DEMO NOTIFICATIONS */
   const [notifications] = useState([
     { id: 1, message: "Your booking with John Artisan was confirmed." },
     { id: 2, message: "A new artisan is available near you." },
     { id: 3, message: "Your saved artisan updated their profile." },
   ]);
 
   const notificationCount = notifications.length;
 
   const [openDropdown, setOpenDropdown] = useState(false);
   const dropdownRef = useRef(null);
 
   /* CLOSE DROPDOWN WHEN CLICKING OUTSIDE */
   useEffect(() => {
     const handleClickOutside = (event) => {
       if (
         dropdownRef.current &&
         !dropdownRef.current.contains(event.target)
       ) {
         setOpenDropdown(false);
       }
     };
 
     document.addEventListener("mousedown", handleClickOutside);
 
     return () => {
       document.removeEventListener("mousedown", handleClickOutside);
     };
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
             Welcome back, <span>John</span>!
           </p>
         </div>
 
       </div>
 
       {/* NOTIFICATION */}
       <button
         ref={dropdownRef}
         onClick={() =>
           notificationCount > 0 && setOpenDropdown(!openDropdown)
         }
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
export default Topbar;

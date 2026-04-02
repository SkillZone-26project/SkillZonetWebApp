import { useState } from "react";
import UserMyBookingsCard from "./UserBookings/UserMyBookingsCard"
import UserMyBookingStats from "./UserBookings/UserMyBookingStats"

const UserMyBookings = () => {
  // 'active' is the default tab
  const [activeTab, setActiveTab] = useState("active");

  const bookings = [
    { id: 1, title: "Kitchen Sink Repair", user: "John Mensah", date: "12/03/2026", time: "14:50", location: "Lekki, Lagos", price: 18000, status: "booked", avatar:"https://res.cloudinary.com/dipdvqnin/image/upload/v1774723806/active_nzhkd0.jpg" },
    { id: 2, title: "Bathroom Renovation", user: "John Mensah", date: "12/03/2026", time: "09:00", location: "Ikeja, Lagos", price: 45000, status: "progress", avatar:"https://res.cloudinary.com/dipdvqnin/image/upload/v1774723806/active_nzhkd0.jpg" },
    { id: 3, title: "Socket Installation", user: "Amy Doe", date: "09/03/2026", time: "11:00", location: "Abuja", price: 20000, status: "completed", avatar:"https://res.cloudinary.com/dipdvqnin/image/upload/v1774722839/completed_livr0l.jpg"},
  ];

  // Novice-friendly filtering logic
  const filtered = bookings.filter((item) => {
    const currentStatus = item.status.toLowerCase();

    if (activeTab === "active") {
      // Show anything currently being worked on
      return currentStatus === "booked" || currentStatus === "progress";
    }
    // Otherwise, show only finished jobs
    return currentStatus === "completed";
  });

  return (
    <div className="pb-20 pt-[85px] px-4 sm:px-6 bg-white min-h-screen">
      <div className="max-w-[848px] mx-auto space-y-6">

        {/* Top Statistics Cards */}
        <UserMyBookingStats />

        {/* Blue Promotion Banner */}

<div className="bg-[linear-gradient(90deg,_#EFF6FF_0%,_#FAF5FF_100%)] p-5 rounded-xl flex justify-between items-center border border-[#E0E7FF]">
  <div>
    <h3 className="text-sm font-bold text-textColor">Need a service?</h3>
    <p className="text-xs text-textGray mt-0.5">Find trusted artisans near you in seconds</p>
  </div>
  <button className="bg-black text-white text-xs px-5 py-2.5 rounded-lg font-semibold shadow-sm">
    Find Artisans
  </button>
</div>


        {/* Tab Selection Row */}
        <div className="flex gap-2 p-1 bg-gray-100 w-fit rounded-full">
          {["active", "completed"].map((tabName) => {
            // Count how many items belong in this tab
            const count = bookings.filter((b) => {
              const s = b.status.toLowerCase();
              return tabName === "active" ? (s === "booked" || s === "progress") : s === "completed";
            }).length;

            return (
              <button
                key={tabName}
                onClick={() => setActiveTab(tabName)}
                className={`px-6 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                  activeTab === tabName ? "bg-white text-black shadow-sm" : "text-textGray hover:bg-gray-200"
                }`}
              >
                {tabName} ({count})
              </button>
            );
          })}
        </div>

        {/* The dynamic list of booking cards */}
        <div className="space-y-3">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <UserMyBookingsCard key={item.id} item={item} />
            ))
          ) : (
            <p className="text-center text-gray-400 py-10">No {activeTab} bookings yet.</p>
          )}
        </div>

        {/* Total Summary Footer */}
        <div className="bg-white border border-gray-100 rounded-xl p-10 text-center shadow-sm">
          <p className="text-3xl font-black text-gray-900">₦245,000</p>
          <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mt-1">Total Spent</p>
        </div>
      </div>
    </div>
  );
};

export default UserMyBookings;


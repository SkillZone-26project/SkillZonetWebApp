import React, { useState } from "react";
import {
  LuClock4,
  LuStar,
  LuUser,
  LuCalendar,
  LuMessageCircle,
} from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import TotalSpent from "../../UserPages/Userdashboard/TotalSpent";

const UserDashboard = () => {
  const totalJobs = 30;
  const completedJobs = 24;
  const monthlyProgress = (completedJobs / totalJobs) * 100;

  const responseRate = 95;

  const satisfactionScore = 4.8;
  const satisfactionTotal = 5;
  const satisfactionProgress = (satisfactionScore / satisfactionTotal) * 100;

  const [activeTab, setActiveTab] = useState("requests");
  const [requestStatus, setRequestStatus] = useState(null);

  return (
    <main className="space-y-6 px-2 sm:px-2 min-h-screen pt-[85px]">

      {/* SECTION 1 */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">

        {/* Card 1 */}
        <div className="border rounded-[14px] p-4 sm:p-5 flex items-center gap-[25px] sm:gap-[20px] lg:gap-[12px]">
          <div className="w-[36px] h-[36px] rounded-[10px] bg-[#DBEAFE] text-[#155DFC] flex items-center justify-center">
            <LuClock4 />
          </div>
          <div>
            <p className="text-[20px] sm:text-[24px] font-semibold text-textColor">
              2
            </p>
            <p className="text-[14px] text-textGray">Active Jobs</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="border rounded-[14px] p-4 sm:p-5 flex items-center gap-[25px] sm:gap-[20px] lg:gap-[12px]">
          <div className="w-[36px] h-[36px] rounded-[10px] bg-[#DCFCE7] text-[#00A63E] flex items-center justify-center">
            <LuStar />
          </div>
          <div>
            <p className="text-[20px] sm:text-[24px] font-semibold text-textColor">
              1
            </p>
            <p className="text-[14px] text-textGray">Completed</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="border rounded-[14px] p-4 sm:p-5 flex items-center gap-[25px] sm:gap-[20px] lg:gap-[12px]">
          <div className="w-[36px] h-[36px] rounded-[10px] bg-[#F3E8FF] text-[#9810FA] flex items-center justify-center">
            <LuUser />
          </div>
          <div>
            <p className="text-[20px] sm:text-[24px] font-semibold text-textColor">
              5
            </p>
            <p className="text-[14px] text-textGray">Save Artisans</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="border rounded-[14px] p-4 sm:p-5 flex items-center gap-[25px] sm:gap-[20px] lg:gap-[12px]">
          <div className="w-[36px] h-[36px] rounded-[10px] bg-[#FFEDD4] text-[#F54900] flex items-center justify-center">
            <LuMessageCircle />
          </div>
          <div>
            <p className="text-[20px] sm:text-[24px] font-semibold text-textColor">
              3
            </p>
            <p className="text-[14px] text-textGray">Unread Messages</p>
          </div>
        </div>

      </section>

      {/* SECTION 2 */}
      <section>
        <div className="w-full border rounded-[14px] p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between lg:justify-between gap-4">
          <div>
            <p className="text-[26px] sm:text-[30px] font-bold text-textColor">
              Need a service?
            </p>
            <p className="text-[14px] text-textGray">
              Find trusted artisans near you in seconds
            </p>
          </div>

          <button className="w-full sm:w-[134px] h-[40px] bg-black text-white rounded-[8px] text-[14px] font-medium px-[23px]">
            Find Artisans
          </button>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="space-y-6">

        {/* Tabs */}
        <div className="flex gap-[10px] w-full md:w-[199px] h-[38px] bg-[#ECECF0] rounded-[14px] text-[12px] font-medium p-[4px] overflow-x-auto">

          <button
            onClick={() => setActiveTab("requests")}
            className={`flex-1 rounded-[14px] ${
              activeTab === "requests" ? "bg-white text-textColor" : ""
            }`}
          >
            Active <span>(2)</span>
          </button>

          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 rounded-[14px] ${
              activeTab === "active" ? "bg-white text-textColor" : ""
            }`}
          >
            Completed <span>(1)</span>
          </button>

        </div>

        {/* Tab Content */}
        <div className="mt-[24px]">

          {/* ACTIVE TAB */}
          {activeTab === "requests" && (
            <div>

              {/* CARD 1 */}
              <div className="border rounded-[14px] p-4">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

                  <div className="flex gap-[16px]">
                    <img
                      src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1772140352/Primitive.img_5_sqmsfy.png"
                      alt=""
                      className="w-[48px] h-[48px] rounded-[26px]"
                    />

                    <div>
                      <p className="text-[18px] font-semibold text-textColor mb-[8px]">
                        Plumbing - Kitchen Sink Repair
                      </p>

                      <p className="text-[14px] text-textGray mb-[8px]">
                        John Mensah
                      </p>

                      <div className="flex flex-col md:flex-row md:gap-[8px]">

                        <div className="flex items-center text-[14px] text-textGray gap-[4px]">
                          <LuCalendar />
                          <p>12/01/2026</p>
                        </div>

                        <div className="flex items-center text-[14px] text-textGray gap-[4px]">
                          <LuClock4 />
                          <p>14:00</p>
                        </div>

                        <div className="flex items-center text-[14px] text-textGray gap-[4px]">
                          <IoLocationOutline />
                          <p>Lekki, Lagos</p>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start lg:items-end gap-[12px]">
                    <button className="bg-[#AD46FF] rounded-[8px] px-[9px] py-[4px] text-[12px] font-medium text-white">
                      ON THE-WAY
                    </button>

                    <p className="text-[16px] font-semibold">
                      ₦<span>18000</span>
                    </p>
                  </div>

                </div>
              </div>

              {/* CARD 2 */}
              <div className="border rounded-[14px] p-4 mt-[16px]">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

                  <div className="flex gap-[16px]">
                    <img
                      src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1772140352/Primitive.img_5_sqmsfy.png"
                      alt=""
                      className="w-[48px] h-[48px] rounded-[26px]"
                    />

                    <div>
                      <p className="text-[18px] font-semibold text-textColor mb-[8px]">
                        Plumbing - Bathroom Renovation
                      </p>

                      <p className="text-[14px] text-textGray mb-[8px]">
                        John Mensah
                      </p>

                      <div className="flex flex-col md:flex-row md:gap-[8px]">

                        <div className="flex items-center text-[14px] text-textGray gap-[4px]">
                          <LuCalendar />
                          <p>15/01/2026</p>
                        </div>

                        <div className="flex items-center text-[14px] text-textGray gap-[4px]">
                          <LuClock4 />
                          <p>09:00</p>
                        </div>

                        <div className="flex items-center text-[14px] text-textGray gap-[4px]">
                          <IoLocationOutline />
                          <p>Ikeja, Lagos</p>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start lg:items-end gap-[12px]">
                    <button className="bg-[#F0B100] rounded-[8px] px-[9px] py-[4px] text-[12px] font-medium text-white">
                      PENDING
                    </button>

                    <p className="text-[16px] font-semibold">
                      ₦<span>45000</span>
                    </p>
                  </div>

                </div>
              </div>

              {/* TOTAL SPENT (ONLY IN ACTIVE TAB) */}
              <TotalSpent />

            </div>
          )}

          {/* COMPLETED TAB */}
          {activeTab === "active" && (
            <div className="border rounded-[14px] p-4">
              <p className="text-[16px]">Completed Jobs will appear here</p>
            </div>
          )}

        </div>
      </section>

    </main>
  );
};

export default UserDashboard;
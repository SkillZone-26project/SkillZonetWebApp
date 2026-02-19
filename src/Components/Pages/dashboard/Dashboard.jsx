import React, { useState } from "react";
import {
  LuDollarSign,
  LuClock4,
  LuCalendar,
  LuCircleCheckBig,
} from "react-icons/lu";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FiAward } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";

const Dashboard = () => {
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
    <main className="space-y-6 px-2 sm:px-4 h-[800px] pt-[85px]">
      {/* SECTION 1  */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="border rounded-[14px] p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
          <div className="w-[36px] h-[36px] rounded-[10px] bg-bgCompleted text-completed flex items-center justify-center">
            <LuDollarSign />
          </div>
          <div>
            <p className="text-[20px] sm:text-[24px] font-semibold text-textColor">
              ₦1,250
            </p>
            <p className="text-[14px] text-textGray">Wallet Balance</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="border rounded-[14px] p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
          <div className="w-[36px] h-[36px] rounded-[10px] bg-bgActive text-active flex items-center justify-center">
            <FaArrowTrendUp />
          </div>
          <div>
            <p className="text-[20px] sm:text-[24px] font-semibold text-textColor">
              ₦3,450
            </p>
            <p className="text-[14px] text-textGray">This Month</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="border rounded-[14px] p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
          <div className="w-[36px] h-[36px] rounded-[10px] bg-bgCompleted text-completed flex items-center justify-center">
            <FiAward />
          </div>
          <div>
            <p className="text-[20px] sm:text-[24px] font-semibold text-textColor">
              24
            </p>
            <p className="text-[14px] text-textGray">Jobs Completed</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="border rounded-[14px] p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
          <div className="w-[36px] h-[36px] rounded-[10px] bg-bgPending text-pending flex items-center justify-center">
            <LuClock4 />
          </div>
          <div>
            <p className="text-[20px] sm:text-[24px] font-semibold text-textColor">
              1
            </p>
            <p className="text-[14px] text-textGray">Pending Requests</p>
          </div>
        </div>
      </section>

      {/* SECTION 2 – WALLET & SUBSCRIPTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Wallet */}
        <div className="border rounded-[14px] p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-[16px] sm:text-[18px] font-semibold text-textColor">
              Wallet
            </p>
            <p className="text-[26px] sm:text-[30px] font-bold text-textColor">
              ₦1,250
            </p>
            <p className="text-[14px] text-textGray">Available to withdraw</p>
          </div>
          <button className="w-full sm:w-[95px] h-[36px] bg-black text-white rounded-[8px] text-[14px] font-medium">
            Withdraw
          </button>
        </div>

        {/* Subscription */}
        <div className="border rounded-[14px] p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-[16px] sm:text-[18px] font-semibold text-textColor">
              Subscription
            </p>
            <span className="inline-flex items-center justify-center bg-[#FE9A00] text-white text-[12px] px-3 py-1 rounded-[8px] font-medium mt-1">
              Premium Plan
            </span>
            <p className="text-[14px] text-textGray mt-1">
              Renews on Jan 25, 2026
            </p>
          </div>
          <button className="w-full sm:w-[95px] h-[36px] border rounded-[8px] text-[14px] font-medium text-textColor">
            Manage
          </button>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="border rounded-[14px] p-[24px]">
        <h4 className="text-[18px] font-semibold text-textColor mb-[39px]">
          This Month's Performance
        </h4>
        <div className="flex gap-[10px]">
          {/* Monthly Goal */}
          <div className="w-[320px] space-y-4">
            <div className="flex text-[14px] justify-between">
              <p className=" text-textGray font-normal">Monthly Goal</p>

              <p className="text-textColor font-medium">
                {completedJobs}/{totalJobs} Jobs
              </p>
            </div>

            <div className="w-full h-[8px] bg-[#ECECF0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#030213]"
                style={{ width: `${monthlyProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Response Rate */}
          <div className="w-[320px] space-y-4">
            <div className="flex text-[14px] justify-between">
              <p className=" text-textGray font-normal">Response Rate</p>

              <p className="text-textColor font-medium">{responseRate}%</p>
            </div>

            <div className="w-full h-[8px] bg-[#ECECF0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#030213]"
                style={{ width: `${responseRate}%` }}
              ></div>
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="w-[320px] space-y-4">
            <div className="flex text-[14px] justify-between">
              <p className=" text-textGray font-normal">
                Customer's Satisfaction
              </p>

              <p className="text-textColor font-medium">
                {satisfactionScore}/{satisfactionTotal}
              </p>
            </div>
            <div className="w-full h-[8px] bg-[#ECECF0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#030213]"
                style={{ width: `${satisfactionProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="space-y-6">
        {/* Tabs */}
        <div className="flex gap-[10px] w-[353px] h-[36px] bg-[#ECECF0] rounded-[14px] text-[12px] font-medium p-[4px]">
          <button
            onClick={() => setActiveTab("requests")}
            className={`flex-1 rounded-[14px] transition-all
        ${
          activeTab === "requests"
            ? "bg-white text-textColor"
            : "text-textColor"
        }`}
          >
            Job Requests <span>(1)</span>
          </button>

          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 rounded-[14px] transition-all
        ${
          activeTab === "active" ? "bg-white text-textColor" : "text-textColor"
        }`}
          >
            Active Jobs <span>(1)</span>
          </button>

          <button
            onClick={() => setActiveTab("transactions")}
            className={`flex-1 rounded-[14px] transition-all
        ${
          activeTab === "transactions"
            ? "bg-white text-textColor"
            : "text-textColor"
        }`}
          >
            Transactions
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-[24px]">
          {/* REQUESTS TAB */}
          {activeTab === "requests" && (
            <div className="border rounded-[14px] p-4">
              <div className="flex justify-between">
                <div className="flex gap-[16px]">
                  <p className="w-[48px] h-[48px] rounded-[26px] bg-[#ECECF0] flex items-center justify-center text-[16px] font-normal">
                    D
                  </p>
                  <div>
                    <p className="text-[18px] font-semibold text-textColor mb-[8px]">
                      Plumbing - Bathroom Renovation
                    </p>
                    <p className="text-[14px] font-normal text-textGray mb-[8px]">
                      David Brown
                    </p>
                    <div className="flex items-center text-[14px] font-normal text-textGray mb-[8px]">
                      <LuCalendar />
                      <p>
                        <span>15/01/2026</span> at <span>09:00</span>
                      </p>
                    </div>
                    <p className="text-[14px] font-normal text-textColor mb-[8px]">
                      Ikeja, Lagos
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-[12px]">
                  <p className="text-[18px] font-semibold text-textColor">
                    ₦45,000
                  </p>

                  <div className="flex gap-[8px]">
                    <button
                      onClick={() => setRequestStatus("declined")}
                      className="flex items-center justify-center px-[10px] py-[6px] border rounded-[8px] font-medium gap-[8px] text-textColor"
                    >
                      <IoCloseCircleOutline />
                      Decline
                    </button>

                    <button
                      onClick={() => setRequestStatus("accepted")}
                      className="flex items-center justify-center px-[10px] py-[6px] border rounded-[8px] font-medium gap-[8px] text-white bg-black"
                    >
                      <LuCircleCheckBig />
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE TAB */}
          {activeTab === "active" && (
            <div className="border rounded-[14px] p-4">
              
              <div className="flex justify-between">
                
                <div className="flex gap-[16px]">
                  
                  <p className="w-[48px] h-[48px] rounded-[26px] bg-[#ECECF0] flex items-center justify-center text-[16px] font-normal">
                    
                    S
                  </p>
                  <div>
                    
                    <p className="text-[18px] font-semibold text-textColor mb-[2px]">
                      
                      Plumbing - Kitchen Sink Repair
                    </p>
                    <p className="text-[14px] font-normal text-textGray mb-[2px]">
                      
                      Sarah Johnson
                    </p>
                    <div className="flex items-center text-[14px] font-normal text-textGray mb-[2px]">
                      
                    </div>
                    <p className="text-[14px] font-normal text-textColor mb-[2px]">
                      
                      Lekki, Lagos
                    </p>
                  </div>
                </div>
                <div>
                  
                  <div className="flex flex-col items-end gap-[12px]">
                    
                    <button className="w-[95px] h-[22px] rounded-[8px] bg-[#AD46FF] text-[12px] font-medium flex items-center justify-center text-white">
                      
                      ON THE-WAY
                    </button>
                  </div>
                  <div className="flex flex-col items-end">
                    
                    <p className="font-medium text-[16px] text-textColor">
                      
                      ₦18,000
                    </p>
                    <button className="flex items-center justify-center px-[10px] py-[6px] border rounded-[8px] w-[118px] h-[32px] font-medium text-[14px] text-white bg-black">
                      
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TRANSACTIONS TAB */}
          {activeTab === "transactions" && (
            <div className="space-y-4">
              {/* Transaction 1 */}
              <div className="border rounded-[14px] p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-[16px] font-medium text-textColor mb-[2px]">
                      Payment from Sarah Johnson - Socket Installation
                    </p>
                    <p className="text-[14px] text-textGray">08/01/2026</p>
                  </div>

                  <div className="flex flex-col items-end">
                    <p className="font-semibold text-[18px] text-[#00A63E]">
                      +₦<span>20,000</span>
                    </p>
                    <button className="mt-[6px] px-[10px] py-[6px] rounded-[8px] text-[12px] bg-black text-white">
                      Completed
                    </button>
                  </div>
                </div>
              </div>

              {/* Transaction 2 */}
              <div className="border rounded-[14px] p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-[16px] font-medium text-textColor mb-[2px]">
                      Platform Commission (10%)
                    </p>
                    <p className="text-[14px] text-textGray">08/01/2026</p>
                  </div>

                  <div className="flex flex-col items-end">
                    <p className="font-semibold text-[18px] text-[#E7000B]">
                      +₦<span>2,000</span> 
                    </p>
                    <button className="mt-[6px] px-[10px] py-[6px] rounded-[8px] text-[12px] bg-black text-white">
                      Completed
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;

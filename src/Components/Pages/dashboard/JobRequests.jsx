import React, { useState } from "react";
import {
  LuCalendar,
  LuMapPin,
  LuClock4,
  LuDollarSign,
  LuCircleCheckBig,
  LuCircleX,
  LuEye,
} from "react-icons/lu";

const JobRequests = () => {
  const [requestTab, setRequestTab] = useState("new");

  return (
    <main className="pt-[85px]">
      {/* Section 1 */}
      <div>
        <h2>Job Requests</h2>
        <p>Review and respond to incoming job requests</p>
      </div>

      {/* Section 2 */}
      <div>
        <div className="flex gap-[10px] w-[353px] h-[36px] bg-[#ECECF0] rounded-[14px] text-[14px] font-medium p-[4px]">
          <button
            onClick={() => setRequestTab("new")}
            className={`flex items-center justify-center gap-[20px] flex-1 rounded-[14px] transition-all ${
              requestTab === "new"
                ? "bg-white text-textColor"
                : "text-textColor"
            }`}
          >
            <span>New Requests</span>
            <span className="w-[25px] h-[22px] bg-black text-white rounded-[8px] flex items-center justify-center text-[12px]">
              1
            </span>
          </button>

          <button
            onClick={() => setRequestTab("responded")}
            className={`flex-1 rounded-[14px] transition-all ${
              requestTab === "responded"
                ? "bg-white text-textColor"
                : "text-textColor"
            }`}
          >
            Responded
          </button>
        </div>

        {/* Conditional Content */}
        <div className="mt-4">
          {requestTab === "new" && (
            <div>
              {/* Card 1 */}
              <div className="border p-4 rounded-lg">
                <div>
                  <div className="flex justify-between">
                    <div className="profile flex gap-[16px]">
                      <div className="">
                        <img
                          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352177/Primitive.img_rd3rwi.png"
                          alt="Profile Pic"
                          className="w-[48px] h-[48px] rounded-[24px]"
                        />
                      </div>
                      <div>
                        <p className="text-[18px] font-semibold text-textColor">
                          David Brown
                        </p>
                        <p className="text-[14px] font-normal text-textGray">
                          Client
                        </p>
                      </div>
                    </div>
                    {/* Botton */}
                    <button className="w-[94px] h-[22px] bg-[#F0B100] text-white text-[12px] font-medium rounded-[8px] items-center justify-center">
                      New Request
                    </button>
                  </div>
                </div>
                {/* step 2 */}
                <p className="mt-[41px]">Plumbing - Bathroom Renovation</p>
                <div className="flex">
                  <div className="left mt-[12px] w-[519px] gap-[10px]">
                    <div className="flex items-center gap-[10px] text-[14px]">
                      <LuCalendar
                        className="text-textGray
"
                      />
                      <p className="text-textColor">Thu, Jan 15</p>
                    </div>
                    <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                      <LuMapPin
                        className="text-textGray
"
                      />

                      <p className="text-textColor">Ikeja, Lagos</p>
                    </div>
                    <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                      <LuClock4
                        className="text-textGray
"
                      />

                      <p className="text-textColor">Requested 05:45 PM</p>
                    </div>
                  </div>
                  <div className="right w-[519px]">
                    <div className="flex items-center gap-[10px] text-[14px]">
                      <LuClock4
                        className="text-textGray
"
                      />
                      <p className="text-textColor">09:00pm</p>
                    </div>
                    <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                      <LuDollarSign
                        className="text-textGray
"
                      />

                      <p className="text-textColor">
                        ₦<span>45,000</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="buttons mt-[25px] flex gap-[10px]">
                  <button className="bg-black text-white text-[14px] font-medium w-[480px] h-[40px] flex items-center justify-center rounded-[8px] gap-[10px]">
                    <LuCircleCheckBig />
                    <span>Accept Job</span>
                  </button>
                  <button className="border  text-textColor text-[14px] font-medium w-[480px] h-[40px] flex items-center justify-center rounded-[8px] gap-[10px]">
                    <LuCircleX />
                    <span>Decline</span>
                  </button>
                  <button className="w-[50px] h-[40px] rounded-[8px] flex items-center justify-center border  text-textColor text-[14px] font-medium ">
                    <LuEye />
                  </button>
                </div>
              </div>
              {/* Card 2 */}
              <div className="border p-4 rounded-lg mt-[16px]">
                <div>
                  <div className="flex justify-between">
                    <div className="profile flex gap-[16px]">
                      <div className="">
                        <img
                          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352175/Primitive.img_1_hblo6a.png"
                          alt="Profile Pic"
                          className="w-[48px] h-[48px] rounded-[24px]"
                        />
                      </div>
                      <div>
                        <p className="text-[18px] font-semibold text-textColor">
                          Michael Okonkwo
                        </p>
                        <p className="text-[14px] font-normal text-textGray">
                          Client
                        </p>
                      </div>
                    </div>
                    {/* Botton */}
                    <button className="w-[94px] h-[22px] bg-[#F0B100] text-white text-[12px] font-medium rounded-[8px] items-center justify-center">
                      New Request
                    </button>
                  </div>
                </div>
                {/* step 2 */}
                <p className="mt-[41px]">Plumbing - Water Heater Installation</p>
                <p className="text-[14px] text-textGray font-normal">Need to install a new water heater in the bathroom. The old one stopped working.</p>
                <div className="flex">
                  <div className="left mt-[12px] w-[519px] gap-[10px]">
                    <div className="flex items-center gap-[10px] text-[14px]">
                      <LuCalendar
                        className="text-textGray
"
                      />
                      <p className="text-textColor">Fri, Jan 16</p>
                    </div>
                    <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                      <LuMapPin
                        className="text-textGray
"
                      />

                      <p className="text-textColor">Ikoyi, Lagos</p>
                    </div>
                    <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                      <LuClock4
                        className="text-textGray
"
                      />

                      <p className="text-textColor">Requested <span>09:30</span>PM</p>
                    </div>
                  </div>
                  <div className="right w-[519px]">
                    <div className="flex items-center gap-[10px] text-[14px]">
                      <LuClock4
                        className="text-textGray
"
                      />
                      <p className="text-textColor">11:00pm</p>
                    </div>
                    <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                      <LuDollarSign
                        className="text-textGray
"
                      />

                      <p className="text-textColor">
                        ₦<span>35,000</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="buttons mt-[25px] flex gap-[10px]">
                  <button className="bg-black text-white text-[14px] font-medium w-[480px] h-[40px] flex items-center justify-center rounded-[8px] gap-[10px]">
                    <LuCircleCheckBig />
                    <span>Accept Job</span>
                  </button>
                  <button className="border  text-textColor text-[14px] font-medium w-[480px] h-[40px] flex items-center justify-center rounded-[8px] gap-[10px]">
                    <LuCircleX />
                    <span>Decline</span>
                  </button>
                  <button className="w-[50px] h-[40px] rounded-[8px] flex items-center justify-center border  text-textColor text-[14px] font-medium ">
                    <LuEye />
                  </button>
                </div>
              </div>
              {/* Card 3 */}
              <div className="border p-4 rounded-lg mt-[16px]">
                <div>
                  <div className="flex justify-between">
                    <div className="profile flex gap-[16px]">
                      <div className="">
                        <img
                          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352175/Primitive.img_1_hblo6a.png"
                          alt="Profile Pic"
                          className="w-[48px] h-[48px] rounded-[24px]"
                        />
                      </div>
                      <div>
                        <p className="text-[18px] font-semibold text-textColor">
                          Fatima Bello
                        </p>
                        <p className="text-[14px] font-normal text-textGray">
                          Client
                        </p>
                      </div>
                    </div>
                    {/* Botton */}
                    <button className="w-[94px] h-[22px] bg-[#F0B100] text-white text-[12px] font-medium rounded-[8px] items-center justify-center">
                      New Request
                    </button>
                  </div>
                </div>
                {/* step 2 */}
                <p className="mt-[41px]">Plumbing - Leak Repair</p>
                <p className="text-[14px] text-textGray font-normal">Leaking pipe under the kitchen sink needs urgent repair.</p>
                <div className="flex">
                  <div className="left mt-[12px] w-[519px] gap-[10px]">
                    <div className="flex items-center gap-[10px] text-[14px]">
                      <LuCalendar
                        className="text-textGray
"
                      />
                      <p className="text-textColor">Wed, Jan 14</p>
                    </div>
                    <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                      <LuMapPin
                        className="text-textGray
"
                      />

                      <p className="text-textColor">Surulere, Lagos</p>
                    </div>
                    <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                      <LuClock4
                        className="text-textGray
"
                      />

                      <p className="text-textColor">Requested <span>11:15</span>AM</p>
                    </div>
                  </div>
                  <div className="right w-[519px]">
                    <div className="flex items-center gap-[10px] text-[14px]">
                      <LuClock4
                        className="text-textGray
"
                      />
                      <p className="text-textColor">15:00</p>
                    </div>
                    <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                      <LuDollarSign
                        className="text-textGray
"
                      />

                      <p className="text-textColor">
                        ₦<span>15,000</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="buttons mt-[25px] flex gap-[10px]">
                  <button className="bg-black text-white text-[14px] font-medium w-[480px] h-[40px] flex items-center justify-center rounded-[8px] gap-[10px]">
                    <LuCircleCheckBig />
                    <span>Accept Job</span>
                  </button>
                  <button className="border  text-textColor text-[14px] font-medium w-[480px] h-[40px] flex items-center justify-center rounded-[8px] gap-[10px]">
                    <LuCircleX />
                    <span>Decline</span>
                  </button>
                  <button className="w-[50px] h-[40px] rounded-[8px] flex items-center justify-center border  text-textColor text-[14px] font-medium ">
                    <LuEye />
                  </button>
                </div>
              </div>

              {/* <div className="border p-4 rounded-lg">
              This is the New Requests content
            </div> */}
            </div>
          )}

          {requestTab === "responded" && (
            <div>
              {/* Card 1 */}
              <div className="border p-4 rounded-lg">
                <div>
                  <div className="flex justify-between">
                    <div className="profile flex gap-[16px]">
                      <div className="">
                        <img
                          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352177/Primitive.img_rd3rwi.png"
                          alt="Profile Pic"
                          className="w-[48px] h-[48px] rounded-[24px]"
                        />
                      </div>
                      <div>
                        <p className="text-[18px] font-semibold text-textColor">
                          David Brown
                        </p>
                        <p className="text-[14px] font-normal text-textGray">
                          Client
                        </p>
                      </div>
                    </div>
                    {/* Botton */}
                    <button className="w-[94px] h-[22px] bg-[#00C950] text-white text-[12px] font-medium rounded-[8px] items-center justify-center">
                      Accepted
                    </button>
                  </div>
                </div>
                {/* step 2 */}
                <p className="mt-[41px]">Plumbing - Bathroom Renovation</p>
                <div className="flex">
                  <div className="left mt-[12px] w-[519px] gap-[10px]">
                    <div className="flex items-center gap-[10px] text-[14px]">
                      <LuCalendar
                        className="text-textGray
"
                      />
                      <p className="text-textColor">Thu, Jan 15</p>
                    </div>
                    <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                      <LuMapPin
                        className="text-textGray
"
                      />

                      <p className="text-textColor">Ikeja, Lagos</p>
                    </div>
                    <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                      <LuClock4
                        className="text-textGray
"
                      />

                      <p className="text-textColor">Accepted <span>05:45</span>PM</p>
                    </div>
                  </div>
                  <div className="right w-[519px]">
                    <div className="flex items-center gap-[10px] text-[14px]">
                      <LuClock4
                        className="text-textGray
"
                      />
                      <p className="text-textColor">09:00pm</p>
                    </div>
                    <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                      <LuDollarSign
                        className="text-textGray
"
                      />

                      <p className="text-textColor">
                        ₦<span>45,000</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="buttons mt-[25px] flex items-center pl-[18px] bg-[#F0FDF4] rounded-[10px] text-[#016630] text-[14px] font-normal gap-[10px] w-full h-[54px] border border-[#B9F8CF]">
                  <LuCircleCheckBig />
                  <p>You've accepted this job. The client has been notified and this job is now in your Active Jobs.</p>
                </div>
              </div> 
              {/* Card 2 */}
              <div className="border p-4 rounded-lg mt-[16px]">
                <div>
                  <div className="flex justify-between">
                    <div className="profile flex gap-[16px]">
                      <div className="">
                        <img
                          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352175/Primitive.img_1_hblo6a.png"
                          alt="Profile Pic"
                          className="w-[48px] h-[48px] rounded-[24px]"
                        />
                      </div>
                      <div>
                        <p className="text-[18px] font-semibold text-textColor">
                          Michael Okonkwo
                        </p>
                        <p className="text-[14px] font-normal text-textGray">
                          Client
                        </p>
                      </div>
                    </div>
                    {/* Botton */}
                    <button className="w-[94px] h-[22px] bg-[#FB2C36] text-white text-[12px] font-medium rounded-[8px] items-center justify-center">
                      Declined 
                    </button>
                  </div>
                </div>
                {/* step 2 */}
                <p className="mt-[41px]">Plumbing - Water Heater Installation</p>
                <p className="text-[14px] text-textGray font-normal">Need to install a new water heater in the bathroom. The old one stopped working.</p>
                <div className="flex">
                  <div className="left mt-[12px] w-[519px] gap-[10px]">
                    <div className="flex items-center gap-[10px] text-[14px]">
                      <LuCalendar
                        className="text-textGray
"
                      />
                      <p className="text-textColor">Fri, Jan 16</p>
                    </div>
                    <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                      <LuMapPin
                        className="text-textGray
"
                      />

                      <p className="text-textColor">Ikoyi, Lagos</p>
                    </div>
                    <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                      <LuClock4
                        className="text-textGray
"
                      />

                      <p className="text-textColor">Requested <span>09:30</span>PM</p>
                    </div>
                  </div>
                  <div className="right w-[519px]">
                    <div className="flex items-center gap-[10px] text-[14px]">
                      <LuClock4
                        className="text-textGray
"
                      />
                      <p className="text-textColor">11:00pm</p>
                    </div>
                    <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                      <LuDollarSign
                        className="text-textGray
"
                      />

                      <p className="text-textColor">
                        ₦<span>35,000</span>
                      </p>
                    </div>
                  </div>
                </div>
                 <div className="buttons mt-[25px] flex items-center pl-[18px] bg-[#FEF2F2] rounded-[10px] text-[#9F0712] text-[14px] font-normal gap-[10px] w-full h-[54px] border border-[#FFC9C9]">
                  <LuCircleX />
                  <p>You've declined this job. The client has been notified.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default JobRequests;

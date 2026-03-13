import React from "react";
import {
  LuMessageCircle,
  LuMapPin,
  LuClock4,
  LuCircleCheckBig,
} from "react-icons/lu";
import { IoCallOutline } from "react-icons/io5";
import { TiLocationArrowOutline } from "react-icons/ti";

const ActiveJobs = () => {
  return (
    <>
      <main className="pt-[85px]">
        <div>
          {/* Section 1 */}
          <div className="text-[16px] text-textGray font-normal">
            <p>
              <span>2</span> active
            </p>
            <p>jobs</p>
          </div>

          {/* Section 2 */}
          <div>
            {/* Card 1 */}
            <div className="border p-4 rounded-lg">
              <div>
                <div className="flex justify-between">
                  <div className="profile flex gap-[16px]">
                    <div className="">
                      <img
                        src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771441211/Primitive.img_3_qcvm8i.png"
                        className="w-[48px] h-[48px] rounded-[24px]"
                      />
                    </div>
                    <div>
                      <p className="text-[18px] font-semibold text-textColor">
                        Sarah Johnson
                      </p>
                      <p className="text-[14px] font-normal text-textGray">
                        Client
                      </p>
                    </div>
                  </div>
                  {/* Botton */}
                  <button className="w-[94px] h-[22px] bg-[#F0B100] text-white text-[12px] font-medium rounded-[8px] items-center justify-center">
                    On The Way
                  </button>
                </div>
              </div>
              {/* step 2 */}
              <p className="mt-[41px]">Plumbing - Kitchen Sink Repair</p>
              <div className="flex">
                <div className="left mt-[5px] w-[519px] gap-[10px]">
                  <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                    <LuMapPin
                      className="text-textGray
          "
                    />

                    <p className="text-textColor">Lekki, Lagos</p>
                  </div>
                </div>
                <div className="right w-[519px]">
                  <div className="flex items-center gap-[10px] text-[14px]">
                    <LuClock4
                      className="text-textGray
          "
                    />
                    <p className="text-textColor">14:00</p>
                  </div>
                </div>
              </div>

              {/* ETA: 15 mins */}
              <div className="text-[#1447E6] border border-[#BEDBFF] bg-[#EFF6FF] w-full h-[46px] flex gap-[10px] rounded-[10px] items-center pl-[10px] mt-[15px] text-[14px] font-medium">
                <TiLocationArrowOutline />
                <p>ETA: 15 mins</p>
              </div>

              <div className="flex justify-between border-t mt-[10px] pt-[5px]">
                <p className="text-[18px] text-textColor font-semibold">
                  ₦<span>18,000</span>
                </p>
                <div className="buttons  flex gap-[10px]">
                  <button className="text-[14px] font-medium flex items-center justify-center rounded-[8px] gap-[10px] w-[76px] border ">
                    <IoCallOutline />
                    <p>Call</p>
                  </button>
                  <button className="text-[14px] font-medium flex items-center justify-center rounded-[8px] gap-[10px] w-[111px] border ">
                    <LuMessageCircle />
                    <p>Message</p>
                  </button>
                  <button className="bg-black text-white text-[14px] font-medium w-[110px] h-[40px] flex items-center justify-center rounded-[8px] gap-[10px]">
                    <LuCircleCheckBig />
                    <span>Start Job</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="border p-4 rounded-lg mt-[16px]">
              <div>
                <div className="flex justify-between">
                  <div className="profile flex gap-[16px]">
                    <div className="">
                      <img
                        src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771441211/Primitive.img_3_qcvm8i.png"
                        className="w-[48px] h-[48px] rounded-[24px]"
                      />
                    </div>
                    <div>
                      <p className="text-[18px] font-semibold text-textColor">
                        Chioma Nwosu
                      </p>
                      <p className="text-[14px] font-normal text-textGray">
                        Client
                      </p>
                    </div>
                  </div>
                  {/* Botton */}
                  <button className="w-[94px] h-[22px] bg-[#00C950] text-white text-[12px] font-medium rounded-[8px] items-center justify-center">
                    In Progress
                  </button>
                </div>
              </div>
              {/* step 2 */}
              <p className="mt-[41px]">Plumbing - Bathroom Faucet Replacement</p>
              <div className="flex">
                <div className="left mt-[5px] w-[519px] gap-[10px]">
                  <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                    <LuMapPin
                      className="text-textGray
          "
                    />

                    <p className="text-textColor">Yaba, Lagos</p>
                  </div>
                </div>
                <div className="right w-[519px]">
                  <div className="flex items-center gap-[10px] text-[14px]">
                    <LuClock4
                      className="text-textGray
          "
                    />
                    <p className="text-textColor">10:00</p>
                  </div>
                </div>
              </div>

              {/* Job Progress */}
<div>
  <div className="text-textColor w-full  flex justify-between mt-[15px] text-[14px] font-medium">
    <p>Job Progress</p>
    <p>60%</p>
  </div>

  <div className="w-full h-[8px] bg-textGray rounded-full overflow-hidden">
    <div className="h-full bg-black rounded-full" style={{ width: "60%" }}></div>
  </div>
</div>

{/* Job Ends */}
              <div className="flex justify-between border-t mt-[10px] pt-[5px]">
                <p className="text-[18px] text-textColor font-semibold">
                  ₦<span>12,000</span>
                </p>
                <div className="buttons  flex gap-[10px]">
                  <button className="text-[14px] font-medium flex items-center justify-center rounded-[8px] gap-[10px] w-[76px] border ">
                    <IoCallOutline />
                    <p>Call</p>
                  </button>
                  <button className="text-[14px] font-medium flex items-center justify-center rounded-[8px] gap-[10px] w-[111px] border ">
                    <LuMessageCircle />
                    <p>Message</p>
                  </button>
                  <button className="bg-black text-white text-[14px] font-medium w-[141px] h-[40px] flex items-center justify-center rounded-[8px] gap-[10px]">
                    <LuCircleCheckBig />
                    <span>Complete Job</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Card Stop */}
          </div>
          
        </div>
      </main>
    </>
  );
};

export default ActiveJobs;

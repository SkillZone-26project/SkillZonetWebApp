import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

const TotalSpent = () => {
  return (
    <main className="relative mt-[15px]">

      {/* Card 2 */}
      <div className="absolute top-[70px] right-0 flex items-start sm:items-center w-full sm:w-[356px] border px-[14px] py-[17px] bg-white rounded-[10px] gap-2 shadow-sm">

        <div className="flex items-center justify-center">
          <IoCheckmarkCircle className="text-green-500 text-[20px]" />
        </div>

        <div>
          <p className="text-[13px] font-medium text-[#0A0A0A]">
            Welcome to SkillZonet!
          </p>

          <p className="text-[12px] font-normal text-[#0D0D0D] sm:w-[250px]">
            Your account has been created successfully. Start finding trusted artisans!
          </p>
        </div>
      </div>

      {/* Card 1 */}
      <div className="border rounded-[14px] flex justify-center items-center py-[32px]">
        <div>
          <p className="text-[22px] sm:text-[24px] font-semibold text-center">
            ₦<span>245,000</span>
          </p>

          <p className="mt-[15px] mb-[24px] text-[14px] font-normal text-[#717182] text-center">
            Total Spent
          </p>
        </div>
      </div>

    </main>
  );
};

export default TotalSpent;
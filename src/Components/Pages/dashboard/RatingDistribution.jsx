import React from "react";
import { FaStar } from "react-icons/fa6";

const RatingDistribution = () => {
  const ratingsData = [
    { star: 5, count: 98 },
    { star: 4, count: 20 },
    { star: 3, count: 6 },
    { star: 2, count: 2 },
    { star: 1, count: 1 },
  ];

  const total = ratingsData.reduce((sum, item) => sum + item.count, 0);

  return (
    <section className="mt-[24px]">
      <div className="border rounded-[14px] w-full p-[24px]">
        <p className="mb-[40px] text-[18px] font-semibold">
          Rating Distribution
        </p>

        {ratingsData.map((item) => {
          const percentage = (item.count / total) * 100;

          return (
            <div
              key={item.star}
              className="flex items-center w-full gap-[40px] mb-[12px]"
            >
              {/* Rating */}
              <div className="flex items-center gap-[2px] text-[14px] font-medium">
                <span>{item.star}</span>
                <FaStar className="text-[#FDC700]" />
              </div>

             <div  className="flex items-center w-full gap-[30px]">
                 {/* Progress Bar */}
              <div className="flex-1">
                <div className="w-full h-[8px] bg-[#b8b8be] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-textColor "
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Count */}
              <div className="font-normal text-[#b8b8be] text-[14px] ">
                <p>{item.count}</p>
              </div>
            </div>
             </div>
          );
        })}
      </div>
    </section>
  );
};

export default RatingDistribution;
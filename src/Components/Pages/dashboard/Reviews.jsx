import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaStar, FaArrowTrendUp  } from "react-icons/fa6"; 
import { MdChatBubbleOutline } from "react-icons/md";
import RatingDistribution from "../../Pages/dashboard/RatingDistribution"
import CustomerReviews from "../../Pages/dashboard/CustomerReviews"

const Overview = () => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div>
         <section>
           {/* up page */}
     <div className="pt-[85px] flex items-center justify-between">
     <div>
      <p className="text-[24px] font-semibold">Reviews & Ratings</p>
       
      <p className="text-[#717182] text-[16px] font-normal"><span>127</span> total reviews</p>
     </div>
    <div className="relative">
      
      {/* Input + Arrow */}
      <div className='flex items-center w-[160px] h-[36px] pl-[10px] text-[#717182] bg-[#F3F3F5] rounded-[8px]'>
        
        <div>
          <input
            type="text"
            value="Most Recent"
            readOnly
            className="bg-transparent text-black w-[120px] outline-none"
          />
        </div>

        <IoIosArrowDown
          onClick={() => setShowOptions(!showOptions)}
          className='hover:cursor-pointer text-textGray'
        />
      </div>

      {/* Dropdown Options */}
      {showOptions && (
        <div className="absolute top-[40px] w-[160px] bg-white shadow-md rounded-[8px] z-10">
          <p className="p-2 hover:bg-gray-100 cursor-pointer">Most Recent</p>
          <p className="p-2 hover:bg-gray-100 cursor-pointer">Oldest</p>
          <p className="p-2 hover:bg-gray-100 cursor-pointer">Top Reviews</p>
        </div>
      )}

    </div>
    </div>
          </section>

          <section className="mt-[20px] flex gap-[10px]">
            {/* Card 1 Section */}
            <div className="border rounded-[8px] w-full max-w-[347px] pl-[24px] pt-[36px] pb-[24px]" >
              <div className="flex items-center gap-[10px]">

{/* <div className="w-[34px] h-[28px]"><FaStar className="text-[40px] text-[#FDC700]"/></div> */}
<FaStar className="text-[40px] text-[#FDC700]"/>
                <div>
                  <p className="text-textColor text-[24px] font-bold">4.8</p>
                  <p className="text-textGray text-[14px] font-normal">Average Rating</p>
                </div>
              </div>
              <div className="text-[#FDC700] font-semibold mt-[40px]"><p>Based on 127 reviews</p></div>
            </div>

            {/* Card 2 Section */}
            <div className="border rounded-[8px] w-full max-w-[347px] pl-[24px] pt-[36px] pb-[24px]" >
              <div className="flex items-center gap-[10px]">


<div className="w-[34px] h-[28px] bg-[#DCFCE7] rounded-[4px] flex items-center justify-center"><FaArrowTrendUp  className="text-[18px] text-[#00A63E]"/></div>
{/* <FaStar className="text-[40px] text-[#FDC700]"/> */}
                <div>
                  <p className="text-textColor text-[24px] font-bold">90<span>%</span></p>
                  <p className="text-textGray text-[14px] font-normal">Positive Reviews</p>
                </div>
              </div>
              <div className="text-[#00A63E] mt-[40px]"><p>+<span>5</span>% from last month</p></div>
            </div>

            {/* Card 3 Section */}
            <div className="border rounded-[8px] w-full max-w-[347px] pl-[24px] pt-[36px] pb-[24px]" >
              <div className="flex items-center gap-[10px]">

<div className="w-[34px] h-[28px] bg-[#DBEAFE] rounded-[4px] flex items-center justify-center"><MdChatBubbleOutline className="text-[18px] text-[#155DFC]"/></div>
{/* <FaStar className="text-[40px] text-[#FDC700]"/> */}
                <div>
                  <p className="text-textColor text-[24px] font-bold">85<span>%</span></p>
                  <p className="text-textGray text-[14px] font-normal">Response Rate</p>
                </div>
              </div>
              <div className="text-[#155DFC] mt-[40px]"><p>Keep engaging with reviews!</p></div>
            </div>
          </section>

          <RatingDistribution />
          <CustomerReviews />
    </div>
  );
};

export default Overview;

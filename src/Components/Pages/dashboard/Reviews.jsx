import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Overview = () => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div>
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
    </div>
  );
};

export default Overview;

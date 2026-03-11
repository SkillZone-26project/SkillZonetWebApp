import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuSlidersHorizontal, LuArrowRight } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import AvailableArtisans from "../../UserPages/Userdashboard/AvailableArtisans";

const UserFindArtisans = () => {
  return (
    <main className="pt-[85px] px-4">

      {/* Search Bar section */}
      <section className="flex flex-col sm:flex-row items-center gap-[8px]">

        <div className="w-full flex items-center justify-between max-w-[1060px] px-[10px] py-[9px] rounded-[8px] bg-[#F3F3F5]">

          <input
            type="text"
            placeholder="Select skills (e.g., plumber, electrician)"
            className="bg-transparent w-full text-[14px] outline-none"
          />

          <button className="text-[18px]">
            <MdKeyboardArrowDown />
          </button>

        </div>

        <button className="w-[36px] h-[36px] rounded-[8px] border flex items-center justify-center">
          <LuSlidersHorizontal className="text-[18px]" />
        </button>

      </section>


      {/* Search Bar down */}
      <section className="flex flex-col sm:flex-row items-center gap-[10px] mt-[16px]">

        <div className="w-full flex items-center gap-[5px] max-w-[750px] px-[10px] py-[9px] rounded-[8px] bg-[#F3F3F5]">

          <button className="text-[18px]">
            <GrLocation />
          </button>

          <input
            type="text"
            placeholder="Enter your location"
            className="bg-transparent w-full text-[14px] outline-none"
          />

        </div>

        <button className="w-full sm:w-[200px] h-[36px] flex items-center gap-[10px] rounded-[8px] bg-black text-white justify-center">
          <p>Search</p>
          <LuArrowRight className="text-[18px]" />
        </button>

      </section>

      <AvailableArtisans />

    </main>
  );
};

export default UserFindArtisans;
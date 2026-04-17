import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoArrowForwardOutline } from "react-icons/io5";
import { LuCircleCheckBig } from "react-icons/lu";
import { AiOutlineAim } from "react-icons/ai";
import { IoChevronDown } from "react-icons/io5";

const Hero = () => {

  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [location, setLocation] = useState("");

  const services = {
    Plumbing: ["Pipe Fixing", "Drainage", "Installation", "Leak Repair", "Maintenance"],
    Electrical: ["Wiring", "Installation", "Repairs", "Generator Setup", "Maintenance"],
    Cleaning: ["Home Cleaning", "Office Cleaning", "Deep Cleaning", "Post-Construction", "Laundry"],
    Carpentry: ["Furniture Making", "Door Installation", "Repairs", "Cabinet Work", "Wood Polishing"],
    Painting: ["Interior Painting", "Exterior Painting", "Wall Design", "Spray Painting", "Maintenance"]
  };

  return (
    <section className="pt-12 sm:pt-16 lg:pt-20 mt-12 sm:mt-16 lg:mt-[108px] overflow-x-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start px-4 md:px-6 gap-6">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col gap-4 flex-1 w-full">
          
          <button className="bg-black text-white text-[12px] rounded-[8px] w-[166px] h-[22px]">
            Trusted by 10,000+ Users
          </button>

          {/* HEADLINE */}
          <h1 className="text-[20px] sm:text-[40px] lg:text-[50px] font-bold leading-[1]">
            <span>Find Trusted Artisans</span>
            <span className="flex">Near You</span>
          </h1>

{/* SEARCH AREA */}
<div className="flex flex-col md:flex-row items-stretch mt-6 w-full relative">

  {/* SELECT SERVICE FIELD */}
  <div className="relative w-full md:w-[128px]">
    <div
      onClick={() => setOpenDropdown(!openDropdown)}
      className="flex items-center justify-between border border-black md:rounded-l-[8px] rounded-t-[8px] md:rounded-t-none px-4 py-2 cursor-pointer bg-white"
    >
      <span className="text-sm text-black">
        {selectedService || "Skill"}
      </span>
      <IoChevronDown className="text-black" />
    </div>

    {/* SIDE DROPDOWN */}
    {openDropdown && (
      <div className="absolute top-full left-0 mt-2 flex bg-white shadow-lg z-50 w-full md:w-auto">

        {/* LEFT SIDE - SKILLS */}
        <div className="w-1/2 md:w-40 border-r border-gray-200">
          {Object.keys(services).map((skill) => (
            <div
              key={skill}
              onMouseEnter={() => setActiveSkill(skill)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                activeSkill === skill ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              {skill}
            </div>
          ))}
        </div>

        {/* RIGHT SIDE - SUBCATEGORIES */}
        <div className="w-1/2 md:w-56">
          {activeSkill &&
            services[activeSkill].map((sub, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedService(sub);
                  setOpenDropdown(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {sub}
              </div>
            ))}
        </div>

      </div>
    )}
  </div>

  {/* LOCATION INPUT */}
  <div className="w-full flex items-center flex-1 border border-black px-4 py-2">
    <CiSearch className="text-lg text-black mr-2" />
    <input
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      placeholder="Search location"
      className="outline-none text-sm bg-transparent w-full"
    />
  </div>

  {/* AIM BUTTON */}
  <button className="border border-black px-4 flex items-center justify-center h-[44px] md:h-auto">
    <AiOutlineAim />
  </button>

  {/* SEARCH BUTTON */}
  <button className="flex items-center justify-center bg-black text-white px-6 py-2 md:rounded-r-[8px] rounded-b-[8px] md:rounded-b-none hover:bg-gray-800 transition-colors text-[14px] w-full md:w-auto">
    <span>Search Artisans</span>
    <IoArrowForwardOutline className="ml-2 text-lg" />
  </button>

</div>

          {/* FEATURES */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-[14px] mt-4">
            <div className="flex items-center gap-2">
              <LuCircleCheckBig className="text-[#00C950] text-xl" />
              <span className="text-black font-medium">
                Verified Professionals
              </span>
            </div>

            <div className="flex items-center gap-2">
              <LuCircleCheckBig className="text-[#00C950] text-xl" />
              <span className="text-black font-medium">
                Secure Payment
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT (UNCHANGED) */}
        <div className="flex flex-col items-center md:flex-row gap-6 mt-6 md:mt-0 md:items-end w-full lg:w-auto">
          
          <div className="flex flex-col items-start border border-gray-200 rounded-[14px] overflow-hidden w-full sm:w-[292px] h-[362px] p-[16px] bg-white">
            <img
              src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1770420324/LandingPage_aqguza.png"
              alt="Plumbing Service"
              className="w-full h-[192px] object-cover"
            />
            <div className="flex items-center gap-1 mt-[36px]">
              <span className="text-[#FDC700] text-lg">★</span>
              <span className="font-medium text-textColour text-[14px]">4.9</span>
              <span className="font-medium text-textColour text-[14px]">Rating</span>
            </div>
            <p className="pb-4 pt-[36px] font-semibold text-textGray">
              Plumbing Services
            </p>
          </div>

          <div className="flex flex-col items-start border border-gray-200 rounded-[14px] overflow-hidden w-full sm:w-[292px] h-[330px] p-[16px] bg-white">
            <img
              src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1770420324/LandingPage_1_vtrxai.png"
              alt="Electrical Service"
              className="w-full h-[192px] object-cover"
            />
            <div className="flex items-center gap-1 mt-[36px]">
              <span className="text-[#FDC700] text-lg">★</span>
              <span className="font-medium text-textColour text-[14px]">4.8</span>
              <span className="font-medium text-textColour text-[14px]">Rating</span>
            </div>
            <p className="pt-[36px] pb-[15px] font-semibold text-textGray">
              Electrical Work
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
import { React, useState } from "react";
import { useParams, useNavigate,  } from "react-router-dom";
import { LuArrowLeft, LuHeart, LuCalendar, LuMessageCircle, LuPhone, LuClock4   } from "react-icons/lu";
import { TbRosetteFilled } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";

const ArtisanProfile = () => {
  const { id } = useParams();
const navigate = useNavigate();

const [activeTab, setActiveTab] = useState("requests");

  return (
    <main className="px-[16px]">

      {/* Header */}
     <header className="border-b w-full">
  <div className="flex items-center gap-[14px] w-full max-w-[854px] mx-auto py-[12px]">

    <button onClick={() => navigate(-1)}>
      <LuArrowLeft />
    </button>

    <p className="text-[18px] font-medium">Artisan Profile</p>
  </div>
</header>
      {/* Section 1 */}
      <section className="w-full max-w-[854px] mx-auto border rounded-[14px] mt-[24px] p-[16px] md:p-[24px]">

        {/* Top Card */}
        <div className="flex flex-col md:flex-row justify-between gap-[20px]">

          {/* Left Side */}
          <div className="flex flex-col sm:flex-row gap-[16px]">

            <img
              src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1772140352/Primitive.img_5_sqmsfy.png"
              alt=""
              className="w-[80px] h-[80px] rounded-[40px]"
            />

            {/* Details */}
            <div className="flex flex-col gap-[6px]">

              {/* Name */}
              <div className="flex items-center gap-[5px] text-[18px] font-semibold">
                <p className="text-textColor">
                  <span>John</span> <span>Mensah</span>
                </p>
                <TbRosetteFilled className="text-[#2B7FFF] text-[18px]" />
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-[5px] mt-[10px]">
                <button className="text-textColor text-[12px] font-medium rounded-[8px] py-[3px] bg-[#ECEEF2] px-[8.5px]">
                  Plumbing
                </button>

                <button className="text-textColor text-[12px] font-medium rounded-[8px] py-[3px] bg-[#ECEEF2] px-[8.5px]">
                  Pipe Fitting
                </button>

                <button className="text-white text-[12px] font-medium rounded-[8px] py-[3px] bg-[#FE9A00] px-[8.5px]">
                  Premium
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-[5px] mt-[6px]">
                <FaStar className="text-[#FDC700] text-[18px]" />
                <p>
                  4.8
                  <span className="text-textGray"> (127 reviews)</span>
                </p>
              </div>

              {/* Location */}
              <div className="flex flex-wrap items-center gap-[16px] mt-[6px] text-textGray text-[14px] font-normal">
                <div className="flex items-center gap-[5px]">
                  <GrLocation />
                  <p>Lagos, Nigeria</p>
                </div>

                <div className="flex items-center gap-[5px]">
                  <LuCalendar />
                  <p>
                    Joined <span>January 2023</span>
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="w-full text-[#717182] max-w-[656px] text-[14px] md:text-[16px] font-normal mt-[6px]">
                <p>
                  Professional plumber with 10+ years experience. Specializing
                  in residential and commercial plumbing.
                </p>
              </div>

            </div>
          </div>

          {/* Heart Icon */}
          <div className="self-start ">
            <LuHeart className="text-[20px]" />
          </div>
        </div>

        {/* Bottom Card */}
        <div className="border-t mt-[28px] pt-[20px]">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-[20px] w-full max-w-[600px] mx-auto">

            <div className="flex flex-col items-center">
              <p className="text-[24px] font-semibold text-textColor">342</p>
              <p className="text-[14px] font-normal text-textGray">
                Jobs Completed
              </p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-[24px] font-semibold text-textColor">
                ₦<span>20,000</span>
              </p>
              <p className="text-[14px] font-normal text-textGray">Rate</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-[24px] font-semibold text-textColor">
                <span>15</span>km
              </p>
              <p className="text-[14px] font-normal text-textGray">
                Coverage Radius
              </p>
            </div>

          </div>
        </div>
        
      </section>

{/* Button Section */}
<section className="w-full max-w-[854px] mx-auto mt-[24px] flex flex-col sm:flex-row gap-[12px]">

  <button className="flex items-center justify-center flex-1 bg-black text-white text-[14px] font-medium py-[14px] gap-[10px] rounded-[8px]">
    <LuCalendar />
    Book Now
  </button>

  <button className="flex items-center justify-center flex-1 bg-black text-white text-[14px] font-medium py-[14px] gap-[10px] rounded-[8px]">
    <LuMessageCircle />
    Send Message
  </button>

  <button className="flex items-center justify-center flex-1 bg-black text-white text-[14px] font-medium py-[14px] gap-[10px] rounded-[8px]">
    <LuPhone />
    Call
  </button>

</section>

 {/* Portfolio and Review */}
   <section className="w-full max-w-[854px] mx-auto mt-[24px] ">

        {/* Tabs */}
        <div className="flex gap-[10px] w-full  h-[38px] bg-[#ECECF0] rounded-[14px] text-[12px] font-medium p-[4px] overflow-x-auto">

          <button
            onClick={() => setActiveTab("requests")}
            className={`flex-1 rounded-[14px] ${
              activeTab === "requests" ? "bg-white text-textColor" : ""
            }`}
          >
            Portfolio
          </button>

          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 rounded-[14px] ${
              activeTab === "active" ? "bg-white text-textColor" : ""
            }`}
          >
            Reviews <span>(127)</span>
          </button>

        </div>

        {/* Tab Content */}
        <div className="mt-[24px]">

          {/* ACTIVE TAB */}
          {activeTab === "requests" && (
            <div>

              {/* CARD 1 */}
              <div className="border rounded-[14px] p-4">
      <p className="text-[18px] font-semibold text-textColor mt-[20px] mb-[30px]">Work Gallery</p>
      <div className="flex  gap-[16px]">
        <img src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1773600402/Container_4_kqat3x.png" alt="" className="w-[260px] rounded-[14px]"/>

        <img src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1773600402/Image_Portfolio_2_xsk52y.png" alt="" className="w-[260px] rounded-[14px]"/>

        <img src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1773600402/Image_Portfolio_3_xbwaev.png" alt=""  className="w-[260px] rounded-[14px]"/>
      </div>
              </div>

            </div>
          )}


        {/* COMPLETED TAB */}
{activeTab === "active" && (
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

  </div>
)}

        </div>
      </section>

      <p className="mt-[20px] text-[18px] text-center">
        Viewing Artisan ID: {id}
      </p>

    </main>
  );
};

export default ArtisanProfile;
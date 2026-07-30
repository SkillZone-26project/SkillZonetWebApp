import React from "react";
import { MdCircle } from "react-icons/md";
import { TbRosetteFilled } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { LuClock4 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

/*
=========================================================
DEFAULT ARTISANS

These are ONLY for the dashboard.

The landing page will set:
showDefault={false}

Therefore these will NOT appear there.
=========================================================
*/

const fallbackArtisans = [
  {
    id: 1,
    name: "John Mensah",
    image:
      "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1772140352/Primitive.img_5_sqmsfy.png",

    skill: "Plumbing",

    subSkills: [
      "Pipe Fitting",
      "Leak Repair",
      "Drainage",
      "Water Heater",
      "Bathroom Repair",
    ],

    premium: true,
    rating: 4.8,
    reviews: 127,
    distance: "2.3",
    status: "Available",
    price: "20,000",
  },

  {
    id: 2,
    name: "Ama Osei",
    image:
      "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771441211/Primitive.img_3_qcvm8i.png",

    skill: "Electrical Work",

    subSkills: [
      "House Wiring",
      "Generator Repair",
      "Socket Installation",
      "Lighting",
      "Panel Installation",
    ],

    premium: true,
    rating: 4.9,
    reviews: 203,
    distance: "1.5",
    status: "Available",
    price: "25,000",
  },

  {
    id: 3,
    name: "Kwame Asante",
    image:
      "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352175/Primitive.img_2_fbdtsv.png",

    skill: "Carpentry",

    subSkills: [
      "Furniture",
      "Wardrobe",
      "Doors",
      "Kitchen Cabinets",
      "Roofing",
    ],

    premium: false,
    rating: 4.7,
    reviews: 89,
    distance: "4.1",
    status: "Busy",
    price: "20,000",
  },
];

const AvailableArtisans2 = ({
  artisans = [],

  /*
    searched = true
    means a search has been performed.

    searched = false
    means no search has happened yet.
  */
  searched = false,

  /*
    loading = true
    means the backend is still searching.
  */
  loading = false,

  totalResults = 0,

  /*
    Dashboard:
    showDefault = true

    Landing page:
    showDefault = false
  */
  showDefault = true,
}) => {
  const navigate = useNavigate();

  /*
  =========================================================
  DETERMINE WHAT TO DISPLAY
  =========================================================

  If search has happened:
      display backend results.

  If no search has happened:
      display fallback only when showDefault is true.

  Landing page:
      showDefault=false
      therefore no fallback artisans.
  */

  const displayArtisans = searched
    ? Array.isArray(artisans)
      ? artisans
      : []
    : showDefault
    ? fallbackArtisans
    : [];

  /*
  =========================================================
  RESULT COUNT
  =========================================================
  */

  const resultCount = searched
    ? totalResults
    : showDefault
    ? fallbackArtisans.length
    : 0;

  return (
    <main className="w-full">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="w-full flex items-center justify-between mt-[24px]">

        <p className="text-[18px] font-semibold text-textColor">
          Available Artisans
        </p>

        <p className="text-[14px] font-normal text-textGray">
          {resultCount} results
        </p>

      </header>


      {/* =====================================================
          SEARCHING / LOADING
      ===================================================== */}

      {searched && loading && (

        <div className="w-full border border-gray-200 rounded-[14px] mt-[16px] p-[40px] text-center">

          <div className="flex justify-center mb-[16px]">

            <div className="w-[32px] h-[32px] border-[4px] border-gray-200 border-t-black rounded-full animate-spin" />

          </div>

          <p className="text-[16px] font-semibold text-textColor">
            Searching for artisans...
          </p>

          <p className="text-[14px] text-textGray mt-[8px]">
            Please wait while we find artisans near you.
          </p>

        </div>

      )}


      {/* =====================================================
          NO ARTISANS FOUND
          
          IMPORTANT:
          This ONLY shows after loading is finished.
      ===================================================== */}

      {searched &&
        !loading &&
        displayArtisans.length === 0 && (

          <div className="w-full border border-gray-200 rounded-[14px] mt-[16px] p-[30px] text-center">

            <p className="text-[16px] font-semibold text-textColor">
              No artisans found
            </p>

            <p className="text-[14px] text-textGray mt-[8px]">
              No artisan was found matching your search.
              Please try another skill or location.
            </p>

          </div>

        )}


      {/* =====================================================
          ARTISAN CARDS
      ===================================================== */}

      {!loading && displayArtisans.length > 0 && (

        <section className="w-full">

          {displayArtisans.map((artisan) => {

            /*
            =====================================================
            ARTISAN ID
            =====================================================
            */

            const artisanId =
              artisan?._id ||
              artisan?.id;


            /*
            =====================================================
            ARTISAN NAME
            =====================================================
            */

            const artisanName =
              artisan?.fullName ||
              artisan?.name ||
              "Artisan";


            /*
            =====================================================
            ARTISAN IMAGE
            =====================================================
            */

            const artisanImage =
              artisan?.profilePic ||
              artisan?.profileImage ||
              artisan?.image ||
              "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1783535675/307ce493-b254-4b2d-8ba4-d12c080d6651_bq5o6e.jpg";


            /*
            =====================================================
            MAIN SKILL
            =====================================================
            */

            const artisanSkill =
              artisan?.skillsAndSubSkills?.[0]?.skillName ||
              artisan?.skill?.name ||
              artisan?.skill ||
              "General Service";


            /*
            =====================================================
            SERVICES / SUB-SKILLS
            =====================================================
            */

            const services =
              artisan?.skillsAndSubSkills ||
              artisan?.subSkills ||
              artisan?.skills ||
              [];


            /*
            =====================================================
            RATING
            =====================================================
            */

            const rating =
              artisan?.averageRating ??
              artisan?.rating ??
              0;


            /*
            =====================================================
            REVIEWS
            =====================================================
            */

            const reviews =
              artisan?.ratingCount ??
              artisan?.reviews ??
              0;


            /*
            =====================================================
            DISTANCE
            =====================================================
            */

            const distance =
              artisan?.distanceInKm ??
              artisan?.distance ??
              null;


            /*
            =====================================================
            STATUS
            =====================================================
            */

            const status =
              artisan?.status ||
              "Available";


            return (

              <div
                key={artisanId}
                className="w-full border border-gray-200 rounded-[14px] mt-[16px] p-[16px]"
              >

                <div className="flex flex-col sm:flex-row gap-[16px]">


                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <div className="relative flex justify-center sm:block">

                    <img
                      src={artisanImage}
                      alt={artisanName}
                      className="w-[80px] h-[80px] rounded-[40px] object-cover"
                    />

                    {status === "Available" && (

                      <MdCircle
                        className="absolute bottom-0 right-[10px] text-[#00C950] text-[18px]"
                      />

                    )}

                  </div>


                  {/* =================================================
                      DETAILS
                  ================================================= */}

                  <div className="flex flex-col sm:flex-row justify-between w-full gap-[16px]">

                    <div>


                      {/* =================================================
                          NAME
                      ================================================= */}

                      <div className="flex items-center gap-[5px] text-[18px] font-semibold">

                        <p className="text-textColor">
                          {artisanName}
                        </p>

                        <TbRosetteFilled
                          className="text-[#2B7FFF] text-[18px]"
                        />

                      </div>


                      {/* =================================================
                          MAIN SKILL
                      ================================================= */}

                      <div className="mt-[15px]">

                        <button
                          type="button"
                          className="bg-[#D8EBFF] text-[#1565C0] text-[12px] font-semibold rounded-[8px] py-[4px] px-[10px]"
                        >
                          {artisanSkill}
                        </button>

                      </div>


                      {/* =================================================
                          SERVICES
                      ================================================= */}

                      <div className="flex flex-wrap gap-[5px] mt-[8px]">

                        {Array.isArray(services) &&
                          services.map(
                            (service, index) => {

                              const serviceName =
                                service?.subSkillName ||
                                service?.name ||
                                service;

                              return (

                                <button
                                  type="button"
                                  key={index}
                                  className="text-textColor text-[12px] font-medium rounded-[8px] py-[3px] bg-[#ECEEF2] px-[8.5px]"
                                >
                                  {serviceName}
                                </button>

                              );
                            }
                          )}


                        {/* PREMIUM */}

                        {artisan?.premium && (

                          <button
                            type="button"
                            className="text-white text-[12px] font-medium rounded-[8px] py-[3px] bg-[#FE9A00] px-[8.5px]"
                          >
                            Premium
                          </button>

                        )}

                      </div>


                      {/* =================================================
                          RATING
                      ================================================= */}

                      <div className="flex items-center gap-[5px] mt-[8px]">

                        <FaStar className="text-[#FDC700] text-[18px]" />

                        <p className="text-[14px]">

                          {Number(rating).toFixed(1)}

                          <span className="text-textGray ml-1">
                            ({reviews})
                          </span>

                        </p>

                      </div>


                      {/* =================================================
                          LOCATION + STATUS
                      ================================================= */}

                      <div className="flex-col lg:flex-row items-center gap-[20px] mt-[8px] text-textGray">

                        {distance !== null && (

                          <div className="flex  items-center gap-[5px]">

                            <GrLocation />

                            <p>
                              {Number(distance).toFixed(1)} km away
                            </p>

                          </div>

                        )}


                        <div className="flex items-center gap-[5px]">

                          <LuClock4 />

                          <p>
                            {status}
                          </p>

                        </div>

                      </div>

                    </div>


                    {/* =================================================
                        VIEW PROFILE
                    ================================================= */}

                    <div className="flex sm:items-end">

                      <button
                        type="button"
                        disabled={!artisanId}
                        onClick={() => {

                          if (!artisanId) {

                            console.error(
                              "ARTISAN ID NOT FOUND:",
                              artisan
                            );

                            return;
                          }

                          /*
                            Always go to selectLogin first.

                            After login, your selectLogin page
                            should redirect to:
                            
                            /artisan-profile/:artisanId
                          */

                          navigate(
                            `/selectToProceed?redirect=/artisan-profile/${artisanId}`
                          );

                        }}
                        className="bg-black text-white text-[14px] px-[12px] py-[8px] rounded-[8px] w-full sm:w-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        View Profile
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            );
          })}

        </section>

      )}

    </main>
  );
};

export default AvailableArtisans2;
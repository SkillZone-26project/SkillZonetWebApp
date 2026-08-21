import React, { useEffect, useState } from "react";
import { MdCircle } from "react-icons/md";
import { TbRosetteFilled } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { LuClock4 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

/*
===========================================================
DEFAULT ARTISANS
===========================================================
These are shown when:
1. User has never searched
2. User searched but clicked OK after no artisan was found
*/

const fallbackArtisans = [
  {
    id: 1,
    name: "John Mensah",
    image:
      "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1772140352/Primitive.img_5_sqmsfy.png",
    skill: "Plumber",
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

/*
===========================================================
LOCAL STORAGE KEY
===========================================================
*/

const SEARCH_STORAGE_KEY =
  "skillzonet_current_artisan_search";

/*
===========================================================
GET CURRENT USER ID
===========================================================

We try several common values because your login code may
already store one of these.

If your login stores:
- userId
- userEmail
- email
- user
- userData

we can use it.

We also try to read the JWT payload.
*/

const getCurrentUserKey = () => {
  try {
    const possibleValues = [
      localStorage.getItem("userId"),
      localStorage.getItem("userEmail"),
      localStorage.getItem("email"),
    ];

    for (const value of possibleValues) {
      if (value) {
        return String(value);
      }
    }

    const userData =
      localStorage.getItem("user") ||
      localStorage.getItem("userData");

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);

        const userId =
          parsedUser?._id ||
          parsedUser?.id ||
          parsedUser?.userId ||
          parsedUser?.email;

        if (userId) {
          return String(userId);
        }
      } catch (error) {
        console.log(
          "USER DATA IS NOT JSON:",
          error
        );
      }
    }

    /*
      Try JWT token
    */

    const token = localStorage.getItem("token");

    if (token) {
      const tokenParts = token.split(".");

      if (tokenParts.length === 3) {
        const payload = JSON.parse(
          atob(
            tokenParts[1]
              .replace(/-/g, "+")
              .replace(/_/g, "/")
          )
        );

        const tokenUserId =
          payload?.userId ||
          payload?.id ||
          payload?._id ||
          payload?.sub ||
          payload?.email;

        if (tokenUserId) {
          return String(tokenUserId);
        }
      }
    }

    return null;
  } catch (error) {
    console.error(
      "GET CURRENT USER KEY ERROR:",
      error
    );

    return null;
  }
};

/*
===========================================================
READ SAVED SEARCH
===========================================================
*/

const getSavedSearch = () => {
  try {
    const saved =
      localStorage.getItem(
        SEARCH_STORAGE_KEY
      );

    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);

    if (
      !parsed ||
      !Array.isArray(parsed.artisans) ||
      parsed.artisans.length === 0
    ) {
      return null;
    }

    return parsed;
  } catch (error) {
    console.error(
      "READ SAVED SEARCH ERROR:",
      error
    );

    return null;
  }
};

/*
===========================================================
AVAILABLE ARTISANS COMPONENT
===========================================================
*/

const AvailableArtisans = ({
  artisans = [],
  searched = false,
  totalResults = 0,

  /*
    This is important.

    Parent can call this when the user clicks OK
    after no artisan was found.
  */
  onClearSearch,
}) => {
  const navigate = useNavigate();

  /*
  =========================================================
  SAVED SEARCH
  =========================================================
  */

  const [savedSearch, setSavedSearch] =
    useState(() => getSavedSearch());

  /*
  =========================================================
  CURRENT USER
  =========================================================
  */

  const [currentUserKey, setCurrentUserKey] =
    useState(() =>
      getCurrentUserKey()
    );

  /*
  =========================================================
  CHECK USER AFTER LOGIN
  =========================================================

  This runs when the component loads.

  It also checks again shortly afterward because sometimes
  authentication information is restored after the page
  initially renders.
  */

  useEffect(() => {
    const updateUserKey = () => {
      const key = getCurrentUserKey();

      setCurrentUserKey(key);
    };

    updateUserKey();

    const timer = setTimeout(() => {
      updateUserKey();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  /*
  =========================================================
  LOAD SAVED SEARCH FOR CURRENT USER
  =========================================================
  */

  useEffect(() => {
    const saved = getSavedSearch();

    if (!saved) {
      setSavedSearch(null);
      return;
    }

    /*
      Only use saved search if it belongs to
      the current user.
    */

    if (
      saved.userKey &&
      currentUserKey &&
      saved.userKey === currentUserKey
    ) {
      setSavedSearch(saved);
      return;
    }

    /*
      If the stored search does not belong to the
      current user, don't display it.
    */

    if (
      saved.userKey &&
      currentUserKey &&
      saved.userKey !== currentUserKey
    ) {
      setSavedSearch(null);
    }
  }, [currentUserKey]);

  /*
  =========================================================
  SAVE SUCCESSFUL SEARCH
  =========================================================

  VERY IMPORTANT:

  We only save when:
  searched === true
  AND artisans.length > 0

  Therefore an empty search result can NEVER overwrite
  the previous successful search.
  */

  useEffect(() => {
    if (
      !searched ||
      !Array.isArray(artisans) ||
      artisans.length === 0
    ) {
      return;
    }

    try {
      const searchData = {
        userKey: currentUserKey,
        artisans: artisans,
        totalResults:
          totalResults || artisans.length,
        savedAt: Date.now(),
      };

      localStorage.setItem(
        SEARCH_STORAGE_KEY,
        JSON.stringify(searchData)
      );

      setSavedSearch(searchData);

      console.log(
        "SUCCESSFUL ARTISAN SEARCH SAVED:",
        searchData
      );
    } catch (error) {
      console.error(
        "SAVE SEARCH ERROR:",
        error
      );
    }
  }, [
    searched,
    artisans,
    totalResults,
    currentUserKey,
  ]);

  /*
  =========================================================
  DETERMINE WHAT TO DISPLAY
  =========================================================

  Priority:

  1. Current successful search
  2. Saved successful search
  3. Default artisans
  */

  const hasCurrentSearchResults =
    searched &&
    Array.isArray(artisans) &&
    artisans.length > 0;

  const hasSavedSearchResults =
    !hasCurrentSearchResults &&
    savedSearch &&
    Array.isArray(savedSearch.artisans) &&
    savedSearch.artisans.length > 0 &&
    (!savedSearch.userKey ||
      !currentUserKey ||
      savedSearch.userKey === currentUserKey);

  let displayArtisans = fallbackArtisans;

  if (hasCurrentSearchResults) {
    /*
      User just searched successfully.
    */

    displayArtisans = artisans;
  } else if (hasSavedSearchResults) {
    /*
      User logged out and logged back in.
      Restore previous successful search.
    */

    displayArtisans =
      savedSearch.artisans;
  } else {
    /*
      No successful search exists.

      Show default artisans.
    */

    displayArtisans = fallbackArtisans;
  }

  /*
  =========================================================
  DETERMINE RESULT COUNT
  =========================================================
  */

  let resultsCount =
    fallbackArtisans.length;

  if (hasCurrentSearchResults) {
    resultsCount =
      totalResults || artisans.length;
  } else if (hasSavedSearchResults) {
    resultsCount =
      savedSearch.totalResults ||
      savedSearch.artisans.length;
  }

  /*
  =========================================================
  CLEAR SEARCH
  =========================================================

  This should be called when user clicks OK after
  "No Artisan Found".
  */

  const clearSavedSearch = () => {
    try {
      localStorage.removeItem(
        SEARCH_STORAGE_KEY
      );

      setSavedSearch(null);

      console.log(
        "SUCCESSFUL SEARCH CLEARED"
      );

      /*
        Tell parent to set searched(false)
        so the parent returns to default state.
      */

      if (onClearSearch) {
        onClearSearch();
      }
    } catch (error) {
      console.error(
        "CLEAR SEARCH ERROR:",
        error
      );
    }
  };

  /*
  =========================================================
  VIEW PROFILE
  =========================================================
  */

  const handleViewProfile = (artisan) => {
  const artisanId = artisan?._id || artisan?.id;

  if (!artisanId) {
    console.error("ARTISAN ID NOT FOUND:", artisan);
    return;
  }

  navigate(`/artisan-profile/${artisanId}`);
};

  /*
  =========================================================
  UI
  =========================================================
  */

  return (
    <main>

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="w-full flex items-center justify-between mt-[24px]">

        <p className="text-[18px] font-semibold text-textColor">
          Available Artisans
        </p>

        <p className="text-[14px] font-normal text-textGray">
          {resultsCount} results
        </p>

      </header>

      {/* =================================================
          ARTISAN CARDS
      ================================================= */}

      <section>

        {displayArtisans.map(
          (artisan, index) => {

            const artisanId =
              artisan?._id ||
              artisan?.id ||
              `default-${index}`;

            const artisanName =
              artisan?.fullName ||
              artisan?.name ||
              "Artisan";

            const artisanImage =
              artisan?.profilePic ||
              artisan?.profileImage ||
              artisan?.image ||
              "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1783535675/307ce493-b254-4b2d-8ba4-d12c080d6651_bq5o6e.jpg";

            const artisanSkill =
              artisan?.skillsAndSubSkills?.[0]
                ?.skillName ||
              artisan?.skill?.name ||
              artisan?.skill ||
              "General Service";

            const services =
              artisan?.skillsAndSubSkills ||
              artisan?.subSkills ||
              artisan?.skills ||
              [];

            const rating =
              artisan?.averageRating ??
              artisan?.rating ??
              0;

            const reviews =
              artisan?.ratingCount ??
              artisan?.reviews ??
              0;

            const distance =
              artisan?.distanceInKm ??
              artisan?.distance ??
              null;

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

                    {status ===
                      "Available" && (
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

                      {/* NAME */}

                      <div className="flex items-center gap-[5px] text-[18px] font-semibold">

                        <p className="text-textColor">
                          {artisanName}
                        </p>

                        <TbRosetteFilled className="text-[#2B7FFF] text-[18px]" />

                      </div>

                      {/* MAIN SKILL */}

                      <div className="mt-[15px]">

                        <button
                          type="button"
                          className="bg-[#D8EBFF] text-[#1565C0] text-[12px] font-semibold rounded-[8px] py-[4px] px-[10px]"
                        >
                          {artisanSkill}
                        </button>

                      </div>

                      {/* SERVICES */}

                      <div className="flex flex-wrap gap-[5px] mt-[8px]">

                        {Array.isArray(
                          services
                        ) &&
                          services.map(
                            (
                              service,
                              serviceIndex
                            ) => {

                              const serviceName =
                                service?.subSkillName ||
                                service?.name ||
                                service;

                              return (
                                <button
                                  type="button"
                                  key={
                                    serviceIndex
                                  }
                                  className="text-textColor text-[12px] font-medium rounded-[8px] py-[3px] bg-[#ECEEF2] px-[8.5px]"
                                >
                                  {
                                    serviceName
                                  }
                                </button>
                              );
                            }
                          )}

                        {artisan?.premium && (
                          <button
                            type="button"
                            className="text-white text-[12px] font-medium rounded-[8px] py-[3px] bg-[#FE9A00] px-[8.5px]"
                          >
                            Premium
                          </button>
                        )}

                      </div>

                      {/* RATING */}

                      <div className="flex items-center gap-[5px] mt-[8px]">

                        <FaStar className="text-[#FDC700] text-[18px]" />

                        <p>
                          {Number(
                            rating
                          ).toFixed(1)}

                          <span className="text-textGray ml-1">
                            ({reviews})
                          </span>
                        </p>

                      </div>

                      {/* LOCATION + STATUS */}

                      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[10px] lg:gap-[20px] mt-[8px] text-textGray">

                        {distance !==
                          null && (
                          <div className="flex items-center gap-[5px]">

                            <GrLocation />

                            <p>
                              {Number(
                                distance
                              ).toFixed(
                                1
                              )}{" "}
                              km away
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
                        onClick={() =>
                          handleViewProfile(
                            artisan
                          )
                        }
                        className="bg-black text-white text-[14px] px-[12px] py-[8px] rounded-[8px] w-full sm:w-auto"
                      >
                        View Profile
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            );
          }
        )}

      </section>

    </main>
  );
};

export default AvailableArtisans;
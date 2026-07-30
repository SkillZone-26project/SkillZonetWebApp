import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  LuSlidersHorizontal,
  LuArrowRight,
} from "react-icons/lu";
import { GrLocation } from "react-icons/gr";

import AvailableArtisans from "../../UserPages/Userdashboard/AvailableArtisans";

const SEARCH_STORAGE_PREFIX = "skillzonet_search_artisans";

const UserFindArtisans = () => {
  // =========================================================
  // SKILLS
  // =========================================================

  const [skills, setSkills] = useState([]);
  const [showSkills, setShowSkills] = useState(false);

  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedSkillId, setSelectedSkillId] = useState("");

  // =========================================================
  // FILTERS
  // =========================================================

  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    verifiedOnly: false,
    premiumOnly: false,
    experience: "",
    rating: "",
    distance: "",
  });

  // =========================================================
  // PAGINATION
  // =========================================================

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
  });

  // =========================================================
  // LOCATION
  // =========================================================

  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [suggestions, setSuggestions] = useState([]);

  // =========================================================
  // ARTISAN SEARCH
  // =========================================================

  const [artisans, setArtisans] = useState([]);

  const [searched, setSearched] = useState(false);

  const [isSearching, setIsSearching] = useState(false);

  const [showNoArtisanModal, setShowNoArtisanModal] =
    useState(false);

  // =========================================================
  // REFS
  // =========================================================

  const debounceRef = useRef(null);
  const sessionTokenRef = useRef("");

  const skillDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);

  // =========================================================
  // GET USER SEARCH STORAGE KEY
  // =========================================================
  //
  // verifyEmail is used because it identifies the logged-in
  // user and is already used in your authentication flow.
  //
  // This prevents User A's search from appearing for User B.
  // =========================================================

  const getSearchStorageKey = () => {
    const email = localStorage.getItem("verifyEmail");

    if (!email) {
      return null;
    }

    return `${SEARCH_STORAGE_PREFIX}_${email
      .toLowerCase()
      .trim()}`;
  };

  // =========================================================
  // CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
  // =========================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close skill dropdown
      if (
        skillDropdownRef.current &&
        !skillDropdownRef.current.contains(event.target)
      ) {
        setShowSkills(false);
      }

      // Close location suggestions
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =========================================================
  // FETCH SKILLS
  // =========================================================

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://skillzonet-backend-auth-v1.onrender.com/api/skills/get-all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const skillsData =
          res.data?.skills ||
          res.data?.data ||
          [];

        const sortedSkills = [...skillsData].sort(
          (a, b) =>
            a.name.localeCompare(b.name)
        );

        setSkills(sortedSkills);
      } catch (err) {
        console.log(
          "FETCH SKILLS ERROR:",
          err
        );
      }
    };

    fetchSkills();
  }, []);

  // =========================================================
  // RESEARCH WHEN PAGINATION CHANGES
  // =========================================================

  useEffect(() => {
    if (!searched) {
      return;
    }

    handleSearch(false);
  }, [page]);

  // =========================================================
  // LOCATION SEARCH
  // =========================================================

  const searchLocation = (value) => {
    setLocation(value);

    // User changed the location manually.
    // The previous selected coordinates are no longer reliable.
    setLatitude(null);
    setLongitude(null);

    if (value.length < 3) {
      setSuggestions([]);
      sessionTokenRef.current = "";
      return;
    }

    if (!sessionTokenRef.current) {
      sessionTokenRef.current = uuidv4();
    }

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(
      async () => {
        try {
          const res = await axios.post(
            "https://skillzonet-backend-auth-v1.onrender.com/api/location/search-location",
            {
              input: value,
              sessionToken:
                sessionTokenRef.current,
            }
          );

          setSuggestions(
            res.data?.suggestions || []
          );
        } catch (err) {
          console.log(
            "LOCATION SEARCH ERROR:",
            err
          );

          setSuggestions([]);
        }
      },
      400
    );
  };

  // =========================================================
  // SELECT LOCATION
  // =========================================================

  const handleSelectLocation = async (item) => {
    try {
      const res = await axios.post(
        "https://skillzonet-backend-auth-v1.onrender.com/api/location/search-location",
        {
          placeId: item.placeId,
          sessionToken:
            sessionTokenRef.current,
        }
      );

      const place = res.data;

      setLocation(
        place.formattedAddress || item.name
      );

      setLatitude(place.lat);
      setLongitude(place.lng);

      setSuggestions([]);

      sessionTokenRef.current = "";
    } catch (err) {
      console.log(
        "SELECT LOCATION ERROR:",
        err
      );
    }
  };

  // =========================================================
  // SEARCH ARTISANS
  // =========================================================

  const handleSearch = async (
    openSearch = true
  ) => {
    // We only mark it as a search when the user
    // actually clicks Search.
    if (openSearch) {
      setSearched(true);
      setPage(1);
    }

    // No location selected
    if (
      latitude === null ||
      longitude === null
    ) {
      setShowNoArtisanModal(true);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setShowNoArtisanModal(false);

    try {
      console.log(
        "===== SEARCH REQUEST ====="
      );

      console.log({
        latitude,
        longitude,
        skillId: selectedSkillId,
        radiusInKm:
          filters.distance || 15,
        page,
        limit,
      });

      const res = await axios.get(
        "https://skillzonet-backend-auth-v1.onrender.com/api/job/artisans/nearby",
        {
          params: {
            latitude,
            longitude,
            skillId: selectedSkillId,
            radiusInKm:
              filters.distance || 15,
            isSubSkill: false,
            page,
            limit,

            // Keep these ready if your backend
            // supports them.
            verifiedOnly:
              filters.verifiedOnly,
            premiumOnly:
              filters.premiumOnly,
            experience:
              filters.experience,
            rating:
              filters.rating,
          },
        }
      );

      console.log(
        "===== FULL RESPONSE ====="
      );

      console.log(res.data);

      const artisansData =
        res.data?.data?.artisans ||
        res.data?.data?.data ||
        [];

      const meta =
        res.data?.data?.meta || {};

      setPagination({
        total: meta.total || 0,
        totalPages:
          meta.totalPages || 1,
      });

      console.log(
        "===== ARTISANS ====="
      );

      console.log(artisansData);

      // =====================================================
      // ARTISANS FOUND
      // =====================================================

      if (
        Array.isArray(artisansData) &&
        artisansData.length > 0
      ) {
        setArtisans(artisansData);

        setShowNoArtisanModal(false);

        // Save successful search for this user.
        const storageKey =
          getSearchStorageKey();

        if (storageKey) {
          localStorage.setItem(
            storageKey,
            JSON.stringify({
              artisans: artisansData,
              totalResults:
                meta.total ||
                artisansData.length,
              search: {
                selectedSkill,
                selectedSkillId,
                location,
                latitude,
                longitude,
                filters,
              },
            })
          );
        }
      }

      // =====================================================
      // NO ARTISANS FOUND
      // =====================================================

      else {
        setArtisans([]);

        // IMPORTANT:
        // Remove previous successful search.
        // This prevents old results from appearing
        // after the user clicks OK.
        const storageKey =
          getSearchStorageKey();

        if (storageKey) {
          localStorage.removeItem(
            storageKey
          );
        }

        setShowNoArtisanModal(true);
      }
    } catch (err) {
      console.log(
        "SEARCH ARTISANS ERROR:",
        err.response?.data ||
          err.message
      );

      setArtisans([]);

      const storageKey =
        getSearchStorageKey();

      if (storageKey) {
        localStorage.removeItem(
          storageKey
        );
      }

      setShowNoArtisanModal(true);
    } finally {
      setIsSearching(false);
    }
  };

  // =========================================================
  // RETURN TO DEFAULT ARTISANS
  // =========================================================

  const handleReturnToDefault = () => {
    const storageKey =
      getSearchStorageKey();

    if (storageKey) {
      localStorage.removeItem(
        storageKey
      );
    }

    setShowNoArtisanModal(false);

    setSearched(false);

    setArtisans([]);

    setPagination({
      total: 0,
      totalPages: 1,
    });

    setPage(1);
  };

  // =========================================================
  // JSX
  // =========================================================

  return (
    <main className="pt-[85px] px-4">

      {/* =====================================================
          SKILL SEARCH
      ===================================================== */}

      <section className="flex flex-col sm:flex-row items-center gap-[8px]">

        <div
          ref={skillDropdownRef}
          className="relative w-full max-w-[1060px]"
        >

          <div
            className="w-full flex items-center justify-between px-[10px] py-[9px] rounded-[8px] bg-[#F3F3F5] cursor-pointer"
            onClick={() =>
              setShowSkills(
                (previous) => !previous
              )
            }
          >

            <input
              type="text"
              placeholder="Select skills (e.g., plumber, electrician)"
              value={selectedSkill}
              readOnly
              className="bg-transparent w-full text-[14px] outline-none cursor-pointer"
            />

            <button
              type="button"
              className="text-[18px]"
            >
              <MdKeyboardArrowDown />
            </button>

          </div>

          {/* SKILL DROPDOWN */}

          {showSkills && (
            <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">

              {skills.length > 0 ? (
                skills.map((skill) => {

                  const skillId =
                    skill.id ||
                    skill._id;

                  return (
                    <div
                      key={skillId}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {

                        setSelectedSkill(
                          skill.name
                        );

                        setSelectedSkillId(
                          skillId
                        );

                        setShowSkills(false);
                      }}
                    >
                      {skill.name}
                    </div>
                  );
                })
              ) : (
                <div className="px-4 py-3 text-gray-500">
                  No skills found
                </div>
              )}

            </div>
          )}

        </div>

        {/* FILTER BUTTON */}

        <button
          type="button"
          onClick={() =>
            setShowFilters(true)
          }
          className="w-[36px] h-[36px] rounded-[8px] border flex items-center justify-center"
        >
          <LuSlidersHorizontal className="text-[18px]" />
        </button>

      </section>

      {/* =====================================================
          LOCATION SEARCH
      ===================================================== */}

      <section className="flex flex-col sm:flex-row items-center gap-[10px] mt-[16px]">

        <div
          ref={locationDropdownRef}
          className="relative w-full flex items-center gap-[5px] max-w-[750px] px-[10px] py-[9px] rounded-[8px] bg-[#F3F3F5]"
        >

          <button
            type="button"
            className="text-[18px]"
          >
            <GrLocation />
          </button>

          <input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) =>
              searchLocation(
                e.target.value
              )
            }
            className="bg-transparent w-full text-[14px] outline-none"
          />

          {/* LOCATION SUGGESTIONS */}

          {suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">

              {suggestions.map(
                (item) => (
                  <div
                    key={
                      item.placeId
                    }
                    onClick={() =>
                      handleSelectLocation(
                        item
                      )
                    }
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    {item.name}
                  </div>
                )
              )}

            </div>
          )}

        </div>

        {/* SEARCH BUTTON */}

        <button
          type="button"
          onClick={() =>
            handleSearch(true)
          }
          disabled={isSearching}
          className={`w-full sm:w-[200px] h-[36px] flex items-center gap-[10px] rounded-[8px] text-white justify-center ${
            isSearching
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black"
          }`}
        >

          <p>
            {isSearching
              ? "Searching..."
              : "Search"}
          </p>

          {!isSearching && (
            <LuArrowRight className="text-[18px]" />
          )}

        </button>

      </section>

      {/* =====================================================
          ARTISANS
      ===================================================== */}

      <AvailableArtisans
        artisans={artisans}
        searched={searched}
        totalResults={
          pagination.total
        }
        isSearching={isSearching}
      />

      {/* =====================================================
          PAGINATION
      ===================================================== */}

      {!isSearching &&
        searched &&
        pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">

            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage(
                  (previous) =>
                    previous - 1
                )
              }
              className={`px-4 py-2 rounded border ${
                page === 1
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Previous
            </button>

            {Array.from(
              {
                length:
                  pagination.totalPages,
              },
              (_, index) =>
                index + 1
            ).map(
              (pageNumber) => (
                <button
                  type="button"
                  key={pageNumber}
                  onClick={() =>
                    setPage(
                      pageNumber
                    )
                  }
                  className={`w-10 h-10 rounded ${
                    page === pageNumber
                      ? "bg-black text-white"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}

            <button
              type="button"
              disabled={
                page ===
                pagination.totalPages
              }
              onClick={() =>
                setPage(
                  (previous) =>
                    previous + 1
                )
              }
              className={`px-4 py-2 rounded border ${
                page ===
                pagination.totalPages
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Next
            </button>

          </div>
        )}

      {/* =====================================================
          NO ARTISAN MODAL
      ===================================================== */}

      {showNoArtisanModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] px-4">

          <div className="bg-white rounded-xl w-full max-w-[360px] p-6 relative">

            <button
              type="button"
              onClick={
                handleReturnToDefault
              }
              className="absolute right-4 top-3 text-2xl"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold text-center mb-3">
              No Artisan Found
            </h2>

            <p className="text-center text-gray-500">
              No artisan was found for
              this search. Please try
              another location or another
              skill.
            </p>

            <button
              type="button"
              onClick={
                handleReturnToDefault
              }
              className="mt-6 w-full bg-black text-white rounded-lg py-2"
            >
              OK
            </button>

          </div>

        </div>
      )}

      {/* =====================================================
          FILTER SIDEBAR
      ===================================================== */}

      {showFilters && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-[9998]">

          <div className="bg-white w-full sm:w-[360px] h-full p-6 overflow-y-auto">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl font-semibold">
                Filters
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowFilters(false)
                }
                className="text-2xl"
              >
                ×
              </button>

            </div>

            {/* VERIFIED */}

            <div className="mb-6">

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={
                    filters.verifiedOnly
                  }
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      verifiedOnly:
                        e.target.checked,
                    })
                  }
                />

                <span>
                  Verified Artisans Only
                </span>

              </label>

            </div>

            {/* PREMIUM */}

            <div className="mb-6">

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={
                    filters.premiumOnly
                  }
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      premiumOnly:
                        e.target.checked,
                    })
                  }
                />

                <span>
                  Premium Members Only
                </span>

              </label>

            </div>

            {/* EXPERIENCE */}

            <div className="mb-6">

              <label className="block mb-2 font-medium">
                Experience
              </label>

              <select
                value={
                  filters.experience
                }
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    experience:
                      e.target.value,
                  })
                }
                className="w-full border rounded-lg p-2"
              >

                <option value="">
                  Any
                </option>

                <option value="1">
                  1+ Years
                </option>

                <option value="3">
                  3+ Years
                </option>

                <option value="5">
                  5+ Years
                </option>

                <option value="10">
                  10+ Years
                </option>

              </select>

            </div>

            {/* RATING */}

            <div className="mb-6">

              <label className="block mb-2 font-medium">
                Rating
              </label>

              <select
                value={filters.rating}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    rating:
                      e.target.value,
                  })
                }
                className="w-full border rounded-lg p-2"
              >

                <option value="">
                  Any
                </option>

                <option value="5">
                  5 ★
                </option>

                <option value="4.5">
                  4.5 ★ & Above
                </option>

                <option value="4">
                  4 ★ & Above
                </option>

                <option value="3">
                  3 ★ & Above
                </option>

              </select>

            </div>

            {/* DISTANCE */}

            <div className="mb-8">

              <label className="block mb-2 font-medium">
                Distance
              </label>

              <select
                value={
                  filters.distance
                }
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    distance:
                      e.target.value,
                  })
                }
                className="w-full border rounded-lg p-2"
              >

                <option value="">
                  Anywhere
                </option>

                <option value="2">
                  Within 2 km
                </option>

                <option value="5">
                  Within 5 km
                </option>

                <option value="10">
                  Within 10 km
                </option>

                <option value="20">
                  Within 20 km
                </option>

              </select>

            </div>

            {/* FILTER BUTTONS */}

            <div className="flex gap-3">

              <button
                type="button"
                onClick={() =>
                  setFilters({
                    verifiedOnly: false,
                    premiumOnly: false,
                    experience: "",
                    rating: "",
                    distance: "",
                  })
                }
                className="flex-1 border rounded-lg py-2"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={() => {
                  setPage(1);
                  setShowFilters(false);
                }}
                className="flex-1 bg-black text-white rounded-lg py-2"
              >
                Apply
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
};

export default UserFindArtisans;
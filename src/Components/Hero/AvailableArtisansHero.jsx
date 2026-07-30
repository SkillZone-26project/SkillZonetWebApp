import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import { MdKeyboardArrowDown } from "react-icons/md";

import {
  LuSlidersHorizontal,
  LuArrowRight,
  LuArrowLeft,
} from "react-icons/lu";

import { GrLocation } from "react-icons/gr";

import AvailableArtisans2 from "../../Components/Hero/AvailableArtisans2";

const AvailableArtisansHero = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  /*
  =========================================================
  REFS FOR CLICKING OUTSIDE
  =========================================================
  */

  const skillDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);
  const filterSidebarRef = useRef(null);

  /*
  =========================================================
  SKILLS
  =========================================================
  */

  const [skills, setSkills] = useState([]);

  const [showSkills, setShowSkills] = useState(false);

  const [selectedSkill, setSelectedSkill] = useState("");

  const [selectedSkillId, setSelectedSkillId] = useState("");

  /*
  =========================================================
  FILTERS
  =========================================================
  */

  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    verifiedOnly: false,
    premiumOnly: false,
    experience: "",
    rating: "",
    distance: "",
  });

  /*
  =========================================================
  LOCATION
  =========================================================
  */

  const [location, setLocation] = useState("");

  const [latitude, setLatitude] = useState(null);

  const [longitude, setLongitude] = useState(null);

  const [suggestions, setSuggestions] = useState([]);

  /*
  =========================================================
  ARTISANS
  =========================================================
  */

  const [artisans, setArtisans] = useState([]);

  /*
    false = no search has been performed
    true = search has been performed
  */

  const [searched, setSearched] = useState(false);

  /*
  =========================================================
  LOADING
  =========================================================
  */

  const [loadingArtisans, setLoadingArtisans] = useState(false);

  /*
  =========================================================
  PAGINATION
  =========================================================
  */

  const [page, setPage] = useState(1);

  const [limit] = useState(10);

  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
  });

  /*
  =========================================================
  LOCATION SEARCH REFS
  =========================================================
  */

  const debounceRef = useRef(null);

  const sessionTokenRef = useRef("");

  /*
  =========================================================
  CLICK OUTSIDE HANDLER
  =========================================================

  This allows the user to:

  - Open skill dropdown
  - Click outside -> dropdown closes

  - Open location suggestions
  - Click outside -> suggestions close

  - Open filter sidebar
  - Click outside the sidebar -> sidebar closes
  =========================================================
  */

  useEffect(() => {
    const handleClickOutside = (event) => {
      /*
      -------------------------------
      SKILL DROPDOWN
      -------------------------------
      */

      if (
        skillDropdownRef.current &&
        !skillDropdownRef.current.contains(event.target)
      ) {
        setShowSkills(false);
      }

      /*
      -------------------------------
      LOCATION DROPDOWN
      -------------------------------
      */

      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }

      /*
      -------------------------------
      FILTER SIDEBAR
      -------------------------------
      */

      if (
        showFilters &&
        filterSidebarRef.current &&
        !filterSidebarRef.current.contains(event.target)
      ) {
        setShowFilters(false);
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
  }, [showFilters]);

  /*
  =========================================================
  FETCH SKILLS
  =========================================================
  */

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://skillzonet-backend-auth-v1.onrender.com/api/skills/get-all",
          {
            headers: token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {},
          }
        );

        console.log(
          "SKILLS RESPONSE:",
          res.data
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
      } catch (error) {
        console.error(
          "FETCH SKILLS ERROR:",
          error.response?.data ||
            error.message
        );
      }
    };

    fetchSkills();
  }, []);

  /*
  =========================================================
  SEARCH ARTISANS
  =========================================================
  */

  const performSearch = async ({
    skillId,
    lat,
    lng,
    pageNumber = 1,
  }) => {
    /*
    -------------------------------
    CHECK SKILL
    -------------------------------
    */

    if (!skillId) {
      console.log(
        "SEARCH STOPPED: No skill ID"
      );

      return;
    }

    /*
    -------------------------------
    CHECK LOCATION
    -------------------------------
    */

    if (
      lat === null ||
      lat === undefined ||
      lng === null ||
      lng === undefined
    ) {
      console.log(
        "SEARCH STOPPED: No coordinates",
        {
          lat,
          lng,
        }
      );

      return;
    }

    /*
    -------------------------------
    SEARCH STARTED
    -------------------------------
    */

    setSearched(true);

    setLoadingArtisans(true);

    /*
    Clear old results while searching.
    */

    setArtisans([]);

    setPagination({
      total: 0,
      totalPages: 1,
    });

    console.log(
      "================================================="
    );

    console.log(
      "SEARCHING ARTISANS"
    );

    console.log({
      latitude: lat,
      longitude: lng,
      skillId,
      radiusInKm:
        filters.distance || 15,
      page: pageNumber,
      limit,
    });

    console.log(
      "================================================="
    );

    try {
      const res = await axios.get(
        "https://skillzonet-backend-auth-v1.onrender.com/api/job/artisans/nearby",
        {
          params: {
            latitude: lat,
            longitude: lng,
            skillId: skillId,
            radiusInKm:
              filters.distance || 15,
            isSubSkill: false,
            page: pageNumber,
            limit: limit,
          },
        }
      );

      console.log(
        "FULL ARTISAN RESPONSE:",
        res.data
      );

      /*
      =====================================================
      GET ARTISANS
      =====================================================
      */

      const artisansData =
        res.data?.data?.artisans ||
        res.data?.data?.data ||
        [];

      /*
      =====================================================
      GET PAGINATION
      =====================================================
      */

      const meta =
        res.data?.data?.meta ||
        {};

      setPagination({
        total:
          Number(meta.total) || 0,

        totalPages:
          Number(meta.totalPages) || 1,
      });

      console.log(
        "ARTISANS FOUND:",
        artisansData
      );

      console.log(
        "NUMBER OF ARTISANS:",
        artisansData.length
      );

      /*
      Save results.
      */

      setArtisans(
        Array.isArray(artisansData)
          ? artisansData
          : []
      );
    } catch (error) {
      console.error(
        "SEARCH ARTISANS ERROR:",
        error.response?.data ||
          error.message
      );

      setArtisans([]);

      setPagination({
        total: 0,
        totalPages: 1,
      });
    } finally {
      setLoadingArtisans(false);
    }
  };

  /*
  =========================================================
  MANUAL SEARCH
  =========================================================
  */

  const handleSearch = () => {
    /*
    Check skill.
    */

    if (!selectedSkillId) {
      alert(
        "Please select a skill."
      );

      return;
    }

    /*
    Check location.
    */

    if (
      latitude === null ||
      longitude === null
    ) {
      alert(
        "Please select a location from the suggestions."
      );

      return;
    }

    /*
    Start from page 1.
    */

    setPage(1);

    performSearch({
      skillId: selectedSkillId,
      lat: latitude,
      lng: longitude,
      pageNumber: 1,
    });
  };

  /*
  =========================================================
  PAGINATION SEARCH
  =========================================================
  */

  useEffect(() => {
    if (!searched) {
      return;
    }

    /*
    Page 1 already runs from handleSearch.
    */

    if (page === 1) {
      return;
    }

    performSearch({
      skillId: selectedSkillId,
      lat: latitude,
      lng: longitude,
      pageNumber: page,
    });
  }, [page]);

  /*
  =========================================================
  READ SEARCH FROM LANDING PAGE
  =========================================================
  */

  useEffect(() => {
    const urlSkillId =
      searchParams.get("skillId");

    const urlLocation =
      searchParams.get("location");

    const urlLatitude =
      searchParams.get("latitude");

    const urlLongitude =
      searchParams.get("longitude");

    /*
    If there is no skill in URL,
    don't automatically search.
    */

    if (!urlSkillId) {
      return;
    }

    const parsedLatitude =
      urlLatitude !== null
        ? Number(urlLatitude)
        : null;

    const parsedLongitude =
      urlLongitude !== null
        ? Number(urlLongitude)
        : null;

    console.log(
      "LANDING PAGE SEARCH PARAMETERS:",
      {
        skillId: urlSkillId,
        location: urlLocation,
        latitude: parsedLatitude,
        longitude: parsedLongitude,
      }
    );

    /*
    Set UI values.
    */

    setSelectedSkillId(
      urlSkillId
    );

    setLocation(
      urlLocation || ""
    );

    setLatitude(
      Number.isFinite(parsedLatitude)
        ? parsedLatitude
        : null
    );

    setLongitude(
      Number.isFinite(parsedLongitude)
        ? parsedLongitude
        : null
    );

    /*
    Find skill name.
    */

    const matchedSkill =
      skills.find(
        (skill) =>
          String(
            skill.id || skill._id
          ) === String(urlSkillId)
      );

    if (matchedSkill) {
      setSelectedSkill(
        matchedSkill.name
      );
    }

    /*
    Automatically search if
    coordinates exist.
    */

    if (
      Number.isFinite(parsedLatitude) &&
      Number.isFinite(parsedLongitude)
    ) {
      setPage(1);

      performSearch({
        skillId: urlSkillId,
        lat: parsedLatitude,
        lng: parsedLongitude,
        pageNumber: 1,
      });
    }
  }, [searchParams, skills.length]);

  /*
  =========================================================
  LOCATION SEARCH
  =========================================================
  */

  const searchLocation = (value) => {
    setLocation(value);

    /*
    Once user changes location,
    old coordinates are invalid.
    */

    setLatitude(null);

    setLongitude(null);

    if (
      value.trim().length < 3
    ) {
      setSuggestions([]);

      sessionTokenRef.current = "";

      return;
    }

    /*
    Create session token.
    */

    if (
      !sessionTokenRef.current
    ) {
      sessionTokenRef.current =
        uuidv4();
    }

    /*
    Clear previous debounce.
    */

    clearTimeout(
      debounceRef.current
    );

    /*
    Search after 400ms.
    */

    debounceRef.current =
      setTimeout(async () => {
        try {
          const res =
            await axios.post(
              "https://skillzonet-backend-auth-v1.onrender.com/api/location/search-location",
              {
                input:
                  value.trim(),

                sessionToken:
                  sessionTokenRef.current,
              }
            );

          setSuggestions(
            res.data?.suggestions ||
              []
          );
        } catch (error) {
          console.error(
            "LOCATION SEARCH ERROR:",
            error.response?.data ||
              error.message
          );

          setSuggestions([]);
        }
      }, 400);
  };

  /*
  =========================================================
  SELECT LOCATION
  =========================================================
  */

  const handleSelectLocation =
    async (item) => {
      try {
        const res =
          await axios.post(
            "https://skillzonet-backend-auth-v1.onrender.com/api/location/search-location",
            {
              placeId:
                item.placeId,

              sessionToken:
                sessionTokenRef.current,
            }
          );

        const place =
          res.data;

        const selectedAddress =
          place?.formattedAddress ||
          place?.formatted_address ||
          place?.address ||
          item?.description ||
          item?.name ||
          "";

        const selectedLatitude =
          place?.lat ??
          place?.latitude ??
          place?.location?.lat ??
          place?.location?.latitude ??
          null;

        const selectedLongitude =
          place?.lng ??
          place?.longitude ??
          place?.location?.lng ??
          place?.location?.longitude ??
          null;

        if (
          selectedLatitude === null ||
          selectedLongitude === null
        ) {
          alert(
            "We could not get the coordinates for this location. Please select another location."
          );

          return;
        }

        /*
        Save selected location.
        */

        setLocation(
          selectedAddress
        );

        setLatitude(
          Number(selectedLatitude)
        );

        setLongitude(
          Number(selectedLongitude)
        );

        /*
        Hide suggestions.
        */

        setSuggestions([]);

        /*
        Clear session.
        */

        sessionTokenRef.current =
          "";

        console.log(
          "SELECTED LOCATION:",
          {
            address:
              selectedAddress,

            latitude:
              selectedLatitude,

            longitude:
              selectedLongitude,
          }
        );
      } catch (error) {
        console.error(
          "SELECT LOCATION ERROR:",
          error.response?.data ||
            error.message
        );

        alert(
          "Unable to select this location. Please try again."
        );
      }
    };

  /*
  =========================================================
  CLEANUP LOCATION DEBOUNCE
  =========================================================
  */

  useEffect(() => {
    return () => {
      clearTimeout(
        debounceRef.current
      );
    };
  }, []);

  /*
  =========================================================
  UI
  =========================================================
  */

  return (
    <main className="pt-[20px] px-4 ml-[20px] mr-[20px] lg:ml-[60px] lg:mr-[60px]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b w-full">

        <div className="flex items-center gap-[14px] w-full max-w-[854px] py-[12px]">

          <button
            type="button"
            onClick={() =>
              navigate(-1)
            }
          >
            <LuArrowLeft />
          </button>

          <p className="text-[18px] font-medium">
            Available Artisans
          </p>

        </div>

      </header>

      {/* =====================================================
          SKILL SEARCH
      ===================================================== */}

      <section className="flex flex-col sm:flex-row items-center gap-[8px] mt-[16px]">

        <div
          ref={skillDropdownRef}
          className="relative w-full max-w-[1060px]"
        >

          <div
            className="w-full flex items-center justify-between px-[10px] py-[9px] rounded-[8px] bg-[#F3F3F5] cursor-pointer"
            onClick={() =>
              setShowSkills(
                (prev) => !prev
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

          {/* =================================================
              SKILL DROPDOWN
          ================================================= */}

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

                        setShowSkills(
                          false
                        );
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

        {/* =================================================
            FILTER BUTTON
        ================================================= */}

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

          {/* =================================================
              LOCATION SUGGESTIONS
          ================================================= */}

          {suggestions.length > 0 && (

            <div className="absolute left-0 right-0 top-full mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">

              {suggestions.map(
                (item, index) => (

                  <div
                    key={
                      item.placeId ||
                      item.id ||
                      index
                    }
                    onClick={() =>
                      handleSelectLocation(
                        item
                      )
                    }
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                  >

                    <p className="text-sm font-medium">

                      {item.description ||
                        item.address ||
                        item.formattedAddress ||
                        item.name ||
                        "Location"}

                    </p>

                    {item.secondaryText && (

                      <p className="text-xs text-gray-500 mt-1">

                        {item.secondaryText}

                      </p>

                    )}

                  </div>

                )
              )}

            </div>

          )}

        </div>

        {/* =================================================
            SEARCH BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={handleSearch}
          disabled={
            !selectedSkillId ||
            latitude === null ||
            longitude === null ||
            loadingArtisans
          }
          className="w-full sm:w-[200px] h-[36px] flex items-center gap-[10px] rounded-[8px] bg-black text-white justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >

          {loadingArtisans ? (

            <>
              <div className="w-[16px] h-[16px] border-2 border-gray-300 border-t-white rounded-full animate-spin" />

              <p>
                Searching...
              </p>
            </>

          ) : (

            <>
              <p>
                Search
              </p>

              <LuArrowRight className="text-[18px]" />
            </>

          )}

        </button>

      </section>

      {/* =====================================================
          ARTISANS
      ===================================================== */}

      <AvailableArtisans2
        artisans={artisans}
        searched={searched}
        loading={loadingArtisans}
        totalResults={pagination.total}
        showDefault={false}
      />

      {/* =====================================================
          PAGINATION
      ===================================================== */}

      {!loadingArtisans &&
        pagination.totalPages > 1 && (

          <div className="flex flex-wrap justify-center items-center gap-2 mt-8 mb-8">

            {/* PREVIOUS */}

            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage(
                  (prev) =>
                    prev - 1
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

            {/* PAGE NUMBERS */}

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

            {/* NEXT */}

            <button
              type="button"
              disabled={
                page ===
                pagination.totalPages
              }
              onClick={() =>
                setPage(
                  (prev) =>
                    prev + 1
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
          FILTER SIDEBAR
      ===================================================== */}

      {showFilters && (

        <div
          className="fixed inset-0 bg-black/40 flex justify-end z-50"
          onMouseDown={(event) => {

            /*
            If user clicks the dark overlay,
            close the filter sidebar.
            */

            if (
              event.target ===
              event.currentTarget
            ) {
              setShowFilters(false);
            }

          }}
        >

          <div
            ref={filterSidebarRef}
            className="bg-white w-[360px] max-w-full h-full p-6 overflow-y-auto"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >

            {/* =================================================
                FILTER HEADER
            ================================================= */}

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

            {/* =================================================
                VERIFIED
            ================================================= */}

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

            {/* =================================================
                PREMIUM
            ================================================= */}

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

            {/* =================================================
                EXPERIENCE
            ================================================= */}

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

            {/* =================================================
                RATING
            ================================================= */}

            <div className="mb-6">

              <label className="block mb-2 font-medium">
                Rating
              </label>

              <select
                value={
                  filters.rating
                }
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

            {/* =================================================
                DISTANCE
            ================================================= */}

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

            {/* =================================================
                FILTER BUTTONS
            ================================================= */}

            <div className="flex gap-3">

              {/* RESET */}

              <button
                type="button"
                onClick={() => {

                  setFilters({
                    verifiedOnly: false,
                    premiumOnly: false,
                    experience: "",
                    rating: "",
                    distance: "",
                  });

                }}
                className="flex-1 border rounded-lg py-2"
              >
                Reset
              </button>

              {/* APPLY */}

              <button
                type="button"
                onClick={() => {

                  setShowFilters(
                    false
                  );

                  /*
                  Re-run search with
                  updated distance.
                  */

                  if (
                    selectedSkillId &&
                    latitude !== null &&
                    longitude !== null
                  ) {

                    setPage(1);

                    performSearch({

                      skillId:
                        selectedSkillId,

                      lat:
                        latitude,

                      lng:
                        longitude,

                      pageNumber: 1,

                    });

                  }

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

export default AvailableArtisansHero;
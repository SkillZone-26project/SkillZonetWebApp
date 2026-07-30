import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { CiSearch } from "react-icons/ci";
import { IoArrowForwardOutline } from "react-icons/io5";
import { LuCircleCheckBig } from "react-icons/lu";
import { AiOutlineAim } from "react-icons/ai";
import { IoChevronDown } from "react-icons/io5";

const Hero = () => {
  const navigate = useNavigate();

  /* =====================================================
     SKILL STATES
  ====================================================== */

  const [openDropdown, setOpenDropdown] = useState(false);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const [loadingSkills, setLoadingSkills] = useState(false);
  const [skillError, setSkillError] = useState("");

  /* =====================================================
     LOCATION STATES
  ====================================================== */

  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [loadingLocation, setLoadingLocation] = useState(false);

  /* =====================================================
     LOCATION SESSION / DEBOUNCE
  ====================================================== */

  const sessionTokenRef = useRef("");
  const debounceRef = useRef(null);

  /* =====================================================
     OUTSIDE CLICK REF
  ====================================================== */

  const searchContainerRef = useRef(null);

  /* =====================================================
     FETCH SKILLS
  ====================================================== */

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoadingSkills(true);
        setSkillError("");

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

        console.log("SKILLS API RESPONSE:", res.data);

        const skillsData =
          res.data?.skills ||
          res.data?.data ||
          [];

        const sortedSkills = [...skillsData].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setSkills(sortedSkills);
      } catch (error) {
        console.error(
          "FETCH SKILLS ERROR:",
          error.response?.data || error.message
        );

        setSkillError("Unable to load skills.");
      } finally {
        setLoadingSkills(false);
      }
    };

    fetchSkills();
  }, []);

  /* =====================================================
     CLICK OUTSIDE SEARCH AREA
  ====================================================== */

  useEffect(() => {
    const handleClickOutside = (event) => {
      /*
        If the click is outside the entire search container,
        close both the skill dropdown and location suggestions.
      */

      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setOpenDropdown(false);
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

  /* =====================================================
     LOCATION SEARCH
  ====================================================== */

  const searchLocation = (value) => {
    setLocation(value);

    /*
      Clear previously selected coordinates
      because the user has changed the location.
    */

    setLatitude(null);
    setLongitude(null);

    if (value.trim().length < 3) {
      setSuggestions([]);
      sessionTokenRef.current = "";
      return;
    }

    /*
      Create a session token
    */

    if (!sessionTokenRef.current) {
      sessionTokenRef.current = uuidv4();
    }

    /*
      Clear previous debounce
    */

    clearTimeout(debounceRef.current);

    /*
      Wait before calling the backend
    */

    debounceRef.current = setTimeout(async () => {
      try {
        setLoadingLocation(true);

        const res = await axios.post(
          "https://skillzonet-backend-auth-v1.onrender.com/api/location/search-location",
          {
            input: value.trim(),
            sessionToken: sessionTokenRef.current,
          }
        );

        console.log(
          "LOCATION SEARCH RESPONSE:",
          res.data
        );

        setSuggestions(
          res.data?.suggestions || []
        );
      } catch (error) {
        console.error(
          "LOCATION SEARCH ERROR:",
          error.response?.data || error.message
        );

        setSuggestions([]);
      } finally {
        setLoadingLocation(false);
      }
    }, 400);
  };

  /* =====================================================
     SELECT LOCATION SUGGESTION
  ====================================================== */

  const handleSelectLocation = async (suggestion) => {
    try {
      console.log(
        "SELECTED SUGGESTION:",
        suggestion
      );

      setLoadingLocation(true);

      const placeId = suggestion.placeId;

      if (!placeId) {
        console.error(
          "No placeId found:",
          suggestion
        );

        alert(
          "Unable to identify this location. Please select another location."
        );

        return;
      }

      /*
        Call backend again using placeId
        to get actual coordinates.
      */

      const res = await axios.post(
        "https://skillzonet-backend-auth-v1.onrender.com/api/location/search-location",
        {
          placeId,
          sessionToken: sessionTokenRef.current,
        }
      );

      console.log(
        "LOCATION DETAILS RESPONSE:",
        res.data
      );

      const place = res.data;

      /*
        Get latitude
      */

      const selectedLatitude =
        place?.lat ??
        place?.latitude ??
        place?.location?.lat ??
        place?.location?.latitude ??
        null;

      /*
        Get longitude
      */

      const selectedLongitude =
        place?.lng ??
        place?.longitude ??
        place?.location?.lng ??
        place?.location?.longitude ??
        null;

      /*
        Get address
      */

      const selectedLocation =
        place?.formattedAddress ??
        place?.formatted_address ??
        place?.address ??
        place?.name ??
        suggestion?.description ??
        suggestion?.name ??
        "";

      console.log(
        "FINAL SELECTED LOCATION:",
        {
          address: selectedLocation,
          latitude: selectedLatitude,
          longitude: selectedLongitude,
        }
      );

      /*
        Make sure coordinates were returned
      */

      if (
        selectedLatitude === null ||
        selectedLongitude === null
      ) {
        console.error(
          "Backend did not return coordinates:",
          place
        );

        alert(
          "We could not get the coordinates for this location. Please select another location."
        );

        return;
      }

      /*
        Save location
      */

      setLocation(selectedLocation);
      setLatitude(selectedLatitude);
      setLongitude(selectedLongitude);

      /*
        Hide suggestions
      */

      setSuggestions([]);

      /*
        Clear session
      */

      sessionTokenRef.current = "";

      console.log(
        "LOCATION SUCCESSFULLY SELECTED"
      );
    } catch (error) {
      console.error(
        "SELECT LOCATION ERROR:",
        error.response?.data || error.message
      );

      alert(
        "Unable to select this location. Please try again."
      );
    } finally {
      setLoadingLocation(false);
    }
  };

  /* =====================================================
     WATCH LOCATION STATE
  ====================================================== */

  useEffect(() => {
    console.log(
      "LOCATION STATE CHANGED:",
      {
        location,
        latitude,
        longitude,
      }
    );
  }, [location, latitude, longitude]);

  /* =====================================================
     SEARCH ARTISANS
  ====================================================== */

  const handleSearch = () => {
    /*
      Check skill
    */

    if (!selectedSkill) {
      alert("Please select a skill.");
      return;
    }

    /*
      If location has been entered,
      coordinates must exist.
    */

    if (
      location.trim() &&
      (latitude === null ||
        longitude === null)
    ) {
      console.log(
        "LOCATION VALIDATION FAILED:",
        {
          location,
          latitude,
          longitude,
        }
      );

      alert(
        "Please select a location from the suggestions."
      );

      return;
    }

    /*
      Create query parameters
    */

    const searchParams =
      new URLSearchParams();

    /*
      Skill ID
    */

    searchParams.set(
      "skillId",
      selectedSkill.id
    );

    /*
      Location
    */

    if (location.trim()) {
      searchParams.set(
        "location",
        location.trim()
      );
    }

    /*
      Latitude
    */

    if (latitude !== null) {
      searchParams.set(
        "latitude",
        latitude
      );
    }

    /*
      Longitude
    */

    if (longitude !== null) {
      searchParams.set(
        "longitude",
        longitude
      );
    }

    console.log(
      "===== SEARCH ARTISANS ====="
    );

    console.log({
      skillId: selectedSkill.id,
      skillName: selectedSkill.name,
      location: location.trim(),
      latitude,
      longitude,
    });

    /*
      Navigate to AvailableArtisansHero
    */

    navigate(
      `/artisans?${searchParams.toString()}`
    );
  };

  /* =====================================================
     ENTER KEY
  ====================================================== */

  const handleLocationKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  /* =====================================================
     CURRENT LOCATION
  ====================================================== */

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert(
        "Geolocation is not supported by your browser."
      );

      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude =
          position.coords.latitude;

        const currentLongitude =
          position.coords.longitude;

        setLatitude(currentLatitude);
        setLongitude(currentLongitude);

        /*
          Show coordinates temporarily
        */

        setLocation(
          `${currentLatitude.toFixed(
            6
          )}, ${currentLongitude.toFixed(6)}`
        );

        setSuggestions([]);

        sessionTokenRef.current = "";

        setLoadingLocation(false);

        console.log(
          "CURRENT LOCATION:",
          {
            latitude: currentLatitude,
            longitude: currentLongitude,
          }
        );
      },
      (error) => {
        console.error(
          "CURRENT LOCATION ERROR:",
          error
        );

        setLoadingLocation(false);

        alert(
          "Unable to get your current location. Please allow location access."
        );
      }
    );
  };

  /* =====================================================
     CLEANUP
  ====================================================== */

  useEffect(() => {
    return () => {
      clearTimeout(
        debounceRef.current
      );
    };
  }, []);

  /* =====================================================
     UI
  ====================================================== */

  return (
    <section className="pt-12 sm:pt-16 lg:pt-20 mt-[60px] sm:mt-[60px] lg:mt-[108px] overflow-x-hidden">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start px-4 md:px-6 gap-6">

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="flex flex-col gap-4 flex-1 w-full">

          {/* TRUSTED USERS */}

          <button
            type="button"
            className="bg-black text-white text-[12px] rounded-[8px] w-[166px] h-[22px]"
          >
            Trusted by 10,000+ Users
          </button>

          {/* HEADLINE */}

          <h1 className="text-[20px] sm:text-[40px] lg:text-[50px] font-bold leading-[1]">

            <span>
              Find Trusted Artisans
            </span>

            <span className="flex">
              Near You
            </span>

          </h1>

          {/* =================================================
              SEARCH AREA
          ================================================= */}

          <div
            ref={searchContainerRef}
            className="flex flex-col md:flex-row items-stretch mt-6 w-full relative"
          >

            {/* =================================================
                SELECT SKILL
            ================================================= */}

            <div className="relative w-full md:w-[180px]">

              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(
                    (prev) => !prev
                  )
                }
                className="w-full flex items-center justify-between border border-black md:rounded-l-[8px] rounded-t-[8px] md:rounded-t-none px-4 py-2 cursor-pointer bg-white h-[44px]"
              >

                <span className="text-sm text-black">
                  {selectedSkill?.name ||
                    "Select Skill"}
                </span>

                <IoChevronDown
                  className={`text-black transition-transform ${
                    openDropdown
                      ? "rotate-180"
                      : ""
                  }`}
                />

              </button>

              {/* SKILL DROPDOWN */}

              {openDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white shadow-lg border border-gray-200 rounded-md z-50 w-full max-h-[250px] overflow-y-auto">

                  {/* LOADING */}

                  {loadingSkills && (
                    <p className="px-4 py-3 text-sm text-gray-500">
                      Loading skills...
                    </p>
                  )}

                  {/* ERROR */}

                  {!loadingSkills &&
                    skillError && (
                      <p className="px-4 py-3 text-sm text-red-500">
                        {skillError}
                      </p>
                    )}

                  {/* SKILLS */}

                  {!loadingSkills &&
                    !skillError &&
                    skills.length > 0 &&
                    skills.map((skill) => (
                      <button
                        type="button"
                        key={
                          skill.id ||
                          skill._id
                        }
                        onClick={() => {
                          setSelectedSkill(
                            skill
                          );

                          setOpenDropdown(
                            false
                          );
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 text-sm ${
                          selectedSkill?.id ===
                          skill.id
                            ? "bg-gray-100 font-medium"
                            : ""
                        }`}
                      >
                        {skill.name}
                      </button>
                    ))}

                  {/* NO SKILLS */}

                  {!loadingSkills &&
                    !skillError &&
                    skills.length === 0 && (
                      <p className="px-4 py-3 text-sm text-gray-500">
                        No skills found
                      </p>
                    )}

                </div>
              )}

            </div>

            {/* =================================================
                LOCATION
            ================================================= */}

            <div className="relative w-full flex-1">

              <div className="w-full flex items-center border border-black px-4 py-2 h-[44px] bg-white">

                <CiSearch className="text-lg text-black mr-2 flex-shrink-0" />

                <input
                  type="text"
                  value={location}
                  onChange={(e) =>
                    searchLocation(
                      e.target.value
                    )
                  }
                  onKeyDown={
                    handleLocationKeyDown
                  }
                  placeholder="Search location"
                  className="outline-none text-sm bg-transparent w-full"
                />

                {loadingLocation && (
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
                )}

              </div>

              {/* =================================================
                  LOCATION SUGGESTIONS
              ================================================= */}

              {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-[48px] bg-white border border-gray-200 rounded-lg shadow-lg z-[100] max-h-[250px] overflow-y-auto">

                  {suggestions.map(
                    (suggestion, index) => (
                      <button
                        type="button"
                        key={
                          suggestion.placeId ||
                          suggestion.id ||
                          index
                        }
                        onClick={() =>
                          handleSelectLocation(
                            suggestion
                          )
                        }
                        className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                      >

                        <p className="text-sm font-medium text-gray-800">

                          {suggestion.description ||
                            suggestion.address ||
                            suggestion.formattedAddress ||
                            suggestion.name ||
                            suggestion.text ||
                            "Location"}

                        </p>

                        {suggestion.secondaryText && (
                          <p className="text-xs text-gray-500 mt-1">
                            {
                              suggestion.secondaryText
                            }
                          </p>
                        )}

                      </button>
                    )
                  )}

                </div>
              )}

            </div>

            {/* =================================================
                CURRENT LOCATION
            ================================================= */}

            <button
              type="button"
              onClick={
                handleCurrentLocation
              }
              className="border border-black px-4 flex items-center justify-center h-[44px] bg-white hover:bg-gray-100"
              title="Use current location"
            >
              <AiOutlineAim />
            </button>

            {/* =================================================
                SEARCH BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={handleSearch}
              disabled={!selectedSkill}
              className="flex items-center justify-center bg-black text-white px-6 py-2 md:rounded-r-[8px] rounded-b-[8px] md:rounded-b-none hover:bg-gray-800 transition-colors text-[14px] w-full md:w-auto h-[44px] disabled:bg-gray-400 disabled:cursor-not-allowed"
            >

              <span>
                Search Artisans
              </span>

              <IoArrowForwardOutline className="ml-2 text-lg" />

            </button>

          </div>

          {/* =================================================
              FEATURES
          ================================================= */}

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

        {/* =================================================
            RIGHT CONTENT
        ================================================= */}

        <div className="flex flex-col items-center md:flex-row gap-6 mt-6 md:mt-0 md:items-end w-full lg:w-auto">

          {/* PLUMBING CARD */}

          <div className="flex flex-col items-start border border-gray-200 rounded-[14px] overflow-hidden w-full sm:w-[292px] h-[362px] p-[16px] bg-white">

            <img
              src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1770420324/LandingPage_aqguza.png"
              alt="Plumbing Service"
              className="w-full h-[192px] object-cover"
            />

            <div className="flex items-center gap-1 mt-[36px]">

              <span className="text-[#FDC700] text-lg">
                ★
              </span>

              <span className="font-medium text-textColour text-[14px]">
                4.9
              </span>

              <span className="font-medium text-textColour text-[14px]">
                Rating
              </span>

            </div>

            <p className="pb-4 pt-[36px] font-semibold text-textGray">
              Plumbing Services
            </p>

          </div>

          {/* ELECTRICAL CARD */}

          <div className="flex flex-col items-start border border-gray-200 rounded-[14px] overflow-hidden w-full sm:w-[292px] h-[330px] p-[16px] bg-white">

            <img
              src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1770420324/LandingPage_1_vtrxai.png"
              alt="Electrical Service"
              className="w-full h-[192px] object-cover"
            />

            <div className="flex items-center gap-1 mt-[36px]">

              <span className="text-[#FDC700] text-lg">
                ★
              </span>

              <span className="font-medium text-textColour text-[14px]">
                4.8
              </span>

              <span className="font-medium text-textColour text-[14px]">
                Rating
              </span>

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
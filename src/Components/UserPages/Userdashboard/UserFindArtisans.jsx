import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuSlidersHorizontal, LuArrowRight } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import AvailableArtisans from "../../UserPages/Userdashboard/AvailableArtisans";

const UserFindArtisans = () => {
  const [skills, setSkills] = useState([]);
  const [showSkills, setShowSkills] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");

  const [selectedSkillId, setSelectedSkillId] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [page, setPage] = useState(1);
const [limit] = useState(10);

const [pagination, setPagination] = useState({
  total: 0,
  totalPages: 1,
});
const [filters, setFilters] = useState({
  verifiedOnly: false,
  premiumOnly: false,
  experience: "",
  rating: "",
  distance: "",
});

  // LOCATION STATES
  const [location, setLocation] = useState(""); 
  const [latitude, setLatitude] = useState(null);
const [longitude, setLongitude] = useState(null);
  const [suggestions, setSuggestions] = useState([]); 

  const [artisans, setArtisans] = useState([]);
  const [searched, setSearched] = useState(false);
  const [showNoArtisanModal, setShowNoArtisanModal] = useState(false);

  const debounceRef = useRef(null);
  const sessionTokenRef = useRef("");

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

        const sortedSkills = [...skillsData].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setSkills(sortedSkills);

      } catch (err) {
        console.log(err);
      }
    };

    fetchSkills();
  }, []);

   useEffect(() => {
  if (!searched) return;

  handleSearch();
}, [page]);

  // ================= LOCATION SEARCH =================
  const searchLocation = async (value) => {

    setLocation(value);

    if (value.length < 3) {
      setSuggestions([]);
      sessionTokenRef.current = "";
      return;
    }

    if (!sessionTokenRef.current) {
      sessionTokenRef.current = uuidv4();
    }

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {

      try {

        const res = await axios.post(
          "https://skillzonet-backend-auth-v1.onrender.com/api/location/search-location",
          {
            input: value,
            sessionToken: sessionTokenRef.current,
          }
        );

        setSuggestions(res.data.suggestions || []);

      } catch (err) {
        console.log(err);
      }

    }, 400);
  };

const handleSearch = async () => {
 
  setSearched(true); 
  console.log("===== SEARCH REQUEST =====");
console.log({
  latitude,
  longitude,
  skillId: selectedSkillId,
  radiusInKm: filters.distance || 15,
});

  try {
    const res = await axios.get(
      "https://skillzonet-backend-auth-v1.onrender.com/api/job/artisans/nearby",
      {
        params: {
          latitude,
          longitude,
          skillId: selectedSkillId,
          radiusInKm: filters.distance || 15, 
            isSubSkill: false,
      page,
      limit,
        },
      }
    );

    console.log("===== FULL RESPONSE =====");
console.log(res.data);
    const artisansData =
  res.data?.data?.artisans ||
  res.data?.data?.data ||
  [];

const meta = res.data?.data?.meta || {};

setPagination({
  total: meta.total || 0,
  totalPages: meta.totalPages || 1,
});
      console.log("===== ARTISANS =====");
console.log(artisansData);
console.log("Number of artisans:", artisansData.length);

    if (artisansData.length > 0) {
      setArtisans(artisansData);
      setShowNoArtisanModal(false);
    } else {
      setArtisans([]);
      setShowNoArtisanModal(true);
    }

  } catch (err) {
    console.log(err.response?.data || err.message);

    setArtisans([]);
    setShowNoArtisanModal(true);
  }
};



  return (
    <main className="pt-[85px] px-4">

      {/* Search Bar section */}
      <section className="flex flex-col sm:flex-row items-center gap-[8px]">

        <div className="relative w-full max-w-[1060px]">

          <div
            className="w-full flex items-center justify-between px-[10px] py-[9px] rounded-[8px] bg-[#F3F3F5] cursor-pointer"
            onClick={() => setShowSkills(!showSkills)}
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

          {showSkills && (
            <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">

              {skills.length > 0 ? (
                skills.map((skill) => (
                  <div
                    key={skill._id}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
  console.log("Selected Skill");
  console.log(skill);

  setSelectedSkill(skill.name);
  setSelectedSkillId(skill.id);

  setShowSkills(false);
}}
                  >
                    {skill.name}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500">
                  No skills found
                </div>
              )}

            </div>
          )}

        </div>

       <button
  onClick={() => setShowFilters(true)}
  className="w-[36px] h-[36px] rounded-[8px] border flex items-center justify-center"
>
  <LuSlidersHorizontal className="text-[18px]" />
</button>
      </section>

      {/* Search Bar down */}
      <section className="flex flex-col sm:flex-row items-center gap-[10px] mt-[16px]">

        <div className="relative w-full flex items-center gap-[5px] max-w-[750px] px-[10px] py-[9px] rounded-[8px] bg-[#F3F3F5]">

          <button className="text-[18px]">
            <GrLocation />
          </button>

          <input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => searchLocation(e.target.value)}
            className="bg-transparent w-full text-[14px] outline-none"
          />

          {suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">

              {suggestions.map((item) => (

                <div
                  key={item.placeId}
                 onClick={async () => {
  try {

    const res = await axios.post(
      "https://skillzonet-backend-auth-v1.onrender.com/api/location/search-location",
      {
        placeId: item.placeId,
        sessionToken: sessionTokenRef.current,
      }
    );

    const place = res.data;

    setLocation(place.formattedAddress);

    setLatitude(place.lat);

    setLongitude(place.lng);
    console.log("Selected Location");
console.log({
  address: place.formattedAddress,
  latitude: place.lat,
  longitude: place.lng,
});

    setSuggestions([]);

    sessionTokenRef.current = "";

  } catch (err) {
    console.log(err);
  }
}}
                >
                  {item.name}
                </div>

              ))}

            </div>
          )}

        </div>

      <button
  onClick={handleSearch}
  className="w-full sm:w-[200px] h-[36px] flex items-center gap-[10px] rounded-[8px] bg-black text-white justify-center"
>
          <p>Search</p>
          <LuArrowRight className="text-[18px]" />
        </button>

      </section>
<AvailableArtisans
  artisans={artisans}
  searched={searched}
   totalResults={pagination.total}
/>

{pagination.totalPages > 1 && (
  <div className="flex justify-center items-center gap-2 mt-8">
    <button
      disabled={page === 1}
      onClick={() => setPage((prev) => prev - 1)}
      className={`px-4 py-2 rounded border ${
        page === 1
          ? "bg-gray-200 cursor-not-allowed"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      Previous
    </button>

    {Array.from(
      { length: pagination.totalPages },
      (_, i) => i + 1
    ).map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => setPage(pageNumber)}
        className={`w-10 h-10 rounded ${
          page === pageNumber
            ? "bg-black text-white"
            : "bg-white border hover:bg-gray-100"
        }`}
      >
        {pageNumber}
      </button>
    ))}

    <button
      disabled={page === pagination.totalPages}
      onClick={() => setPage((prev) => prev + 1)}
      className={`px-4 py-2 rounded border ${
        page === pagination.totalPages
          ? "bg-gray-200 cursor-not-allowed"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      Next
    </button>
  </div>
)}

{showNoArtisanModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">

    <div className="bg-white rounded-xl w-[360px] p-6 relative">

      <button
        onClick={() => {
          setShowNoArtisanModal(false);
          setSearched(false);
        }}
        className="absolute right-4 top-3 text-2xl"
      >
        ×
      </button>

      <h2 className="text-xl font-semibold text-center mb-3">
        No Artisan Found
      </h2>

      <p className="text-center text-gray-500">
        No artisan was found for this location.
        Please try another location or another skill.
      </p>

      <button
        onClick={() => {
          setShowNoArtisanModal(false);
          setSearched(false);
        }}
        className="mt-6 w-full bg-black text-white rounded-lg py-2"
      >
        OK
      </button>

    </div>

  </div>
)}
      {showFilters && (
  <div className="fixed inset-0 bg-black/40 flex justify-end z-50">

    <div className="bg-white w-[360px] h-full p-6 overflow-y-auto">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Filters
        </h2>

        <button
          onClick={() => setShowFilters(false)}
          className="text-2xl"
        >
          ×
        </button>
      </div>

      {/* Verified */}

      <div className="mb-6">

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) =>
              setFilters({
                ...filters,
                verifiedOnly: e.target.checked,
              })
            }
          />

          <span>Verified Artisans Only</span>

        </label>

      </div>

      {/* Premium */}

      <div className="mb-6">

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={filters.premiumOnly}
            onChange={(e) =>
              setFilters({
                ...filters,
                premiumOnly: e.target.checked,
              })
            }
          />

          <span>Premium Members Only</span>

        </label>

      </div>

      {/* Experience */}

      <div className="mb-6">

        <label className="block mb-2 font-medium">
          Experience
        </label>

        <select
          value={filters.experience}
          onChange={(e) =>
            setFilters({
              ...filters,
              experience: e.target.value,
            })
          }
          className="w-full border rounded-lg p-2"
        >
          <option value="">Any</option>
          <option value="1">1+ Years</option>
          <option value="3">3+ Years</option>
          <option value="5">5+ Years</option>
          <option value="10">10+ Years</option>
        </select>

      </div>

      {/* Rating */}

      <div className="mb-6">

        <label className="block mb-2 font-medium">
          Rating
        </label>

        <select
          value={filters.rating}
          onChange={(e) =>
            setFilters({
              ...filters,
              rating: e.target.value,
            })
          }
          className="w-full border rounded-lg p-2"
        >
          <option value="">Any</option>
          <option value="5">5 ★</option>
          <option value="4.5">4.5 ★ & Above</option>
          <option value="4">4 ★ & Above</option>
          <option value="3">3 ★ & Above</option>
        </select>

      </div>

      {/* Distance */}

      <div className="mb-8">

        <label className="block mb-2 font-medium">
          Distance
        </label>

        <select
          value={filters.distance}
          onChange={(e) =>
            setFilters({
              ...filters,
              distance: e.target.value,
            })
          }
          className="w-full border rounded-lg p-2"
        >
          <option value="">Anywhere</option>
          <option value="2">Within 2 km</option>
          <option value="5">Within 5 km</option>
          <option value="10">Within 10 km</option>
          <option value="20">Within 20 km</option>
        </select>

      </div>

      {/* Buttons */}

      <div className="flex gap-3">

        <button
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

        <button
          onClick={() => {
            console.log(filters);
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
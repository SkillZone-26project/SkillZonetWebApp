import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { LuCamera, LuPhone, LuCalendar, LuSquarePen } from "react-icons/lu";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios"; 
import { TiPen } from "react-icons/ti";


const Profile = () => {

  const [profilePic, setProfilePic] = useState(
    "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1772140352/Primitive.img_5_sqmsfy.png"
  );

  const [artisan, setArtisan] = useState(null);
  const [skills, setSkills] = useState([]); 
  const [showEditModal, setShowEditModal] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
// const [sessionToken, setSessionToken] = useState("");
// const sessionTokenRef = useRef("");

const [editForm, setEditForm] = useState({
  businessName: "",
  email: "",
  phone: "",
  location: "",
  bio: "",

  city: "",
  state: "",
  latitude: null,
  longitude: null,
});

  const fileInputRef = useRef(null);

  const debounceRef = useRef(null);
const sessionTokenRef = useRef("");

  const shortAddress = artisan?.address
    ? artisan.address.split(",").slice(0, 2).join(",")
    : "";

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  // ===================== GET PROFILE =====================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://skillzonet-backend-auth-v1.onrender.com/api/artisans/get-profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data.artisan;
        setArtisan(data);

        // ✅ FIX: always sync profile image properly
        setProfilePic(
          data?.profilePic ||
          "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1772140352/Primitive.img_5_sqmsfy.png"
        );

      } catch (err) {
        console.log("GET PROFILE ERROR:", err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, []);

  // ===================== GET SKILLS =====================
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://skillzonet-backend-auth-v1.onrender.com/api/artisans/skills",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data =
          res.data?.skills ||
          res.data?.artisan?.skills ||
          res.data?.result?.skills ||
          res.data?.data ||
          [];

        setSkills(Array.isArray(data) ? data : []);

      } catch (err) {
        console.log("GET SKILLS ERROR:", err.response?.data || err.message);
      }
    };

    fetchSkills();
  }, []);

  // ===================== UPLOAD IMAGE =====================
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    // ✅ INSTANT UI UPDATE
    setProfilePic(previewUrl);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "https://skillzonet-backend-auth-v1.onrender.com/api/artisans/profile-picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl =
        res.data?.profilePic ||
        res.data?.artisan?.profilePic ||
        res.data?.data?.profilePic ||
        res.data?.url;

      if (imageUrl) {
        // ✅ CRITICAL FIX: update BOTH states
        setProfilePic(imageUrl);

        setArtisan(prev => ({
          ...prev,
          profilePic: imageUrl
        }));
      }

    } catch (err) {
      console.log("Upload failed:", err.response?.data || err.message);

      // rollback on failure
      setProfilePic(artisan?.profilePic);
    }
  };

  // ===================== JOIN DATE =====================
  const joinedDate = artisan?.createdAt ? new Date(artisan.createdAt) : null;
  const joinedMonth = joinedDate?.toLocaleString("default", { month: "long" });
  const joinedYear = joinedDate?.getFullYear();

  const handleUpdateProfile = async () => {
  try {
    const token = localStorage.getItem("token"); 
    console.log("TOKEN:", token);

    const res = await axios.put(
      "https://skillzonet-backend-auth-v1.onrender.com/api/artisans/profile",
    {
  phone: editForm.phone,
  bio: editForm.bio,

  address: editForm.location,
  city: editForm.city,
  state: editForm.state,
  latitude: editForm.latitude,
  longitude: editForm.longitude,
},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("PROFILE UPDATED:", res.data);

   setArtisan((prev) => ({
  ...prev,

  phone: editForm.phone,
  address: editForm.location,
  bio: editForm.bio,

  city: editForm.city,
  state: editForm.state,
  latitude: editForm.latitude,
  longitude: editForm.longitude,
}));

    setShowEditModal(false);

  } catch (err) {
    console.log(
      "PROFILE UPDATE ERROR:",
      err.response?.data || err.message
    );
  }
};

// ===================== SEARCH LOCATION =====================
const searchLocation = async (value) => {
  console.log("Typing:", value);

  setEditForm((prev) => ({
    ...prev,
    location: value,
  }));

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
      console.log("Sending request...");

      const res = await axios.post(
        "https://skillzonet-backend-auth-v1.onrender.com/api/location/search-location",
        {
          input: value,
          sessionToken: sessionTokenRef.current,
        }
      );

      console.log("API Response:", res.data);

      setSuggestions(res.data.suggestions || []);

    } catch (err) {
      console.log("Error:", err.response?.data || err.message);
    }
  }, 400);
};
  return (
  <div className="h-[calc(100vh-85px)] bg-white mt-[85px] px-4 rounded-[20px] p-[24px] ml-[100px]">

    {/* ================= PROFILE CARD ================= */}
   <div className='left and middle border min-h-[361px] p-[24px] rounded-[14px] w-[855px]'>

      {/* ================= PROFILE HEADER ================= */}
<div className="topBox flex justify-between items-start border-b pb-[20px]">

        {/* ================= PROFILE IMAGE SECTION ================= */}
        <div className='left flex gap-[15px]'>

          {/* Profile Image */}
          <div className="relative w-[128px] h-[128px]">

            <img
              src={profilePic}
              alt=""
              className="w-[128px] h-[128px] rounded-[64px]"
            />

            {/* Upload Profile Picture Button */}
            <div
              onClick={handleCameraClick}
              className="absolute bottom-0 right-0 bg-black text-white w-[40px] h-[40px] rounded-[20px] flex items-center justify-center cursor-pointer"
            >
              <LuCamera />
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            {/* Premium Membership Badge */}
            <div className='mt-[16px]'>
              <button className='bg-[#FE9A00] flex items-center justify-center w-[119px] text-[12px] text-white font-normal rounded-[8px]'>
                Premium Member
              </button>
            </div>

          </div>

          {/* ================= ARTISAN DETAILS ================= */}
          <div>

            {/* Full Name */}
            <p className='text-[24px] font-semibold text-textColor mt-[5px]'>
              {artisan?.fullName}
            </p>

            {/* Business Name & Role */}
            <p className='text-[16px] font-normal text-textGray mt-[5px]'>
              <span>{artisan?.businessName || "Artisan"} </span>
              <span>{artisan?.role || "Services"}</span>
            </p>

            {/* Role */}
            {/* <p className='text-[14px] font-normal text-textGray mt-[5px]'>
              {artisan?.role}
            </p> */}

            {/* Email */}
            <div className='flex items-center gap-[10px] text-[14px] font-normal mt-[10px]'>
              <HiOutlineEnvelope className='text-textGray' />
              <p className='text-textColor'>{artisan?.email}</p>
            </div>

            {/* Location */}
            <div className='flex items-center gap-[10px] text-[14px] font-normal w-[260px] mt-[10px]'>
              <CiLocationOn className='text-textGray text-[15px] flex-shrink-0 mt-1' />
              <p className='text-textColor'>
                <span>{shortAddress}</span>,
                <span>{artisan?.city}</span>,
                <span> {artisan?.state}</span>,
                <span> Nigeria</span>
              </p>
            </div>

            {/* Bio Input */}
         <div className="flex items-start gap-[5px] mt-[10px]">
  <TiPen className='text-[15px] flex-shrink-0 mt-1 text-textGray' />
  <p className='text-textColor bg-[#ECEEF2] rounded-[10px] px-[8px] py-[6px] max-h-[180px] overflow-y-auto break-words'>
    {artisan?.bio || "No bio added yet"}
  </p>
</div>

          </div>

        </div>

        {/* ================= CONTACT & EDIT PROFILE SECTION ================= */}
    <div className="rightTop flex justify-between w-[350px] items-start">

          {/* Contact Information */}
          <div className="flex flex-col pt-[85px]">

            {/* Phone Number */}
            <div className='flex gap-[10px] items-center'>
              <LuPhone />
              <p className='text-[14px]'>{artisan?.phone}</p>
            </div>

            {/* Join Date */}
            <div>
              <div className='flex items-center gap-[10px] mt-[15px] w-[150px]'>
                <LuCalendar />
                <p>Joined {joinedMonth}</p>
              </div>

              <p className='ml-[30px]'>{joinedYear}</p>
            </div>

          </div>

          {/* Edit Profile Button */}
         <button
  onClick={() => {
   setEditForm({
  phone: artisan?.phone || "",
  location: artisan?.address || "",
  bio: artisan?.bio || "",

  city: artisan?.city || "",
  state: artisan?.state || "",
  latitude: artisan?.latitude || null,
  longitude: artisan?.longitude || null,
});

    setShowEditModal(true);
  }}
  className='flex items-center justify-center gap-[10px] w-[127px] h-[36px] rounded-[8px] bg-black text-white'
>
  <LuSquarePen />
  <p>Edit Profile</p>
</button>

        </div>

      </div>

      {/* ================= STATISTICS CARD ================= */}
      <div className="secondDown flex gap-[16px] mt-[50px]">

        {/* Jobs Completed Card */}
        <div className="box1 w-[187px] flex flex-col items-center">
          <p className='text-[24px] font-semibold text-textColor'>
            {artisan?.totalJobs || 342}
          </p>
          <p className='text-[14px] font-normal text-textGray'>
            Jobs Completed
          </p>
        </div>

        {/* Average Rating Card */}
        <div className="box2 w-[187px] flex flex-col items-center">
          <p className='text-[24px] font-semibold text-textColor'>
            {artisan?.averageRating || 4.8}
          </p>
          <p className='text-[14px] font-normal text-textGray'>
            Average Rating
          </p>
        </div>

        {/* Total Earned Card */}
        <div className="box1 w-[187px] flex flex-col items-center">
          <p className='text-[24px] font-semibold text-textColor'>
            ₦1.2<span>M</span>
          </p>
          <p className='text-[14px] font-normal text-textGray'>
            Total Earned
          </p>
        </div>

        {/* Years Experience Card */}
        <div className="box1 w-[187px] flex flex-col items-center">
          <p className='text-[24px] font-semibold text-textColor'>
            {artisan?.yearsExperience || 10}
          </p>
          <p className='text-[14px] font-normal text-textGray'>
            Years Experience
          </p>
        </div>

      </div>

    </div>

    {/* ================= SKILLS & SERVICES CARD ================= */}
    <div className="middleBox w-[855px] border px-[24px] py-[26px] mt-[24px] rounded-[14px]">

      {/* Skills Header */}
      <div className='flex justify-between'>
        <p>Skills & Services</p>

        <button className='flex items-center justify-center gap-[10px] w-[77px] h-[36px] rounded-[8px] text-[14px] text-textColor border'>
          <LuSquarePen />
          <p>Edit</p>
        </button>
      </div>

      {/* Skills List */}
      <div className="buttons mt-[20px] flex gap-[10px] flex-wrap">

        {/* Plumbing Skill */}
        <button className='flex items-center justify-center gap-[10px] w-[87.95px] h-[36px] rounded-[8px] text-[14px] bg-[#ECEEF2] text-textColor border'>
          <p>Plumbing</p>
        </button>

        {/* Pipe Fitting Skill */}
        <button className='flex items-center justify-center gap-[10px] w-[95.95px] h-[36px] rounded-[8px] text-[14px] bg-[#ECEEF2] text-textColor border'>
          <p>Pipe Fitting</p>
        </button>

        {/* Water Heater Installation Skill */}
        <button className='flex items-center justify-center gap-[10px] w-[204.69px] h-[36px] rounded-[8px] text-[14px] bg-[#ECEEF2] text-textColor border'>
          <p>Water Heater Installation</p>
        </button>

      </div>

    </div>


    {/* ================= Verification Status CARD ================= */}
    <div className="middleBox w-[855px] border px-[24px] py-[26px] mt-[24px] rounded-[14px]">

      {/*  Header */}
      <div className='flex justify-between'>
        <p>Verification Status</p>
      </div>

      {/* Box */}
      <div className='w-[798px] h-[68px] rounded-[10px] bg-[#F3F3F5] flex items-center justify-between pl-[12px] pr-[12px] mt-[15px]'>
        <div>
          <p className='text-[16px] text-textColor'>Identity Verification</p>
          <p className='text-[14px] font-normal text-textGray'>BVN & ID Card</p>
        </div>
        <div className='bg-[#00C950] text-white flex items-center px-[7px] py-[2px] rounded-[8px]'>
          <button>Verified</button>
        </div>
      </div>
    {/* End */}
      {/* Box */}
      <div className='w-[798px] h-[68px] rounded-[10px] bg-[#F3F3F5] flex items-center justify-between pl-[12px] pr-[12px] mt-[15px]'>
        <div>
          <p className='text-[16px] text-textColor'>Business License</p>
          <p className='text-[14px] font-normal text-textGray'>CAC Registration</p>
        </div>
        <div className='bg-[#00C950] text-white flex items-center px-[7px] py-[2px] rounded-[8px]'>
          <button>Verified</button>
        </div>
      </div>
    {/* End */}
      {/* Box */}
      <div className='w-[798px] h-[68px] rounded-[10px] bg-[#F3F3F5] flex items-center justify-between pl-[12px] pr-[12px] mt-[15px]'>
        <div>
          <p className='text-[16px] text-textColor'>Bank Account</p>
          <p className='text-[14px] font-normal text-textGray'>For withdrawals</p>
        </div>
        <div className='bg-[#00C950] text-white flex items-center px-[7px] py-[2px] rounded-[8px]'>
          <button>Verified</button>
        </div>
      </div>
    {/* End */}

    </div>
    {/* ================= Account Settings CARD ================= */}
    <div className="middleBox w-[855px] border px-[24px] py-[26px] mt-[24px] rounded-[14px] mb-[50px]">

      {/*  Header */}
      <div className='flex justify-between'>
        <p>Account Settings</p>
      </div>

      {/* Box */}
      <button className='w-[798px] h-[36px] border-[2px] rounded-[10px] flex items-center justify-between pl-[12px] pr-[12px] mt-[15px]'>
        <div>
          <p className='text-[16px] text-textColor'>Change Password</p>
        </div>
      </button>
    {/* End */}
      {/* Box */}
      <button className='w-[798px] h-[36px] border-[2px] rounded-[10px] flex items-center justify-between pl-[12px] pr-[12px] mt-[15px]'>
        <div>
          <p className='text-[16px] text-textColor'>Notification Preferences</p>
        </div>
      </button>
    {/* End */}
      {/* Box */}
      <button className='w-[798px] h-[36px] border-[2px] rounded-[10px] flex items-center justify-between pl-[12px] pr-[12px] mt-[15px]'>
        <div>
          <p className='text-[16px] text-textColor'>Privacy Settings</p>
        </div>
      </button>
    {/* End */}
      {/* Box */}
      <button className='w-[798px] h-[36px] border-[2px] rounded-[10px] flex items-center justify-between pl-[12px] pr-[12px] mt-[15px]'>
        <div>
          <p className='text-[16px] text-[#E7000B]'>Delete Account</p>
        </div>
      </button>
    {/* End */}
     
    

    </div>


{showEditModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white w-[600px] rounded-[14px] p-[24px]">

      <h2 className="text-[20px] font-semibold mb-[20px]">
        Edit Profile
      </h2>

      <div className="flex flex-col gap-[15px]">

       

        <div>
          <label>Phone</label>

          <input
            type="text"
            value={editForm.phone}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                phone: e.target.value,
              })
            }
            className="w-full border rounded-[8px] h-[40px] px-[10px]"
          />
        </div>

        <div className="relative">
  <label>Location</label>

  <input
    type="text"
    value={editForm.location}
    placeholder="Start typing location..."
    className="w-full border rounded-[8px] h-[40px] px-[10px]"
   onChange={(e) => searchLocation(e.target.value)}
   />

  {suggestions.length > 0 && (
    <div className="absolute left-0 right-0 bg-white border rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">

      {suggestions.map((item) => (
        <div
          key={item.placeId}
          className="p-3 hover:bg-gray-100 cursor-pointer"
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

              setEditForm((prev) => ({
                ...prev,
                location: place.formattedAddress,
                city: place.city,
                state: place.state,
                latitude: place.lat,
                longitude: place.lng,
              }));

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

        <div>
          <label>Bio</label>

          <textarea
            rows="4"
            value={editForm.bio}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                bio: e.target.value,
              })
            }
            className="w-full border rounded-[8px] p-[10px]"
          />
        </div>

        <div className="flex justify-end gap-[10px] mt-[10px]">

          <button
            onClick={() => setShowEditModal(false)}
            className="border px-[20px] py-[8px] rounded-[8px]"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdateProfile}
            className="bg-black text-white px-[20px] py-[8px] rounded-[8px]"
          >
            Save
          </button>

        </div>

      </div>

    </div>

  </div>
)}

  </div>
)
}

export default Profile
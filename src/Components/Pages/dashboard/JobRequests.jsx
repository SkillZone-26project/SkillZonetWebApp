import { useEffect, useState } from "react";
import {
  LuCalendar,
  LuMapPin,
  LuClock4,
  LuCircleCheckBig,
  LuCircleX,
  LuEye,
} from "react-icons/lu";
import axios from "axios";

import CompleteInformation from "./CompleteInformation";

const JobRequests = () => {
  const [newRequests, setNewRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [requestTab, setRequestTab] = useState("new");
  const [selectedJob, setSelectedJob] = useState(null);

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const limit = 10;

  /* =====================================================
     FALLBACK DATA
     This displays ONLY when the API succeeds but there
     are no real job requests.
  ====================================================== */

  const defaultRequests = [
    {
      id: "default-1",
      name: "David Brown",
      role: "Client",
      image:
        "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352177/Primitive.img_rd3rwi.png",
      title: "Bathroom Renovation",
      description:
        "Need to install a new water heater in the bathroom. The old one stopped working.",
      date: "Thursday, January 15 2026",
      location: "Ikeja, Lagos",
      requestedTime: "05:45 PM",
      price: 45000,
      status: "ASSIGNED",
    },

    {
      id: "default-2",
      name: "Michael Okonkwo",
      role: "Client",
      image:
        "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352175/Primitive.img_1_hblo6a.png",
      title: "Water Heater Installation",
      description:
        "Need to install a new water heater in the bathroom.",
      date: "Friday, January 16 2026",
      location: "Ikoyi, Lagos",
      requestedTime: "09:30 PM",
      price: 35000,
      status: "ASSIGNED",
    },

    {
      id: "default-3",
      name: "Fatima Bello",
      role: "Client",
      image:
        "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352175/Primitive.img_1_hblo6a.png",
      title: "Sink Leak Repair",
      description:
        "Leaking pipe under the kitchen sink needs urgent repair.",
      date: "Wednesday, January 14 2026",
      location: "Surulere, Lagos",
      requestedTime: "11:15 AM",
      price: 15000,
      status: "ASSIGNED",
    },
  ];

  /* =====================================================
     RESPONDED FALLBACK
     This is still static for now.
  ====================================================== */

  const respondedRequests = [
    {
      id: "responded-1",
      name: "David Brown",
      role: "Client",
      image:
        "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352177/Primitive.img_rd3rwi.png",
      title: "Bathroom Renovation",
      description:
        "Need to install a new water heater in the bathroom.",
      date: "Thursday, January 15 2026",
      location: "Ikeja, Lagos",
      requestedTime: "05:45 PM",
      price: 45000,
      status: "accepted",
    },

    {
      id: "responded-2",
      name: "Michael Okonkwo",
      role: "Client",
      image:
        "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352175/Primitive.img_1_hblo6a.png",
      title: "Water Heater Installation",
      description:
        "Need to install a new water heater in the bathroom.",
      date: "Friday, January 16 2026",
      location: "Ikoyi, Lagos",
      requestedTime: "09:30 PM",
      price: 35000,
      status: "declined",
    },
  ];

  /* =====================================================
     GET LOGGED-IN ARTISAN ID
  ====================================================== */

  const getArtisanId = () => {
    try {
      // First check artisanId saved directly
      const storedArtisanId =
        localStorage.getItem("artisanId");

      if (storedArtisanId) {
        console.log(
          "Artisan ID from localStorage:",
          storedArtisanId
        );

        return storedArtisanId;
      }

      // Fallback to user object
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      console.log("Logged in user:", user);

      return (
        user?.id ||
        user?.userId ||
        user?.artisanId ||
        user?.artisan?.id ||
        null
      );
    } catch (error) {
      console.error(
        "Could not read logged-in user:",
        error
      );

      return null;
    }
  };

  /* =====================================================
     FORMAT JOB DATA
  ====================================================== */

  const formatJob = (job) => {
    const scheduledDate = job.scheduledAt
      ? new Date(job.scheduledAt)
      : null;

    return {
      id: job.id,

      name:
        job.user?.fullName ||
        "Client",

      role: "Client",

      image:
        job.user?.profilePic ||
        "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352177/Primitive.img_rd3rwi.png",

      title:
        job.title ||
        "Job Request",

      description:
        job.description ||
        "",

      date: scheduledDate
        ? scheduledDate.toDateString()
        : job.createdAt
        ? new Date(job.createdAt).toDateString()
        : "Date not available",

      location:
        job.city && job.state
          ? `${job.city}, ${job.state}`
          : job.address ||
            "Location not available",

      requestedTime: scheduledDate
        ? scheduledDate.toLocaleTimeString(
            "en-US",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          )
        : "Not scheduled",

      price:
        job.budgetAmount || 0,

      status:
        job.status || "ASSIGNED",

      email:
        job.user?.email || "",

      phone:
        job.user?.phone || "",

      address:
        job.address || "",

      latitude:
        job.latitude,

      longitude:
        job.longitude,

      scheduledAt:
        job.scheduledAt,

      subSkill:
        job.subSkill?.name || "",

      subSkillId:
        job.subSkillId ||
        job.subSkill?.id ||
        "",

      skill:
        job.subSkill?.skill?.name ||
        "",
    };
  };

  /* =====================================================
     FETCH JOB REQUESTS
  ====================================================== */

  const fetchRequests = async (
    pageNumber = 1
  ) => {
    try {
      setLoading(true);

      // Clear previous API error before a new request
      setError("");

      const token =
        localStorage.getItem("token");

      const artisanId =
        getArtisanId();

      console.log(
        "ARTISAN ID:",
        artisanId
      );

      console.log(
        "TOKEN EXISTS:",
        !!token
      );

      /* ---------------------------------------------
         NO ARTISAN ID
      --------------------------------------------- */

      if (!artisanId) {
        console.log(
          "No artisan ID found."
        );

        setError(
          "Artisan information could not be found."
        );

        setNewRequests([]);
        setTotalCount(0);

        return;
      }

      /* ---------------------------------------------
         NO TOKEN
      --------------------------------------------- */

      if (!token) {
        console.log(
          "No authentication token found."
        );

        setError(
          "Authentication token not found. Please login again."
        );

        setNewRequests([]);
        setTotalCount(0);

        return;
      }

     /* ---------------------------------------------
   API REQUEST
--------------------------------------------- */

const response = await axios.get(
  `https://skillzonet-backend-auth-v1.onrender.com/api/artisans/jobs/requests/${artisanId}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: pageNumber,
      limit: limit,
    },
  }
);

console.log(
  "JOB REQUEST API RESPONSE:",
  response.data
);

      /* ---------------------------------------------
         BACKEND DATA
      --------------------------------------------- */

      const backendData =
        response.data?.data;

      const pendingRequests =
        backendData?.pendingRequests ||
        [];

      const backendTotalCount =
        backendData?.totalCount ||
        0;

      setTotalCount(
        backendTotalCount
      );

      /* ---------------------------------------------
         REAL REQUESTS EXIST
      --------------------------------------------- */

      if (
        pendingRequests.length > 0
      ) {
        const formattedRequests =
          pendingRequests.map(
            formatJob
          );

        console.log(
          "FORMATTED JOB REQUESTS:",
          formattedRequests
        );

        if (pageNumber === 1) {
          // Replace default data with real backend data
          setNewRequests(
            formattedRequests
          );
        } else {
          // Add next page to existing requests
          setNewRequests(
            (prev) => [
              ...prev,
              ...formattedRequests,
            ]
          );
        }

        return;
      }

      /* ---------------------------------------------
         NO REAL REQUESTS
         
         API succeeded but there are no pending jobs.
         In this case, show your default/sample data.
      --------------------------------------------- */

      if (pageNumber === 1) {
        setNewRequests(
          defaultRequests
        );
      }

    } catch (error) {
      console.error(
        "FETCH JOB REQUEST ERROR:",
        error.response?.data ||
          error.message
      );

      /* ---------------------------------------------
         BACKEND/API ERROR
         
         IMPORTANT:
         Do NOT show defaultRequests here.
      --------------------------------------------- */

      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Unable to fetch job requests. Please try again.";

      setError(
        backendMessage
      );

      /*
        If this is the first page, clear the list
        so default data does not appear when the
        backend has failed.
      */

      if (pageNumber === 1) {
        setNewRequests([]);
        setTotalCount(0);
      }

    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     VIEW JOB
  ====================================================== */

  const handleView = (job) => {
    setSelectedJob(job);
  };

  /* =====================================================
     LOAD MORE
  ====================================================== */

  const handleLoadMore = () => {
    const nextPage = page + 1;

    setPage(nextPage);

    fetchRequests(nextPage);
  };

  /* =====================================================
     RUN WHEN PAGE LOADS
  ====================================================== */

  useEffect(() => {
    fetchRequests(1);
  }, []);

  /* =====================================================
     CURRENT TAB DATA
  ====================================================== */

  const currentData =
    requestTab === "new"
      ? newRequests
      : respondedRequests;

  /* =====================================================
     UI
  ====================================================== */

  return (
    <main className="pt-[85px]">

      {/* =================================================
          HEADER
      ================================================= */}

      <div>
        <h2 className="text-2xl font-semibold">
          Job Requests
        </h2>

        <p className="text-textGray">
          Review and respond to incoming job requests
        </p>
      </div>

      {/* =================================================
          TABS
      ================================================= */}

      <div className="flex gap-[10px] w-[353px] h-[36px] bg-[#ECECF0] rounded-[14px] text-[14px] font-medium p-[4px] mt-5">

        {/* NEW REQUESTS */}

        <button
          onClick={() =>
            setRequestTab("new")
          }
          className={`flex items-center justify-center gap-[20px] flex-1 rounded-[14px] transition-all ${
            requestTab === "new"
              ? "bg-white text-textColor"
              : "text-textColor"
          }`}
        >
          <span>
            New Requests
          </span>

          <span className="w-[25px] h-[22px] bg-black text-white rounded-[8px] flex items-center justify-center text-[12px]">
            {newRequests.length}
          </span>
        </button>

        {/* RESPONDED */}

        <button
          onClick={() =>
            setRequestTab("responded")
          }
          className={`flex-1 rounded-[14px] transition-all ${
            requestTab === "responded"
              ? "bg-white text-textColor"
              : "text-textColor"
          }`}
        >
          Responded
        </button>
      </div>

      {/* =================================================
          CARDS
      ================================================= */}

      <div className="mt-4">

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (

          <div className="border rounded-xl p-10 text-center text-gray-400">
            Loading job requests...
          </div>

        ) : error ? (

          /* =================================================
             ERROR
          ================================================= */

          <div className="border border-red-200 bg-red-50 rounded-xl p-6 text-center text-red-600">

            <p className="font-medium">
              {error}
            </p>

            <button
              onClick={() => {
                setPage(1);
                fetchRequests(1);
              }}
              className="mt-4 px-5 py-2 bg-black text-white rounded-lg"
            >
              Try Again
            </button>

          </div>

        ) : currentData.length > 0 ? (

          /* =================================================
             REQUEST CARDS
          ================================================= */

          currentData.map((job) => (

            <div
              key={job.id}
              className="border p-4 rounded-lg mt-[16px]"
            >

              {/* ================= HEADER ================= */}

              <div className="flex justify-between">

                <div className="profile flex gap-[16px]">

                  <img
                    src={job.image}
                    alt={job.name}
                    className="w-[48px] h-[48px] rounded-[24px] object-cover"
                  />

                  <div>

                    <p className="text-[18px] font-semibold text-textColor">
                      {job.name}
                    </p>

                    <p className="text-[14px] text-textGray">
                      {job.role}
                    </p>

                  </div>

                </div>

                {/* STATUS */}

                {requestTab === "new" ? (

                  <button className="w-[94px] h-[22px] bg-[#F0B100] text-white text-[12px] rounded-[8px]">
                    New Request
                  </button>

                ) : (

                  <button
                    className={`w-[94px] h-[22px] text-white text-[12px] rounded-[8px] ${
                      job.status === "accepted"
                        ? "bg-[#00C950]"
                        : "bg-[#FB2C36]"
                    }`}
                  >
                    {job.status === "accepted"
                      ? "Accepted"
                      : "Declined"}
                  </button>

                )}

              </div>

              {/* ================= TITLE ================= */}

              <p className="mt-[41px]">
                Title: {job.title}
              </p>

              {/* ================= DETAILS ================= */}

              <div className="flex">

                {/* LEFT */}

                <div className="left mt-[12px] w-[519px]">

                  {/* DATE */}

                  <div className="flex items-center gap-[10px] text-[14px]">

                    <LuCalendar />

                    <p>
                      {job.date}
                    </p>

                  </div>

                  {/* LOCATION */}

                  <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">

                    <LuMapPin />

                    <p>
                      {job.location}
                    </p>

                  </div>

                  {/* TIME */}

                  <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">

                    <LuClock4 />

                    <p>
                      Requested{" "}
                      {job.requestedTime}
                    </p>

                  </div>

                </div>

                {/* RIGHT */}

                <div className="right w-[400px]">

                  <p>
                    Description:
                  </p>

                  <div className="flex items-center gap-[10px] text-[14px]">

                    <p
                      className="
                        text-[14px]
                        text-textGray
                        leading-6
                        max-h-[4.5rem]
                        overflow-y-auto
                        pr-2
                      "
                    >
                      {job.description}
                    </p>

                  </div>

                  {/* PRICE */}

                  <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">

                    <p className="text-[28px]">

                      ₦
                      {Number(
                        job.price || 0
                      ).toLocaleString()}

                    </p>

                  </div>

                </div>

              </div>

              {/* ================= SUB-SKILL ================= */}

              {job.subSkill && (

                <div className="mt-3 text-sm text-gray-500">

                  Service:{" "}

                  <span className="font-medium text-gray-700">
                    {job.subSkill}
                  </span>

                </div>

              )}

              {/* ================= ACTIONS ================= */}

              {requestTab === "new" ? (

                <div className="buttons mt-[25px] flex gap-[10px]">

                  {/* ACCEPT */}

                  <button
                    className="bg-black text-white w-[480px] h-[40px] flex items-center justify-center rounded-[8px] gap-[10px]"
                  >

                    <LuCircleCheckBig />

                    <span>
                      Accept Job
                    </span>

                  </button>

                  {/* DECLINE */}

                  <button
                    className="border w-[480px] h-[40px] flex items-center justify-center rounded-[8px] gap-[10px]"
                  >

                    <LuCircleX />

                    <span>
                      Decline
                    </span>

                  </button>

                  {/* VIEW */}

                  <button
                    onClick={() =>
                      handleView(job)
                    }
                    className="w-[50px] h-[40px] rounded-[8px] flex items-center justify-center border"
                  >

                    <LuEye />

                  </button>

                </div>

              ) : job.status === "accepted" ? (

                <div className="mt-[25px] flex items-center pl-[18px] bg-[#F0FDF4] rounded-[10px] text-[#016630] gap-[10px] h-[54px] border border-[#B9F8CF]">

                  <LuCircleCheckBig />

                  <p>
                    You've accepted this job.
                    The client has been notified.
                  </p>

                </div>

              ) : (

                <div className="mt-[25px] flex items-center pl-[18px] bg-[#FEF2F2] rounded-[10px] text-[#9F0712] gap-[10px] h-[54px] border border-[#FFC9C9]">

                  <LuCircleX />

                  <p>
                    You've declined this job.
                    The client has been notified.
                  </p>

                </div>

              )}

            </div>

          ))

        ) : (

          /* =================================================
             NO REQUESTS
          ================================================= */

          <div className="border rounded-xl p-10 text-center text-gray-400">
            No job requests yet.
          </div>

        )}

      </div>

      {/* =================================================
          LOAD MORE
      ================================================= */}

      {requestTab === "new" &&
        !loading &&
        !error &&
        totalCount > newRequests.length &&
        !newRequests.some(
          (job) =>
            String(job.id).startsWith(
              "default-"
            )
        ) && (

          <div className="flex justify-center mt-6">

            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-6 py-3 bg-black text-white rounded-lg disabled:bg-gray-400"
            >

              {loading
                ? "Loading..."
                : "Load More"}

            </button>

          </div>

        )}

      {/* =================================================
          MODAL
      ================================================= */}

      {selectedJob && (

        <CompleteInformation
          job={selectedJob}
          onClose={() =>
            setSelectedJob(null)
          }
        />

      )}

    </main>
  );
};

export default JobRequests;


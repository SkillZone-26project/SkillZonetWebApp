
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
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  "https://skillzonet-backend-auth-v1.onrender.com";

const JobRequests = () => {
  const [newRequests, setNewRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestTab, setRequestTab] = useState("new");
  const [selectedJob, setSelectedJob] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [acceptedJob, setAcceptedJob] = useState(null);
  const [acceptingJobId, setAcceptingJobId] = useState(null);

  const navigate = useNavigate();
  const limit = 10;

  // Sample data retained from your original page.
  const defaultRequests = [
    {
      id: "default-1",
      jobId: "default-1",
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
      jobId: "default-2",
      name: "Michael Okonkwo",
      role: "Client",
      image:
        "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352175/Primitive.img_1_hblo6a.png",
      title: "Water Heater Installation",
      description: "Need to install a new water heater in the bathroom.",
      date: "Friday, January 16 2026",
      location: "Ikoyi, Lagos",
      requestedTime: "09:30 PM",
      price: 35000,
      status: "ASSIGNED",
    },
    {
      id: "default-3",
      jobId: "default-3",
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

  const respondedRequests = [
    {
      id: "responded-1",
      jobId: "responded-1",
      name: "David Brown",
      role: "Client",
      image:
        "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352177/Primitive.img_rd3rwi.png",
      title: "Bathroom Renovation",
      description: "Need to install a new water heater in the bathroom.",
      date: "Thursday, January 15 2026",
      location: "Ikeja, Lagos",
      requestedTime: "05:45 PM",
      price: 45000,
      status: "accepted",
    },
    {
      id: "responded-2",
      jobId: "responded-2",
      name: "Michael Okonkwo",
      role: "Client",
      image:
        "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352175/Primitive.img_1_hblo6a.png",
      title: "Water Heater Installation",
      description: "Need to install a new water heater in the bathroom.",
      date: "Friday, January 16 2026",
      location: "Ikoyi, Lagos",
      requestedTime: "09:30 PM",
      price: 35000,
      status: "declined",
    },
  ];

  // Get the logged-in artisan ID.
  const getArtisanId = () => {
    try {
      const storedArtisanId = localStorage.getItem("artisanId");

      if (storedArtisanId) {
        return storedArtisanId;
      }

      const user = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      return (
        user?.id ||
        user?.userId ||
        user?.artisanId ||
        user?.artisan?.id ||
        null
      );
    } catch (err) {
      console.error("Could not read logged-in user:", err);
      return null;
    }
  };

  // Format backend job data for the existing UI.
  const formatJob = (job) => {
    const scheduledDate = job.scheduledAt
      ? new Date(job.scheduledAt)
      : null;

    return {
      id: job.id || job.jobId,
      jobId: job.jobId || job.id,
      contractId: job.contractId || job.contract?.id || "",
      name: job.user?.fullName || "Client",
      role: "Client",
      image:
        job.user?.profilePic ||
        "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352177/Primitive.img_rd3rwi.png",
      title: job.title || "Job Request",
      description: job.description || "",
      date: scheduledDate
        ? scheduledDate.toDateString()
        : job.createdAt
        ? new Date(job.createdAt).toDateString()
        : "Date not available",
      location:
        job.city && job.state
          ? `${job.city}, ${job.state}`
          : job.address || "Location not available",
      requestedTime: scheduledDate
        ? scheduledDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "Not scheduled",
      price: job.budgetAmount || 0,
      status: job.status || "ASSIGNED",
      email: job.user?.email || "",
      phone: job.user?.phone || "",
      address: job.address || "",
      latitude: job.latitude,
      longitude: job.longitude,
      scheduledAt: job.scheduledAt,
      subSkill: job.subSkill?.name || "",
      subSkillId: job.subSkillId || job.subSkill?.id || "",
      skill: job.subSkill?.skill?.name || "",
    };
  };

  // Fetch pending job requests.
  const fetchRequests = async (pageNumber = 1) => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken");

      const artisanId = getArtisanId();

      if (!artisanId) {
        setError("Artisan information could not be found.");
        setNewRequests([]);
        setTotalCount(0);
        return;
      }

      if (!token) {
        setError(
          "Authentication token not found. Please log in again."
        );
        setNewRequests([]);
        setTotalCount(0);
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/api/artisans/jobs/requests/${artisanId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: pageNumber,
            limit,
          },
        }
      );

      const backendData = response.data?.data;
      const pendingRequests = backendData?.pendingRequests || [];
      const backendTotalCount = backendData?.totalCount || 0;

      setTotalCount(backendTotalCount);

      if (pendingRequests.length > 0) {
        const formattedRequests = pendingRequests.map(formatJob);

        setNewRequests((previousRequests) =>
          pageNumber === 1
            ? formattedRequests
            : [...previousRequests, ...formattedRequests]
        );
      } else if (pageNumber === 1) {
        // Preserve your original sample-data fallback.
        setNewRequests(defaultRequests);
      }
    } catch (err) {
      console.error(
        "FETCH JOB REQUEST ERROR:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Unable to fetch job requests. Please try again."
      );

      if (pageNumber === 1) {
        setNewRequests([]);
        setTotalCount(0);
      }
    } finally {
      setLoading(false);
    }
  };

  // Open the existing job-information modal.
  const handleView = (job) => {
    setSelectedJob(job);
  };

  // ACCEPT JOB: call the actual backend endpoint.
  const handleAcceptJob = async (job) => {
    if (!job) {
      alert("Job information is missing. Please try again.");
      return;
    }

    const jobId = job.jobId || job.id;

    // Sample fallback cards cannot be accepted by the backend.
    if (!jobId || String(jobId).startsWith("default-")) {
      alert(
        "This is sample job data. Please refresh to load a real job request."
      );
      return;
    }

    if (acceptingJobId) {
      return;
    }

    try {
      setAcceptingJobId(jobId);

      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken");

      if (!token) {
        alert("Authentication token not found. Please log in again.");
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/job/acceptances`,
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;
      const acceptanceData =
        responseData?.data?.data || responseData?.data;

      const contractId = acceptanceData?.contractId;

      if (!responseData?.success || !contractId) {
        throw new Error(
          responseData?.message ||
            "The server did not return a contract ID."
        );
      }

      const acceptedJobData = {
        ...job,
        jobId: acceptanceData.jobId || jobId,
        contractId,
        status: acceptanceData.status || "ASSIGNED",
      };

      // Update the request in the current page.
      setNewRequests((previousRequests) =>
        previousRequests.map((item) =>
          String(item.jobId || item.id) === String(jobId)
            ? acceptedJobData
            : item
        )
      );

      // Open the success modal only after backend confirmation.
      setAcceptedJob(acceptedJobData);

      console.log("Job acceptance successful:", {
        jobId: acceptedJobData.jobId,
        contractId: acceptedJobData.contractId,
        status: acceptedJobData.status,
      });
    } catch (err) {
      console.error(
        "ERROR ACCEPTING JOB:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Unable to accept this job. Please try again."
      );
    } finally {
      setAcceptingJobId(null);
    }
  };

  // Open the contract using the contract ID returned by the API.
  const handleViewContract = (job) => {
    if (!job?.contractId) {
      alert(
        "Contract ID is not available. Please accept the job first."
      );
      return;
    }

    setAcceptedJob(null);
    navigate(`/artisan-contract/${job.contractId}`);
  };

  // Load the next page of requests.
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchRequests(nextPage);
  };

  useEffect(() => {
    fetchRequests(1);
  }, []);

  const currentData =
    requestTab === "new" ? newRequests : respondedRequests;

  return (
    <main className="pt-[85px]">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold">Job Requests</h2>
        <p className="text-textGray">
          Review and respond to incoming job requests
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-[10px] w-[353px] h-[36px] bg-[#ECECF0] rounded-[14px] text-[14px] font-medium p-[4px] mt-5">
        <button
          onClick={() => setRequestTab("new")}
          className={`flex items-center justify-center gap-[20px] flex-1 rounded-[14px] transition-all ${
            requestTab === "new"
              ? "bg-white text-textColor"
              : "text-textColor"
          }`}
        >
          <span>New Requests</span>
          <span className="w-[25px] h-[22px] bg-black text-white rounded-[8px] flex items-center justify-center text-[12px]">
            {newRequests.length}
          </span>
        </button>

        <button
          onClick={() => setRequestTab("responded")}
          className={`flex-1 rounded-[14px] transition-all ${
            requestTab === "responded"
              ? "bg-white text-textColor"
              : "text-textColor"
          }`}
        >
          Responded
        </button>
      </div>

      {/* JOB REQUEST CARDS */}
      <div className="mt-4">
        {loading ? (
          <div className="border rounded-xl p-10 text-center text-gray-400">
            Loading job requests...
          </div>
        ) : error ? (
          <div className="border border-red-200 bg-red-50 rounded-xl p-6 text-center text-red-600">
            <p className="font-medium">{error}</p>
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
          currentData.map((job) => (
            <div
              key={job.id}
              className="border p-4 rounded-lg mt-[16px]"
            >
              {/* CARD HEADER */}
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

                {requestTab === "new" ? (
                  <span className="w-[110px] h-[22px] bg-[#F0B100] text-white text-[12px] rounded-[8px] flex items-center justify-center">
                    New Request
                  </span>
                ) : (
                  <span
                    className={`w-[94px] h-[22px] text-white text-[12px] rounded-[8px] flex items-center justify-center ${
                      job.status === "accepted"
                        ? "bg-[#00C950]"
                        : "bg-[#FB2C36]"
                    }`}
                  >
                    {job.status === "accepted" ? "Accepted" : "Declined"}
                  </span>
                )}
              </div>

              {/* TITLE */}
              <p className="mt-[41px]">Title: {job.title}</p>

              {/* JOB DETAILS */}
              <div className="flex flex-wrap gap-6">
                <div className="left mt-[12px] w-full lg:w-[519px]">
                  <div className="flex items-center gap-[10px] text-[14px]">
                    <LuCalendar />
                    <p>{job.date}</p>
                  </div>

                  <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                    <LuMapPin />
                    <p>{job.location}</p>
                  </div>

                  <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                    <LuClock4 />
                    <p>Requested {job.requestedTime}</p>
                  </div>
                </div>

                <div className="right w-full lg:w-[400px]">
                  <p>Description:</p>
                  <p className="text-[14px] text-textGray leading-6 max-h-[4.5rem] overflow-y-auto pr-2">
                    {job.description}
                  </p>

                  <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                    <p className="text-[28px]">
                      ₦{Number(job.price || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              {requestTab === "new" ? (
                <div className="buttons mt-[25px] flex flex-wrap gap-[10px]">
                  <button
                    onClick={() => handleAcceptJob(job)}
                    disabled={
                      acceptingJobId === (job.jobId || job.id)
                    }
                    className="bg-black text-white w-full lg:flex-1 min-h-[40px] flex items-center justify-center rounded-[8px] gap-[10px] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <LuCircleCheckBig />
                    <span>
                      {acceptingJobId === (job.jobId || job.id)
                        ? "Accepting..."
                        : "Accept Job"}
                    </span>
                  </button>

                  <button
                    onClick={() => handleViewContract(job)}
                    className="bg-white text-textColor border w-full lg:flex-1 min-h-[40px] flex items-center justify-center rounded-[8px] gap-[10px] transition-all duration-200"
                  >
                    <LuEye />
                    <span>View Contract Page</span>
                  </button>

                  <button
                    onClick={() => handleView(job)}
                    className="bg-white text-textColor border w-full lg:flex-1 min-h-[40px] flex items-center justify-center rounded-[8px] gap-[10px] transition-all duration-200"
                  >
                    <LuCircleX />
                    <span>View Details</span>
                  </button>
                </div>
              ) : job.status === "accepted" ? (
                <div className="mt-[25px] flex items-center pl-[18px] bg-[#F0FDF4] rounded-[10px] text-[#016630] gap-[10px] min-h-[54px] border border-[#B9F8CF]">
                  <LuCircleCheckBig />
                  <p>You've accepted this job.</p>
                </div>
              ) : (
                <div className="mt-[25px] flex items-center pl-[18px] bg-[#FEF2F2] rounded-[10px] text-[#9F0712] gap-[10px] min-h-[54px] border border-[#FFC9C9]">
                  <LuCircleX />
                  <p>You've declined this job.</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="border rounded-xl p-10 text-center text-gray-400">
            No job requests yet.
          </div>
        )}
      </div>

      {/* LOAD MORE */}
      {requestTab === "new" &&
        !loading &&
        !error &&
        totalCount > newRequests.length &&
        !newRequests.some((job) =>
          String(job.id).startsWith("default-")
        ) && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-6 py-3 bg-black text-white rounded-lg disabled:bg-gray-400"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

      {/* ACCEPTANCE SUCCESS MODAL */}
      {acceptedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white w-full max-w-[500px] rounded-[12px] p-[30px] shadow-xl">
            <div className="flex justify-center mb-[20px]">
              <div className="w-[56px] h-[56px] rounded-full bg-[#F0FDF4] flex items-center justify-center text-[#016630]">
                <LuCircleCheckBig size={28} />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-[22px] font-semibold text-textColor">
                Job Accepted!
              </h2>
              <p className="text-[15px] text-textGray mt-[10px]">
                You can now view your contract and proceed with the job.
              </p>
            </div>

            <div className="flex flex-wrap gap-[12px] mt-[28px]">
              <button
                onClick={() => setAcceptedJob(null)}
                className="w-full sm:flex-1 h-[42px] border border-gray-300 rounded-[8px] text-textColor hover:bg-gray-100"
              >
                Close
              </button>

              <button
                onClick={() => handleViewContract(acceptedJob)}
                className="w-full sm:flex-1 h-[42px] bg-black text-white rounded-[8px] flex items-center justify-center gap-[8px] hover:bg-gray-800"
              >
                <LuEye />
                <span>View Contract Page</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPLETE INFORMATION MODAL */}
      {selectedJob && (
        <CompleteInformation
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </main>
  );
};

export default JobRequests;

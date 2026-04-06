import React, { useState } from "react";
import {
  LuCalendar,
  LuMapPin,
  LuClock4,
  LuDollarSign,
  LuCircleCheckBig,
  LuCircleX,
  LuEye,
} from "react-icons/lu";
import CompleteInformation from "./CompleteInformation";

const JobRequests = () => {
  const [requestTab, setRequestTab] = useState("new");
  const [selectedJob, setSelectedJob] = useState(null); // <-- modal state

  /* =========================
     DATABASE (2 ARRAYS)
  ========================== */

  const newRequests = [
    {
      id: 1,
      name: "David Brown",
      role: "Client",
      image:
        "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352177/Primitive.img_rd3rwi.png",
      title: "Plumbing - Bathroom Renovation",
      date: "Thursday, January 15 2026",
      // longDate: "Thursday, January 15, 2026",
      location: "Ikeja, Lagos",
      requestedTime: "05:45 PM",
      scheduleTime: "09:00pm",
      price: 45000,
    },
    {
      id: 2,
      name: "Michael Okonkwo",
      role: "Client",
      image:
        "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352175/Primitive.img_1_hblo6a.png",
      title: "Plumbing - Water Heater Installation",
      description:
        "Need to install a new water heater in the bathroom. The old one stopped working.",
      date: "Friday, January 16 2026",
      // longDate: "Friday January 16",
      location: "Ikoyi, Lagos",
      requestedTime: "09:30PM",
      scheduleTime: "11:00pm",
      price: 35000,
    },
    {
      id: 3,
      name: "Fatima Bello",
      role: "Client",
      image:
        "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352175/Primitive.img_1_hblo6a.png",
      title: "Plumbing - Leak Repair",
      description:
        "Leaking pipe under the kitchen sink needs urgent repair.",
      date: "Wednesday, January 14 2026",
      // longDate: "Wednesday, January 14",
      location: "Surulere, Lagos",
      requestedTime: "11:15AM",
      scheduleTime: "15:00",
      price: 15000,
    },
  ];

  const respondedRequests = [
    {
      id: 1,
      name: "David Brown",
      role: "Client",
      image:
        "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352177/Primitive.img_rd3rwi.png",
      title: "Plumbing - Bathroom Renovation",
      date: "Thursday, January 15 2026", 
      // longDate: "Thursday, January 15",
      location: "Ikeja, Lagos",
      requestedTime: "05:45PM",
      scheduleTime: "09:00pm",
      price: 45000,
      status: "accepted",
    },
    {
      id: 2,
      name: "Michael Okonkwo",
      role: "Client",
      image:
        "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352175/Primitive.img_1_hblo6a.png",
      title: "Plumbing - Water Heater Installation",
      description:
        "Need to install a new water heater in the bathroom. The old one stopped working.",
      date: "Friday, January 16 2026",
      // longDate: "Friday, January 16",
      location: "Ikoyi, Lagos",
      requestedTime: "09:30PM",
      scheduleTime: "11:00pm",
      price: 35000,
      status: "declined",
    },
  ];

  const currentData =
    requestTab === "new" ? newRequests : respondedRequests;

  const handleView = (job) => {
    setSelectedJob(job);
  };

  return (
    <main className="pt-[85px]">
      {/* Section 1 */}
      <div>
        <h2>Job Requests</h2>
        <p>Review and respond to incoming job requests</p>
      </div>

      {/* Section 2 */}
      <div>
        <div className="flex gap-[10px] w-[353px] h-[36px] bg-[#ECECF0] rounded-[14px] text-[14px] font-medium p-[4px]">
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

        {/* Cards */}
        <div className="mt-4">
          {currentData.map((job) => (
            <div key={job.id} className="border p-4 rounded-lg mt-[16px]">
              
              {/* Header */}
              <div className="flex justify-between">
                <div className="profile flex gap-[16px]">
                  <img
                    src={job.image}
                    alt=""
                    className="w-[48px] h-[48px] rounded-[24px]"
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

                {/* Status */}
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

              {/* Title */}
              <p className="mt-[41px]">{job.title}</p>
              {job.description && (
                <p className="text-[14px] text-textGray">
                  {job.description}
                </p>
              )}

              {/* Details */}
              <div className="flex">
                <div className="left mt-[12px] w-[519px]">
                  <div className="flex items-center gap-[10px] text-[14px]">
                    <LuCalendar />
                    <p>
  {(() => {
    const [dayPart, rest] = job.date.split(", ");
    const [month, date] = rest.split(" "); // removes year automatically

    return `${dayPart.slice(0, 3)}, ${month.slice(0, 3)} ${date}`;
  })()}
</p>
                  </div>

                  <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                    <LuMapPin />
                    <p>{job.location}</p>
                  </div>

                  <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                    <LuClock4 />
                    <p>
                      {requestTab === "new"
                        ? "Requested"
                        : job.status === "accepted"
                        ? "Accepted"
                        : "Requested"}{" "}
                      {job.requestedTime}
                    </p>
                  </div>
                </div>

                <div className="right w-[519px]">
                  <div className="flex items-center gap-[10px] text-[14px]">
                    <LuClock4 />
                    <p>{job.scheduleTime}</p>
                  </div>

                  <div className="flex items-center gap-[10px] text-[14px] mt-[14px]">
                    <LuDollarSign />
                    <p>₦{job.price}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {requestTab === "new" ? (
                <div className="buttons mt-[25px] flex gap-[10px]">
                  <button className="bg-black text-white w-[480px] h-[40px] flex items-center justify-center rounded-[8px] gap-[10px]">
                    <LuCircleCheckBig />
                    <span>Accept Job</span>
                  </button>

                  <button className="border w-[480px] h-[40px] flex items-center justify-center rounded-[8px] gap-[10px]">
                    <LuCircleX />
                    <span>Decline</span>
                  </button>

                  {/* Eye Button to open modal */}
                  <button
                    onClick={() => handleView(job)}
                    className="w-[50px] h-[40px] rounded-[8px] flex items-center justify-center border"
                  >
                    <LuEye />
                  </button>
                </div>
              ) : job.status === "accepted" ? (
                <div className="mt-[25px] flex items-center pl-[18px] bg-[#F0FDF4] rounded-[10px] text-[#016630] gap-[10px] h-[54px] border border-[#B9F8CF]">
                  <LuCircleCheckBig />
                  <p>
                    You've accepted this job. The client has been
                    notified.
                  </p>
                </div>
              ) : (
                <div className="mt-[25px] flex items-center pl-[18px] bg-[#FEF2F2] rounded-[10px] text-[#9F0712] gap-[10px] h-[54px] border border-[#FFC9C9]">
                  <LuCircleX />
                  <p>
                    You've declined this job. The client has been
                    notified.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
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
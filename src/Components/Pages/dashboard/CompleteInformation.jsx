import React from "react";
import {
  LuCalendar,
  LuMapPin,
  LuClock4,
  LuDollarSign,
  LuCircleCheckBig,
  LuCircleX,
  LuEye,
} from "react-icons/lu";


const CompleteInformation = ({ job, onClose }) => {
  return (
    <section className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-[512px] rounded-[10px] p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[18px]"
        >
          ✕
        </button>

        {/* Job Info */}
        <div>
          <h2 className="text-[18px] font-semibold mb-[5px]">
      Job Request Details
          </h2>
          <p className="text-[14px]  font-normal text-textGray mb-[16px]">Complete information about this job request</p>

<div className="flex  gap-[20px]">
    <img src={job.image} alt=""  className="w-[64px] h-[64px] rounded-[32px]"/>
    
        <div>
              <p className="text-[18px] font-semibold text-textColor">{job.name}</p>
             <p className="text-[14px] font-normal text-textGray mt-[2px]">
                      {job.role}
                    </p> 
                     <button className="w-[94px] h-[22px] bg-[#F0B100] text-white text-[12px] font-medium rounded-[8px] mt-[10px]">
                    New Request
                  </button>
        </div>
</div>
          
        

       
        </div>
<div className="mt-[24px]">
    <p className="text-[16px] font-semibold">Service Required</p>
    <p> {job.title}</p>
</div>
{/* Scheduled Date and Time */}

<div className="flex gap-[40px]">
  <div className="leftsided">
    {/* Scheduled Date */}
<div className="flex items-center gap-[10px]">
<LuCalendar />
<p>Scheduled Date</p>
</div>
{/* Date */}
<div className="">
     <p>{job.date}</p> 
</div>
 {/* LOCATION */}
<div>
  <div className="flex items-center gap-[10px]">
<LuMapPin />
<p>Location</p>
</div>
 <p>{job.location}</p>
</div>
  </div>
  {/* right */}
  <div className="rightSided">
<div className="flex items-center gap-[10px]">
<  LuClock4 /> 
<p>Time</p>
</div>
  
  <div>
      <p>{job.requestedTime}</p>
  </div>
  <div className="flex items-center gap-[10px]">
<  LuDollarSign /> 
<p>Offered Price</p>
</div>
<div>
   <p>₦{job.price}</p>
</div>
</div>
</div>

<div className="flex gap-[20px]">
  <button className="flex items-center">

<LuCircleCheckBig />
  <p>Accept Job</p>
</button>
<button className="flex items-center">

<LuCircleX />
  <p>Accept Job</p>
</button>
</div>
      </div>

    </section>
  );
};

export default CompleteInformation;
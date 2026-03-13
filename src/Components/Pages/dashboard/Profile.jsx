import React from 'react'
import { LuCamera, LuPhone, LuCalendar, LuSquarePen } from "react-icons/lu";
import { HiOutlineEnvelope } from "react-icons/hi2"; 
import { CiLocationOn } from "react-icons/ci";

const Profile = () => {
  return (
    <div className="h-[calc(100vh-85px)]  bg-white mt-[85px] px-4  rounded-[20px] p-[24px] ml-[100px]">
      
     <div className='left and middle  border h-[361px] p-[24px] rounded-[14px] w-[855px]'>

     <div className="topBox flex gap-[50px] h-[210px] border-b">
 <div className='left flex gap-[15px] '>
       <div className="relative w-[128px] h-[128px]">
        
        <img 
          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1772140352/Primitive.img_5_sqmsfy.png" 
          alt="" 
          className="w-[128px] h-[128px] rounded-[64px]" 
        />

        <div className="absolute bottom-0 right-0 bg-black text-white w-[40px] h-[40px] rounded-[20px] flex items-center justify-center">
          <LuCamera />
        </div>
<div className='mt-[16px]'>
  <button className='bg-[#FE9A00] flex items-center justify-center w-[119px] text-[12px] text-white font-normal rounded-[8px]'>Premium Member</button>
</div>
      </div>
      
      <div>
        <p className='text-[24px] font-semibold text-textColor mt-[5px]'>
          John Mensah
        </p>
        <p className='text-[16px] font-normal text-textGray mt-[5px]'>Mensah Plumbing Services</p>
        <p className='text-[14px] font-normal text-textGray mt-[5px]'>Artisan</p>
        <p className='text-[14px] font-normal text-textGray mt-[5px]' >Account</p>
        <div className='flex items-center gap-[10px] text-[14px] font-normal mt-[10px]'>
          
<HiOutlineEnvelope className='text-textGray'/>
          <p className='text-textColor'>john.mensah@email.com</p>
        </div>
        <div className='flex items-center gap-[10px] text-[14px] font-normal w-[260px]  mt-[10px]'>
          

<CiLocationOn className='text-textGray'/>
          <p className='text-textColor'><span>Victoria Island</span>, <span>Lagos</span>, <span>Nigeria</span></p>
        </div>
      </div>
     </div>
    <div className="rightTop flex justify-between  w-[350px]">
 <div className="  flex flex-col justify-end">
      <div className='flex  items-center'>
          
<LuPhone />
          <p className='text-[14px]'>+234 802 123 4567</p>
        </div>
     <div>
       <div className='flex items-center gap-[10px] mt-[15px]'>
          
<LuCalendar  />
          <p>Joined January</p>
        </div>
        <p className='ml-[30px]'>2023</p>
     </div>

     </div>
     <button className='flex items-center justify-center gap-[10px] w-[127px] h-[36px] rounded-[8px] bg-black text-white'> 
      <LuSquarePen />
      <p>Edit Profile</p>
     </button>
    </div>
    
         </div>
             <div className="secondDown flex gap-[16px] mt-[50px]">
      <div className="box1  w-[187px] flex flex-col items-center">
        <p className='text-[24px] font-semibold text-textColor'>342</p>
        <p className='text-[14px] font-normal text-textGray'>Jobs Completed</p>
      </div>
      <div className="box2  w-[187px] flex flex-col items-center">
        <p className='text-[24px] font-semibold text-textColor'>4.8</p>
        <p className='text-[14px] font-normal text-textGray'>Average Rating</p>
      </div>
      <div className="box1  w-[187px] flex flex-col items-center">
        <p className='text-[24px] font-semibold text-textColor'>₦1.2<span>M</span></p>
        <p className='text-[14px] font-normal text-textGray'>Total Earned</p>
      </div>
      <div className="box1  w-[187px] flex flex-col items-center">
        <p className='text-[24px] font-semibold text-textColor'>10</p>
        <p className='text-[14px] font-normal text-textGray'>Years Experience</p>
      </div>
    </div>

          </div>
          {/* Skills & Services */}
     <div className="middleBox w-[855px] border px-[24px] py-[26px] mt-[24px] rounded-[14px]">
<div className='flex justify-between'>
  <p>Skills & Services</p>
   <button className='flex items-center justify-center gap-[10px] w-[77px] h-[36px] rounded-[8px] text-[14px] text-textColor border'> 
      <LuSquarePen />
      <p>Edit</p>
     </button>
</div>
<div className="buttons mt-[40px] flex gap-[10px]">
<button className='flex items-center justify-center gap-[10px] w-[87.95px] h-[36px] rounded-[8px] text-[14px] bg-[#ECEEF2] text-textColor border'> 
      
      <p>Plumbing</p>
     </button>
<button className='flex items-center justify-center gap-[10px] w-[95.95px] h-[36px] rounded-[8px] text-[14px] bg-[#ECEEF2] text-textColor border'> 
      
      <p>Pipe Fitting</p>
     </button>
<button className='flex items-center justify-center gap-[10px] w-[204.69px] h-[36px] rounded-[8px] text-[14px] bg-[#ECEEF2] text-textColor border'> 
      
      <p>Water Heater Installation</p>
     </button>
</div>
     </div>

    </div>
  )
}

export default Profile
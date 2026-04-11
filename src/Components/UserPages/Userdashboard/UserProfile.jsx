import React from 'react'
import { LuCamera, LuPhone, LuCalendar, LuSquarePen } from "react-icons/lu";
import { HiOutlineEnvelope } from "react-icons/hi2"; 
import { CiLocationOn } from "react-icons/ci";

const UserProfile = () => {
  return (
    <div className="h-[calc(100vh-85px)]  bg-white mt-[85px] px-4  rounded-[20px] p-[24px] ml-[100px]">
      
     <div className='left and middle  border h-[361px] p-[24px] rounded-[14px] w-[855px]'>

     <div className="topBox flex gap-[50px] h-[210px] border-b">
 <div className='left flex gap-[15px] '>
       <div className="relative w-[128px] h-[128px]">
        
        <img 
          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1774203306/Primitive.span_2_bssqdu.png" 
          alt="" 
          className="w-[128px] h-[128px] rounded-[64px]" 
        />

        <div className="absolute bottom-0 right-0 bg-black text-white w-[40px] h-[40px] rounded-[20px] flex items-center justify-center">
          <LuCamera />
        </div>
<div className='mt-[16px]'>
  <button className='bg-[#FE9A00] flex items-center justify-center w-[119px] text-[12px] text-white p-[4px] rounded-[8px] font-bold'>Premium Member</button>
</div>
      </div>
      
      <div>
        <p className='text-[24px] font-semibold text-textColor mt-[5px]'>
          Sarah Johnson
        </p>
      
        <p className='text-[14px] font-normal text-textGray mt-[5px]'>Client</p>
        <p className='text-[14px] font-normal text-textGray mt-[5px]'>Account</p>
        <div className='flex items-center gap-[10px] text-[14px] font-normal mt-[10px]'>
          
<HiOutlineEnvelope className='text-textGray'/>
          <p className='text-textColor'>sarah.johnson@email.com</p>
        </div>
        <div className='flex items-center gap-[10px] text-[14px] font-normal w-[260px]  mt-[10px]'>
          

<CiLocationOn className='text-textGray'/>
          <p className='text-textColor'><span>Lekki</span>, <span>Lagos</span>, <span>Nigeria</span></p>
        </div>
      </div>
     </div>
    <div className="rightTop flex justify-between  w-[350px]">
 <div className="  flex flex-col justify-end">
      <div className='flex  items-center'>
          
<LuPhone />
          <p className='text-[14px]'>+234 803 456 7890</p>
        </div>
     <div>
       <div className='flex items-center gap-[10px] mt-[15px]'>
          
<LuCalendar  />
          <p>Joined June</p>
        </div>
        <p className='ml-[30px]'>2024</p>
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
        <p className='text-[24px] font-semibold text-textColor'>12</p>
        <p className='text-[14px] font-normal text-textGray'>Total Bookings</p>
      </div>
      <div className="box2  w-[187px] flex flex-col items-center">
        <p className='text-[24px] font-semibold text-textColor'>5</p>
        <p className='text-[14px] font-normal text-textGray'>Saved Artisans</p>
      </div>
      <div className="box1  w-[187px] flex flex-col items-center">
        <p className='text-[24px] font-semibold text-textColor'>₦<span>245,000</span></p>
        <p className='text-[14px] font-normal text-textGray'>Total Spent</p>
      </div>
      <div className="box1  w-[187px] flex flex-col items-center">
        <p className='text-[24px] font-semibold text-textColor'>8</p>
        <p className='text-[14px] font-normal text-textGray'>Reviews Given</p>
      </div>
    </div>

          </div>
          {/* Skills & Services */}
     <div className="middleBox w-[855px] border px-[24px] py-[26px] mt-[24px] rounded-[14px]">
<div className='flex justify-between'>
  <p>Personal Information</p>
   <button className='flex items-center justify-center gap-[10px] w-[77px] h-[36px] rounded-[8px] text-[14px] text-textColor border'> 
      <LuSquarePen />
      <p>Edit</p>
     </button>
</div>
<div>
  <form action="" className=''>

    <fieldset className='flex gap-[10px]'>
      <div className='flex flex-col'>
<label htmlFor="" className='text-[14px] font-medium text-textColor'>Full Name</label>
<input type="text" placeholder='Sarah Johnson' className='w-[391px] bg-[#F3F3F5] rounded-[8px] h-[36px] pl-[12px] text-[14px] font-normal mt-[5px]'/>
      </div>
      <div className='flex flex-col'>
<label htmlFor="" className='text-[14px] font-medium text-textColor'>Email Address</label>
<input type="text" placeholder='sarah.johnson@email.com' className='w-[391px] bg-[#F3F3F5] rounded-[8px] h-[36px] pl-[12px] text-[14px] font-normal mt-[5px]'/>
      </div>
     
    </fieldset>
    <fieldset className='flex gap-[10px]'>
      <div className='flex flex-col'>
<label htmlFor="" className='text-[14px] font-medium text-textColor'>Phone Number</label>
<input type="text" placeholder='+234 803 456 7890' className='w-[391px] bg-[#F3F3F5] rounded-[8px] h-[36px] pl-[12px] text-[14px] font-normal mt-[5px]'/>
      </div>
      <div className='flex flex-col'>
<label htmlFor="" className='text-[14px] font-medium text-textColor'>Location</label>
<input type="text" placeholder='Lekki, Lagos, Nigeria' className='w-[391px] bg-[#F3F3F5] rounded-[8px] h-[36px] pl-[12px] text-[14px] font-normal mt-[5px]'/>
      </div>
     
    </fieldset>
  </form>
</div>
<div className="buttons mt-[40px] flex gap-[10px]">


</div>
     </div>

    </div>
  )
}

export default UserProfile
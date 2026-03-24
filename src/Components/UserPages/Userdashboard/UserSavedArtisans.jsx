import React from "react";
  import { FaHeart, FaStar } from "react-icons/fa";
import { VscLocation } from "react-icons/vsc";


const UserSavedArtisans = () => {
  return (
    <>
   <section>
    {/* up page */}
     <div className="pt-[85px] flex items-center justify-between">
     <div>
      <p className="text-[24px] font-semibold">Saved Artisans</p>
      <p className="text-[#717182] text-[16px] font-normal"><span>3</span> artisans saved</p>
     </div>
     <div>
      <input type="text" placeholder="Search saved artisans..." className="w-[320px] h-[36px] pl-[10px]  text-[#717182] bg-[#F3F3F5] rounded-[8px]" />
     </div>
    </div>

    {/* card section */}
    <div className="parentCard w-full mt-[25px]">
      {/* Card One */}
      <div className="w-full max-w-[350px] border rounded-[8px] h-[455px]">
        <div className="imageDiv relative">
  <img
    src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1774378526/Image_John_Mensah_svniew.png"
    alt=""
    className="w-full max-w-[350px] rounded-t-[8px]"
  />

  <div className="bg-white absolute top-[12px] right-[12px] w-[32px] h-[32px] rounded-[4px] flex items-center justify-center">
    <FaHeart className="text-[#FB2C36] text-[14px]" />
  </div>
</div>
      <div className="details ml-[16px] mt-[5px]">
        <div className="flex gap-[12px] ">
      <div>
        <img src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1772140352/Primitive.img_5_sqmsfy.png" alt="" className="w-[64px] h-[64px] rounded-[34px]"/> 
      </div>
      <div className="mt-[46px]"> 
        <p><span>John</span> <span>Mensah</span></p>
        <div className="flex gap-[8px] items-center">
          <FaStar className="text-[#FDC700]"/>
          <p><span>4.8</span> (<span>127</span>)</p>
        </div>
      </div>
      </div>
      <div className="mt-[16px] flex gap-[8px] text-[12px] font-normal">
        <button className="bg-[#ECEEF2] text-textColor rounded-[10px] flex items-center py-[6px] px-[14px]">
        <span>Plumbing</span>
      </button>
        <button className="bg-[#ECEEF2] text-textColor rounded-[10px] flex items-center py-[6px] px-[14px]">
        <span>Pipe Fitting</span>
      </button>
        <button className="bg-[#FE9A00] text-white rounded-[10px] flex items-center py-[6px] px-[14px]">
        <span>Premium</span>
      </button>
      </div>
      <div className="flex gap-[12px]">  
<VscLocation />
<p><span>2.3</span>km away</p>
      </div>
      <div>
        Next
      </div>
      </div>
      
      </div>
      {/* card ends */}
    </div>
   </section>
   </>
  );
};

export default UserSavedArtisans;
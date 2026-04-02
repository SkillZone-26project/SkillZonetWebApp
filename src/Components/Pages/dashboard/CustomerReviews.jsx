import React from 'react'
import { FaStar } from "react-icons/fa6";
import { LiaHandPointRightSolid } from "react-icons/lia"; 
import { MdChatBubbleOutline } from "react-icons/md";
 import { LuStar } from "react-icons/lu";

const CustomerReviews = () => {
  return (
  <>
  <section className='mt-[24px]'>
    <div className='mb-[16px]'> <p>Customer Reviews</p></div>
       {/* Card 1 */}
 <div className="border rounded-[14px] w-full p-[24px]"> 
           
                  <div className="flex justify-between">
                    <div className="profile flex gap-[16px]">
                      <div className="">
                        <img
                          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/q_auto/f_auto/v1774203306/Primitive.span_2_bssqdu.png"
                          alt="Profile Pic"
                          className="w-[48px] h-[48px] rounded-[24px]"
                        />
                      </div>
                      <div>
                        <p className="text-[16px] font-semibold text-textColor">
                          Sarah Johnson
                        </p>
                        <p className="text-[14px] font-normal text-textGray">
                          Kitchen Sink Repair
                        </p>
                        <div className='flex text-[12px] items-center gap-[4px]'>
                                 <FaStar className="text-[#FDC700]" />   
                                 <FaStar className="text-[#FDC700]" />   
                                 <FaStar className="text-[#FDC700]" />   
                                 <FaStar className="text-[#FDC700]" />   
                                 <FaStar className="text-[#FDC700]" />   
                        </div>
                        <p className='mt-[13px] mb-[13px] text-[14px] font-normal text-textColor'>Amazing! Very knowledgeable and explained everything clearly. The leak is completely fixed.</p>
                        <div className='flex items-center gap-[40px]'>
                            <button className='flex items-center text-[14px] font-normal gap-[15px]'>
                                
<LiaHandPointRightSolid />
<p>Helpful (<span>15</span>)</p>
                            </button>
                            <button className='flex items-center text-[14px] font-normal gap-[15px]'>
                                
<MdChatBubbleOutline />
<p>Reply</p>
                            </button>
                            
                        </div>
                      </div>
                    </div>
                    {/* Botton */}
                    <button className="w-[94px] h-[22px]  text-textGray text-[12px] font-medium rounded-[8px] items-center justify-center">
                      Jan 8, 2026
                    </button>
                  </div>

    </div>
       {/* Card 2 */}
 <div className="border rounded-[14px] w-full p-[24px] mt-[16px]"> 
           
                  <div className="flex justify-between">
                    <div className="profile flex gap-[16px]">
                      <div className="">
                        <img
                          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/q_auto/f_auto/v1771441211/Primitive.img_3_qcvm8i.png"
                          alt="Profile Pic"
                          className="w-[48px] h-[48px] rounded-[24px]"
                        />
                      </div>
                      <div>
                        <p className="text-[16px] font-semibold text-textColor">
                       Fatima Bello
                        </p>
                        <p className="text-[14px] font-normal text-textGray">
                          Pipe Leak Repair
                        </p>
                        <div className='flex text-[12px] items-center gap-[4px]'>
                                 <FaStar className="text-[#FDC700]" />   
                                 <FaStar className="text-[#FDC700]" />   
                                 <FaStar className="text-[#FDC700]" />   
                                 <FaStar className="text-[#FDC700]" />   
                                 <FaStar className="text-[#FDC700]" />   
                        </div>
                        <p className='mt-[13px] mb-[13px] text-[14px] font-normal text-textColor'>Amazing! Very knowledgeable and explained everything clearly. The leak is completely fixed.</p>
                        <div className='flex items-center gap-[40px]'>
                            <button className='flex items-center text-[14px] font-normal gap-[15px]'>
                                
<LiaHandPointRightSolid />
<p>Helpful (<span>15</span>)</p>
                            </button>
                            <button className='flex items-center text-[14px] font-normal gap-[15px]'>
                                
<MdChatBubbleOutline />
<p>Reply</p>
                            </button>
                            
                        </div>
                      </div>
                    </div>
                    {/* Botton */}
                    <button className="w-[94px] h-[22px]  text-textGray text-[12px] font-medium rounded-[8px] items-center justify-center">
                      Jan 3, 2026
                    </button>
                  </div>

    </div>
       {/* Card 3 */}
 <div className="border rounded-[14px] w-full p-[24px] mt-[16px]"> 
           
                  <div className="flex justify-between">
                    <div className="profile flex gap-[16px]">
                      <div className="">
                        <img
                          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/q_auto/f_auto/v1771352175/Primitive.img_1_hblo6a.png"
                          alt="Profile Pic"
                          className="w-[48px] h-[48px] rounded-[24px]"
                        />
                      </div>
                      <div>
                        <p className="text-[16px] font-semibold text-textColor">
                         David Brown
                        </p>
                        <p className="text-[14px] font-normal text-textGray">
                        Water Heater Installation
                        </p>
                        <div className='flex text-[12px] items-center gap-[4px]'>
                                 <FaStar className="text-[#FDC700]" />   
                                 <FaStar className="text-[#FDC700]" />   
                                 <FaStar className="text-[#FDC700]" />   
                                 <FaStar className="text-[#FDC700]" />   
                                 <FaStar className="text-[#FDC700]" />   
                        </div>
                        <p className='mt-[13px] mb-[13px] text-[14px] font-normal text-textColor'>Outstanding work! John went above and beyond. Very clean and professional.</p>
                        <div className='flex items-center gap-[40px]'>
                            <button className='flex items-center text-[14px] font-normal gap-[15px]'>
                                
<LiaHandPointRightSolid />
<p>Helpful (<span>10</span>)</p>
                            </button>
                            <button className='flex items-center text-[14px] font-normal gap-[15px]'>
                                
<MdChatBubbleOutline />
<p>Reply</p>
                            </button>
                            
                        </div>
                      </div>
                    </div>
                    {/* Botton */}
                    <button className="w-[94px] h-[22px]  text-textGray text-[12px] font-medium rounded-[8px] items-center justify-center">
                      Dec 28, 2025
                    </button>
                  </div>

    </div>
       {/* Card 4 */}
 <div className="border rounded-[14px] w-full p-[24px] mt-[16px]"> 
           
                  <div className="flex justify-between">
                    <div className="profile flex gap-[16px]">
                      <div className="">
                        <img
                          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/q_auto/f_auto/v1771519219/Primitive.img_4_cq5klr.png"
                          alt="Profile Pic"
                          className="w-[48px] h-[48px] rounded-[24px]"
                        />
                      </div>
                      <div>
                        <p className="text-[16px] font-semibold text-textColor">
                          Chioma Nwosu
                        </p>
                        <p className="text-[14px] font-normal text-textGray">
                          Bathroom Renovation
                        </p>
                        <div className='flex text-[12px] items-center gap-[4px]'>
                                 <FaStar className="text-[#FDC700]" />   
                                 <FaStar className="text-[#FDC700]" />   
                                 <FaStar className="text-[#FDC700]" />   
                                 <FaStar className="text-[#FDC700]" />   

<LuStar className='text-textGray'/> 
                        </div>
                        <p className='mt-[13px] mb-[13px] text-[14px] font-normal text-textColor'>Great service. Job was done well, though it took slightly longer than expected.</p>
                        <div className='flex items-center gap-[40px]'>
                            <button className='flex items-center text-[14px] font-normal gap-[15px]'>
                                
<LiaHandPointRightSolid />
<p>Helpful (<span>6</span>)</p>
                            </button>
                            <button className='flex items-center text-[14px] font-normal gap-[15px]'>
                                
<MdChatBubbleOutline />
<p>Reply</p>
                            </button>
                            
                        </div>
                      </div>
                    </div>
                    {/* Botton */}
                    <button className="w-[94px] h-[22px]  text-textGray text-[12px] font-medium rounded-[8px] items-center justify-center">
                      Dec 20, 2025
                    </button>
                  </div>

    </div>
    <div className='p-[8px] flex items-center justify-center mx-auto rounded-[8px] border mt-[16px] w-full max-w-[161px]  hover:bg-black '>
      <button className='text-[14px] font-medium text-textColor hover:text-white '>Load More Reviews</button>
    </div>
  </section>
  </>
  )
}

export default CustomerReviews
import React from 'react'
import { LuShield } from "react-icons/lu";
import { CiStar } from "react-icons/ci";
import { BsClock } from "react-icons/bs";

const HowItWorks = () => {
  return (
    <>
    <section className="mx-4 md:mx-10 lg:mx-[80px] mb-16 md:mb-24 ">
          <div className="w-full mt-8 md:mt-10 lg:mt-[20px]">
            {/* Heading container */}
            <div className="flex flex-col items-center px-4 md:px-6 text-center">
              <h3 className="text-[28px] md:text-[32px] lg:text-[36px] font-bold mb-2 text-textColor">
          How It Works
              </h3>
              <p className="text-textGray text-[16px] md:text-[17px] lg:text-[18px] font-normal">
                Get started in three simple steps
              </p>
            </div>
    
            {/* Card Section */}
            <div className="flex flex-col lg:flex-row lg:justify-start lg:gap-[8px] mt-6 md:mt-8 lg:mt-[48px] items-center">
              
              {/* Card 1 */}
              <div className="mx-[6px] mb-6 lg:mb-0">
  <div className="bg-white rounded-[14px] w-full max-w-[380px] p-[24px] flex flex-col items-center text-center">
    
    {/* Icon */}
    <div className="rounded-[32px] flex items-center justify-center mb-[16px] bg-black text-white w-[64px] h-[64px] text-[24px] font-bold">
      <p>1</p>
    </div>

    {/* Title */}
    <p className="font-semibold text-[18px] text-textColor mt-[40px] mb-[35px]">
      Search & Find
    </p>

    {/* Description */}
    <p className="text-textGray font-normal text-[14px] w-full">
      Search for the service you need and browse verified artisans near you
    </p>

  </div>
</div>

    
              {/* Card 2 */}
            <div className="mx-[6px] mb-6 lg:mb-0">
  <div className="bg-white rounded-[14px] w-full max-w-[380px] p-[24px] flex flex-col items-center text-center">
    
    {/* Icon */}
    <div className="rounded-[32px] flex items-center justify-center mb-[16px] bg-black text-white w-[64px] h-[64px] text-[24px] font-bold">
      <p>2</p>
    </div>

    {/* Title */}
    <p className="font-semibold text-[18px] text-textColor mt-[40px] mb-[35px]">
      Book & Track
    </p>

    {/* Description */}
    <p className="text-textGray font-normal text-[14px] w-full">
Book your preferred artisan and track their arrival in real-time    </p>

  </div>
</div>
    
              {/* Card 3 */}
            <div className="mx-[6px] mb-6 lg:mb-0">
  <div className="bg-white rounded-[14px] w-full max-w-[380px] p-[24px] flex flex-col items-center text-center">
    
    {/* Icon */}
    <div className="rounded-[32px] flex items-center justify-center mb-[16px] bg-black text-white w-[64px] h-[64px] text-[24px] font-bold">
      <p>3</p>
    </div>

    {/* Title */}
    <p className="font-semibold text-[18px] text-textColor mt-[40px] mb-[35px]">
    Pay & Review
    </p>

    {/* Description */}
    <p className="text-textGray font-normal text-[14px] w-full">
Pay securely after job completion and leave a review to help others    </p>

  </div>
</div>
    
            </div>
            {/* Card Section ends */}
          </div>
        </section>
    </>
  )
}

export default HowItWorks
import React from "react";
import { LuShield } from "react-icons/lu";
import { CiStar } from "react-icons/ci";
import { BsClock } from "react-icons/bs";

const Choose = () => {
  return (
    <section className="mx-4 md:mx-10 lg:mx-[80px] mb-16 md:mb-24 ">
      <div className="w-full mt-12 md:mt-16 lg:mt-[150px] bg-bgGray">
        {/* Heading container */}
        <div className="flex flex-col items-center px-4 md:px-6 text-center">
          <h3 className="text-[28px] md:text-[32px] lg:text-[36px] font-bold mb-2 text-textColor">
            Why Choose SkillZonet?
          </h3>
          <p className="text-textGray text-[16px] md:text-[17px] lg:text-[18px] font-normal">
            We make it easy to find, book, and work with trusted professionals
          </p>
        </div>

        {/* Card Section */}
        <div className="flex flex-col lg:flex-row lg:justify-start lg:gap-[8px] mt-6 md:mt-8 lg:mt-[48px] items-center">
          
          {/* Card 1 */}
          <div className="mx-[6px] mb-6 lg:mb-0">
            <div className="bg-white rounded-[14px] border-[2px] border-bgGray w-full max-w-[380px] p-[24px] flex flex-col">
              <div className="bg-bgActive w-[48px] h-[48px] rounded-[10px] flex items-center justify-center mb-[16px]">
                <LuShield className="text-active text-[26px]" />
              </div>

              <p className="font-semibold text-[18px] text-textColor mt-[40px] mb-[35px]">
                Verified Artisans
              </p>

              <p className="text-textGray text-[16px] w-full">
                All artisans go through our strict KYC verification process for your safety
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="mx-[6px] mb-6 lg:mb-0">
            <div className="bg-white rounded-[14px] border-[2px] border-bgGray w-full max-w-[380px] p-[24px] flex flex-col">
              <div className="bg-bgCompleted w-[48px] h-[48px] rounded-[10px] flex items-center justify-center mb-[16px]">
                <CiStar className="text-completed text-[26px]" />
              </div>

              <p className="font-semibold text-[18px] text-textColor mt-[40px] mb-[35px]">
                Trusted Reviews
              </p>

              <p className="text-textGray text-[16px] w-full">
                Read authentic reviews from verified customers to make informed decisions
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="mx-[6px]">
            <div className="bg-white rounded-[14px] border-[2px] border-bgGray w-full max-w-[380px] p-[24px] flex flex-col">
              <div className="bg-bgSaved w-[48px] h-[48px] rounded-[10px] flex items-center justify-center mb-[16px]">
                <BsClock className="text-saved text-[26px]" />
              </div>

              <p className="font-semibold text-[18px] text-textColor mt-[40px] mb-[35px]">
                Real-Time Tracking
              </p>

              <p className="text-textGray text-[16px] w-full">
                Track your artisan's location and get live updates on job progress
              </p>
            </div>
          </div>

        </div>
        {/* Card Section ends */}
      </div>
    </section>
  );
};

export default Choose;

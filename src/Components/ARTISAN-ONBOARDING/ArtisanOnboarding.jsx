import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

function ArtisanOnboarding() {
  // 1. Initialize the "master" state for the whole form
  const [formValues, setFormValues] = useState({});
  const location = useLocation();

  const stepMap = {
    "/artisan-onboarding/personal-info": 1,
    "/artisan-onboarding/professional-details": 2,
    "/artisan-onboarding/location": 3,
    "/artisan-onboarding/document-verification": 4,
    "/artisan-onboarding/bank-details": 5,
  };

  const step = stepMap[location.pathname] || 1;
  const TOTAL_STEPS = 5;
  const percent = Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFF6FF] to-[#FAF5FF] flex justify-center items-start pt-16">
      <div className="w-full max-w-[672px] ">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center">
            <img
              src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1770385830/LogoBlack_itldr3.png"
              alt="SkillZonet Logo"
              className="w-32 h-auto"
            />
          </div>
          <h1 className="my-2 text-textColor font-inter font-bold text-[30px] leading-[36px] tracking-[0.4px] text-center">
            Join as an Artisan
          </h1>
          <p className="font-inter font-normal text-base leading-6 tracking-[-0.31px] text-center text-textGray my-2">
            Complete your profile to start receiving requests
          </p>
        </div>

        {/* Progress */}
        <div className="mb-5">
          <div className="flex justify-between my-2 font-inter font-normal text-sm leading-5 tracking-[-0.15px]">
            <p>
              Step {step} of {TOTAL_STEPS}
            </p>
            <p className="text-textGray ">{percent}% Complete</p>
          </div>
          <div className="w-full bg-bgGray h-2 rounded">
            <div
              className="bg-black h-2 rounded"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow p-6 ">
          {/* 2. Pass the state and the setter to the steps via context */}
          <Outlet context={{ formValues, setFormValues }} />
        </div>

        {/* Footer */}
        <p className="text-xs text-center text-textGray mt-4">
          Need help? <span className="text-black">Contact support</span>
        </p>
      </div>
    </div>
  );
}

export default ArtisanOnboarding;

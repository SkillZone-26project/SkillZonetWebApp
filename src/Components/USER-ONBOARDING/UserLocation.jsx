import React from 'react'
import { ArrowLeft, ArrowRight, Home, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";


const UserLocation = () => {
 const navigate = useNavigate();
  const { formValues, setFormValues } = useOutletContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: formValues,
    mode: "onChange", // 🔥 enables live validation
  });

  const onSubmit = (data) => {
    setFormValues((prev) => ({ ...prev, ...data }));
    navigate("/user-onboarding/user-service-preference");
  };

  return (
    <div>
      {/* Icon Container */}
  <div className="
  /* Mobile Defaults (Smaller) */
  w-10 h-10 left-4
  /* Desktop Adjustments (Your original values) */
  md:w-[56px] md:h-[56px]
  /* Common Styles */
  mx-auto rounded-full bg-bgCompleted flex items-center justify-center mb-4">
    <MapPin className="text-completed w-[21.33333396911621px] h-[26.66633415222168px" />
  </div>

      {/* Title */}
      <h2 className="text-textColor font-semibold text-[24px] leading-[32px] tracking-[0.07px] text-center">
        Your Location
      </h2>
      <p className="text-textGray mb-8 font-normal text-[16px] leading-[24px] tracking-[-0.31px] text-center">
        Help us connect you with nearby artisans
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        < div className="space-y-4">

          {/* State */}
          <div>
            <label className="text-sm font-medium">
              State *
            </label>
            <select
              {...register("state", {
                required: "State is required",
              })}
              className={`w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm outline-none focus:ring-1 focus:ring-black ${
                errors.state ? "ring-1 ring-red-500" : ""
              }`}
            >
              <option value="">Select your state</option>
              <option value="abuja">Abuja</option>
              <option value="lagos">Lagos</option>
              <option value="rivers">Rivers</option>
            </select>

            {errors.state && (
              <p className="text-red-500 text-xs mt-1">
                {errors.state.message}
              </p>
            )}
          </div>

          {/* City/Area */}
          <div>
            <label className="text-sm font-medium">
              City/Area *
            </label>
            <input
              {...register("cityArea", {
                required: "City/Area is required",
              })}
              placeholder="e.g., Victoria Island"
              className={`w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm outline-none focus:ring-1 focus:ring-black ${
                errors.cityArea ? "ring-1 ring-red-500" : ""
              }`}
            >
            </input>

            {errors.cityArea && (
              <p className="text-red-500 text-xs mt-1">
                {errors.cityArea.message}
              </p>
            )}
          </div>

          {/* Street Address */}
          <div>
            <label className="text-sm font-medium">Street Address *</label>
            <input
              {...register("streetAddress", {
                required:"Street Address is required"
              })}
              type="text"
              placeholder="Enter your street address"
              className="w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm outline-none focus:ring-1 focus:ring-black"
            />
          </div>

              {/* Nearest Landmark */}
          <div>
            <label className="text-sm font-medium">
              Nearest Landmark (Optional)
            </label>
            <div className="relative">
                <Home className="absolute left-3 top-3 text-textGray" size={18} />
                <input
              {...register("nearestLandMark")}
              type="text"
              placeholder="e.g., Near Shoprite Mall"
              className="w-full h-[36px] bg-bgGray rounded-[8px] pr-[12px] pl-[36px] text-sm outline-none focus:ring-1 focus:ring-black"
            />
            <p className="text-xs text-textGray mt-1">
              Help artisans find you easily
            </p>
            </div>

            <div className="px-[4px] py-[16px] bg-[#EFF6FF] rounded mt-4 ">
                <p className="text-xs text-textBlue">📍 Your exact address will only be shared with artisans after you confirm a booking</p>
            </div>
            
          </div>


        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => navigate("/user-onboarding/user-personal-info")}
            className="w-[297px] h-[36px] bg-white border border-bgGray rounded-[8px] flex items-center justify-center gap-2 transition-all"
          >
            <ArrowLeft size={16} className="text-textColor" />
            <span className="font-['Inter'] font-medium text-[14px] text-textColor">
              Back
            </span>
          </button>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-[297px] h-[36px] rounded-[8px] flex items-center justify-center gap-2 bg-black text-white transition-all ${
              isValid ? "hover:bg-opacity-90" : "cursor-not-allowed"
            }`}
          >
            <span className="font-['Inter'] font-medium text-[14px]">
              Continue
            </span>
            <ArrowRight size={16} />
          </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserLocation
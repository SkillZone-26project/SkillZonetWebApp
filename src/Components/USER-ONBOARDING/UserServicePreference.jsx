import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Wrench } from "lucide-react";

const services = [
  { id: "plumbing", label: "Plumbing", icon: "🔧" },
  { id: "electrical", label: "Electrical", icon: "⚡" },
  { id: "carpentry", label: "Carpentry", icon: "🪚" },
  { id: "painting", label: "Painting", icon: "🎨" },
  { id: "masonry", label: "Masonry", icon: "🧱" },
  { id: "ac", label: "AC Repair", icon: "❄️" },
  { id: "cleaning", label: "Cleaning", icon: "🧹" },
  { id: "roofing", label: "Roofing", icon: "🏠" },
  { id: "tiling", label: "Tiling", icon: "⬜" },
  { id: "landscaping", label: "Landscaping", icon: "🌳" },
];

const UserServicePreference = () => {
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const selectedServices = watch("services") || [];

  const onSubmit = (data) => {
    console.log(data);
    navigate("/user-onboarding/confirmation");
  };

  return (
    
    <div>
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="bg-bgSaved p-3 rounded-full">
          <Wrench className="text-saved w-6 h-6" />
        </div>
      </div>
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-[24px] font-semibold text-textColor">
          Service Preferences
        </h2>
        <p className="text-sm text-textGray mt-1">
          What services are you interested in? (Optional)
        </p>
      </div>
      <p className="font-['Inter'] font-medium text-[14px] leading-[14px] tracking-[-0.15px] mb-4">Select services you might need</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {services.map((service) => {
            const isSelected = selectedServices.includes(service.id);

            return (
              <label
                key={service.id}
                className={`flex items-center gap-3 p-4 rounded-[10px] border transition cursor-pointer
                ${
                  isSelected
                    ? "border-black bg-gray-100 shadow-sm"
                    : "border-black/10 hover:border-black/30"
                }`}
              >
                <input
                  type="checkbox"
                  value={service.id}
                  {...register("services")}
                  className="hidden"
                />

                <span className="text-lg">{service.icon}</span>
                <span className="text-sm font-medium">
                  {service.label}
                </span>
              </label>
            );
          })}
        </div>

        {/* Helper Text */}
        <p className="text-xs text-textGray">
          We'll personalize your experience based on your selections.
        </p>

        {/* Almost Done Box */}
        
        <div className="bg-[#f0fdf4] border border-[#b9f8cf] rounded-[10px] px-3 py-4">
          <div className="flex items-start gap-2">
            <CheckCircle className=" w-6 h-6 font-[medium] text-[#00A63E]" />
            <div className="font-inter">
              <p className="font-medium text-base tracking-[-0.31px] text-[#016630]">
                Almost Done!
              </p>
              <p className="text-sm font-normal tracking-[-0.15px] text-[#008236]">
                Once you create your account, you can start browsing and booking trusted artisans instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Agreements */}
        <div className="space-y-3 border border-t-[#0000001A] p-4 opacity-100 rounded-[10px]">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              {...register("terms", { required: true })}
              className="w-4 h-4 accent-black"
            />
            I agree to the Terms of Service and Privacy Policy
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              {...register("marketing")}
              className="w-4 h-4 accent-black"
            />
            Send me tips, updates, and promotional offers
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              {...register("notifications")}
              className="w-4 h-4 accent-black"
            />
            Get notified about booking updates and messages
          </label>
        </div>
        


        {/* Buttons */}
        <div className="flex gap-3 pt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-[297px] h-[36px] bg-white border border-bgGray rounded-[8px] flex items-center justify-center gap-2 transition-all"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-[297px] h-[36px] rounded-[8px] flex items-center justify-center gap-2 bg-black text-white transition-all ${
              isValid
                ? "hover:bg-opacity-90"
                : "cursor-not-allowed"
            }`}
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};



export default UserServicePreference
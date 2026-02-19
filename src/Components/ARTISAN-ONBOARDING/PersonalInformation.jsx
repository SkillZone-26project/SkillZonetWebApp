import { useForm } from "react-hook-form";
import { Mail, Phone, Lock, User, ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom"; // 1. Import these hooks

function PersonalInformation() {
  const navigate = useNavigate();
  // 2. Get the state and setter from the Parent (ArtisanOnboarding)
  const { formValues, setFormValues } = useOutletContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: formValues,
    mode: "onChange", // important
  });

  
  const onSubmit = (data) => {
    // 4. Update the global state with this step's data
    setFormValues((prev) => ({ ...prev, ...data }));
    
    // 5. Navigate to the next URL in your stepMap
    navigate("/artisan-onboarding/professional-details");
  };
  
  return (
    <div>
      {/* Icon & Header */}
      <div className="flex justify-center mb-4">
        <div className="bg-bgActive p-3 rounded-full text-thisMonth">
          <User className="w-[32px] h-[32px]" />
        </div>
      </div>
      <h2 className="text-textColor font-semibold text-[24px] leading-[32px] tracking-[0.07px] text-center">
        Personal Information
      </h2>
      <p className="text-textGray mb-8 font-normal text-[16px] leading-[24px] tracking-[-0.31px] text-center">
        Let's start with your basic details
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
        {/* First & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold">First Name *</label>
            <input
              {...register("firstName", {
                required: "First name is required",
              })}
              placeholder="John"
              className={`w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm outline-none focus:ring-1 focus:ring-black ${
                errors.firstName ? "ring-1 ring-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          {/* ... Repeat for Last Name ... */}
          <div className="space-y-1">
            <label className="text-sm font-semibold">Last Name *</label>
            <input
              {...register("lastName", {
                required: "Last name is required",
              })}
              placeholder="Mensah"
              className={`w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm outline-none focus:ring-1 focus:ring-black ${
                errors.lastName ? "ring-1 ring-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-1">
          <label className="text-sm font-semibold">Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-textGray" size={18} />
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              type="email"
              placeholder="john@email.com"
              className={`w-full h-[36px] bg-bgGray rounded-[8px] pl-[36px] pr-[12px] text-sm outline-none focus:ring-1 focus:ring-black ${
                errors.email ? "ring-1 ring-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-1">
          <label className="text-sm font-semibold">Phone Number *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-textGray" size={18} />
            <input
              {...register("phone", {
                required: "Phone number is required",
              })}
              placeholder="+234 802 123 4567"
              className={`w-full h-[36px] bg-bgGray rounded-[8px] pl-[36px] pr-[12px] text-sm outline-none focus:ring-1 focus:ring-black ${
                errors.phone ? "ring-1 ring-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-semibold">Create Password *</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-textGray" size={18} />
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              type="password"
              placeholder="Min. 8 characters"
              className={`w-full h-[36px] bg-bgGray rounded-[8px] pl-[36px] pr-[12px] text-sm outline-none focus:ring-1 focus:ring-black ${
                errors.password ? "ring-1 ring-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center mt-8">
          <button
            type="button"
            onClick={() => navigate(-1)} // Use navigate(-1) to go back
            className="w-[297px] h-[36px] bg-white border border-bgGray rounded-[8px] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
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
              isValid
                ? "hover:bg-opacity-90"
                : "cursor-not-allowed"
            }`}
          >
            <span className="font-['Inter'] font-medium text-[14px]">
              Continue
            </span>
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalInformation;

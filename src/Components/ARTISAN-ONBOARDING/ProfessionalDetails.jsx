import { ArrowLeft, ArrowRight, Briefcase } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";

function ProfessionalDetails() {
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
    navigate("/artisan-onboarding/location");
  };

  return (
    <div>
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="bg-bgSaved p-3 rounded-full">
          <Briefcase className="text-saved w-6 h-6" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-textColor font-semibold text-[24px] leading-[32px] tracking-[0.07px] text-center">
        Professional Details
      </h2>
      <p className="text-textGray mb-8 font-normal text-[16px] leading-[24px] tracking-[-0.31px] text-center">
        Tell us about your expertise
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {/* Business Name */}
          <div>
            <label className="text-sm font-medium">
              Business Name (Optional)
            </label>
            <input
              {...register("businessName")}
              type="text"
              placeholder="Mensah Plumbing Services"
              className="w-full h-[36px] bg-bgGray rounded-[8px] pl-[36px] pr-[12px] text-sm outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Primary Skill */}
          <div>
            <label className="text-sm font-medium">
              Primary Skill Category *
            </label>
            <select
              {...register("primarySkill", {
                required: "Primary skill is required",
              })}
              className={`w-full h-[36px] bg-bgGray rounded-[8px] pl-[36px] pr-[12px] text-sm outline-none focus:ring-1 focus:ring-black ${
                errors.primarySkill ? "ring-1 ring-red-500" : ""
              }`}
            >
              <option value="">Select your primary skill</option>
              <option>Plumbing</option>
              <option>Electrical</option>
              <option>Carpentry</option>
            </select>

            {errors.primarySkill && (
              <p className="text-red-500 text-xs mt-1">
                {errors.primarySkill.message}
              </p>
            )}
          </div>

          {/* Additional Skills */}
          <div>
            <label className="text-sm font-medium">Additional Skills</label>
            <input
              {...register("additionalSkills")}
              type="text"
              placeholder="e.g. Pipe Fitting, Water Heater Installation"
              className="w-full h-[36px] bg-bgGray rounded-[8px] pl-[36px] pr-[12px] text-sm outline-none focus:ring-1 focus:ring-black"
            />
            <p className="text-xs text-textGray mt-1">
              Separate multiple skills with commas
            </p>
          </div>

          {/* Years of Experience */}
          <div>
            <label className="text-sm font-medium">Years of Experience *</label>
            <select
              {...register("yearsOfExperience", {
                required: "Years of experience is required",
              })}
              className={`w-full h-[36px] bg-bgGray rounded-[8px] pl-[36px] pr-[12px] text-sm outline-none focus:ring-1 focus:ring-black
              ${errors.yearsOfExperience ? "border-red-500" : ""}`}
            >
              <option value="">Select experience level</option>
              <option>1-2 Years</option>
              <option>3-5 Years</option>
              <option>5+ Years</option>
            </select>

            {errors.yearsOfExperience && (
              <p className="text-red-500 text-xs mt-1">
                {errors.yearsOfExperience.message}
              </p>
            )}
          </div>

          {/* Professional Bio */}
          <div>
            <label className="text-sm font-medium">Professional Bio *</label>
            <textarea
              {...register("professionalBio", {
                required: "Professional bio is required",
                minLength: {
                  value: 50,
                  message: "Bio must be at least 50 characters",
                },
              })}
              rows="4"
              placeholder="Describe your experience, specialties, and what sets you apart..."
              className={`w-full bg-bgGray rounded-[8px] pl-[36px] pr-[12px] text-sm outline-none focus:ring-1 focus:ring-black
              ${errors.professionalBio ? "border-red-500" : ""}`}
            ></textarea>

            {errors.professionalBio && (
              <p className="text-red-500 text-xs mt-1">
                {errors.professionalBio.message}
              </p>
            )}
          </div>

          {/* Hourly Rate */}
          <div>
            <label className="text-sm font-medium">Hourly Rate (₦) *</label>
            <input
              {...register("hourlyRate", {
                required: "Hourly rate is required",
                min: {
                  value: 1,
                  message: "Hourly rate must be greater than 0",
                },
              })}
              type="number"
              placeholder="10000"
              className={`w-full h-[36px] bg-bgGray rounded-[8px] pl-[36px] pr-[12px] text-sm outline-none focus:ring-1 focus:ring-black
              ${errors.hourlyRate ? "border-red-500" : ""}`}
            />

            {errors.hourlyRate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.hourlyRate.message}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
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
              isValid ? "hover:bg-opacity-90" : "cursor-not-allowed"
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

export default ProfessionalDetails;

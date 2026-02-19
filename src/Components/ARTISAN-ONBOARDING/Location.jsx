import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";

function Location() {
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
    navigate("/artisan-onboarding/document-verification");
  };

  return (
    <div>
      {/* Icon Container */}
      <div className="flex justify-center mb-4">
        <div className="
  /* Mobile Defaults (Smaller) */
  w-10 h-10 left-4
  /* Desktop Adjustments (Your original values) */
  md:w-[56px] md:h-[56px]
  /* Common Styles */
  mx-auto rounded-full bg-bgCompleted flex items-center justify-center mb-4">
    <MapPin className="text-completed w-[21.33333396911621px] h-[26.66633415222168px" />
  </div>
      </div>
  

      {/* Title */}
      <h2 className="text-textColor font-semibold text-[24px] leading-[32px] tracking-[0.07px] text-center">
        Location & Coverage
      </h2>
      <p className="text-textGray mb-8 font-normal text-[16px] leading-[24px] tracking-[-0.31px] text-center">
        Where do you provide services?
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">

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
              placeholder="Enter your business address"
              className="w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* State */}
          <div>
            <label className="text-sm font-medium">
              Service Coverage Radius *
            </label>
            <select
              {...register("serviceCoverageRadius", {
                required: "Service Coverage Radius is required",
              })}
              className={`w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm outline-none focus:ring-1 focus:ring-black ${
                errors.serviceCoverageRadius ? "ring-1 ring-red-500" : ""
              }`}>
              <option value="">How far can you travel?</option>
              <option value="5km">Up to 5km</option>
              <option value="10km">Up to 10km</option>
              <option value="20km">Up to 20km</option>
              <option value="statewide">Anywhere in the state</option>
            </select>

            {errors.serviceCoverageRadius && (
              <p className="text-red-500 text-xs mt-1">
                {errors.serviceCoverageRadius.message}
              </p>
            )}
          </div>


        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => navigate("/artisan-onboarding/professional-details")}
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
        </div>
      </form>
    </div>
  );
}

export default Location;

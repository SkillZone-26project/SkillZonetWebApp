import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

function Location() {

  const navigate = useNavigate();

  const {
    formValues,
    setFormValues,
  } = useOutletContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: formValues,
    mode: "onChange",
  });

  // ✅ SUBMIT TO BACKEND
  const onSubmit = async (data) => {

    // ✅ IMPORTANT
    // Merge ALL previous pages correctly
    const finalData = {
      ...formValues,
      ...data,
    };

    // ✅ SAVE UPDATED VALUES
    setFormValues(finalData);

    // ✅ DEBUG LOGS
    console.log("=================================");
    console.log("🚀 FINAL ARTISAN REGISTRATION");
    console.log("=================================");

    console.log("✅ ROLE PAGE DATA");
    console.log({
      role: finalData.role,
    });

    console.log("=================================");

    console.log("✅ PERSONAL INFORMATION DATA");
    console.log({
      fullName: finalData.fullName,
      email: finalData.email,
      password: finalData.password,
      phone: finalData.phone,
      age: finalData.age,
      sex: finalData.sex,
    });

    console.log("=================================");

    console.log("✅ PROFESSIONAL DETAILS DATA");
    console.log({
      businessName: finalData.businessName,
      yearsExperience: finalData.yearsExperience,
      skills: finalData.skills,
    });

    console.log("=================================");

    console.log("✅ LOCATION SEARCH DATA");
    console.log({
      address: finalData.address,
      city: finalData.city,
      state: finalData.state,
      latitude: finalData.latitude,
      longitude: finalData.longitude,
    });

    console.log("=================================");

    console.log("✅ FULL PAYLOAD SENT TO BACKEND");
    console.log(finalData);

    console.log("=================================");

    // ✅ CHECK MISSING FIELDS
    if (
      !finalData.email ||
      !finalData.password ||
      !finalData.fullName ||
      !finalData.phone ||
      !finalData.sex ||
      !finalData.age
    ) {

      console.log("❌ SOME REQUIRED FIELDS ARE MISSING");

      console.log({
        email: finalData.email,
        password: finalData.password,
        fullName: finalData.fullName,
        phone: finalData.phone,
        sex: finalData.sex,
        age: finalData.age,
      });

      alert(
        "Some required fields are missing. Please go back and complete Personal Information page."
      );

      return;
    }

    try {

      // ✅ PAYLOAD
      const payload = {
        email: finalData.email,
        password: finalData.password,
        fullName: finalData.fullName,

        // ✅ BACKEND ENUM
        sex: String(
          finalData.sex
        ).toUpperCase(),

        age: Number(finalData.age),

        phone: finalData.phone,

        city: finalData.city,
        state: finalData.state,

        latitude: Number(finalData.latitude),
        longitude: Number(finalData.longitude),

        address: finalData.address,

        skills: finalData.skills || [],

        businessName:
          finalData.businessName || "",

        yearsExperience: Number(
          finalData.yearsExperience
        ),
      };

      console.log("=================================");
      console.log("✅ CLEAN PAYLOAD");
      console.log(payload);
      console.log("=================================");

      // ✅ BACKEND REQUEST
      const res = await axios.post(
        "https://skillzonet-backend-auth-v1.onrender.com/api/artisans/register",
        payload
      );

      console.log("=================================");
      console.log("✅ BACKEND SUCCESS RESPONSE");
      console.log(res.data);
      console.log("=================================");

      // ✅ STORE TOKENS
      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "refreshToken",
        res.data.refreshToken
      );

      localStorage.setItem(
        "verifyEmail",
        finalData.email
      );

      // ✅ NAVIGATE TO OTP PAGE
      navigate("/otpVerification");

    } catch (err) {

      console.log("=================================");
      console.log("❌ BACKEND ERROR");
      console.log(err.response?.data || err.message);
      console.log("=================================");

      alert(
        err.response?.data?.message ||
        "Registration failed"
      );

    }

  };

  return (
    <div>

      {/* Icon */}
      <div className="flex justify-center mb-4">

        <div className="w-10 h-10 md:w-[56px] md:h-[56px] mx-auto rounded-full bg-bgCompleted flex items-center justify-center mb-4">

          <MapPin className="text-completed w-[21.33px] h-[26.66px]" />

        </div>

      </div>

      {/* Title */}
      <h2 className="text-textColor font-semibold text-[24px] text-center">
        Location & Coverage
      </h2>

      <p className="text-textGray mb-8 text-center">
        Where do you provide services?
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="space-y-4">

          {/* Address */}
          <div>

            <label className="text-sm font-medium">
              Address <span className="text-red-500">*</span>
            </label>

            <input
              {...register("address", {
                required: "Address is required",
              })}
              placeholder="Enter address"
              className={`w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm ${
                errors.address
                  ? "ring-1 ring-red-500"
                  : ""
              }`}
            />

            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address.message}
              </p>
            )}

          </div>

          {/* City */}
          <div>

            <label className="text-sm font-medium">
              City/Area <span className="text-red-500">*</span>
            </label>

            <input
              {...register("city", {
                required: "City/Area is required",
              })}
              placeholder="Enter city"
              className={`w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm ${
                errors.city
                  ? "ring-1 ring-red-500"
                  : ""
              }`}
            />

            {errors.city && (
              <p className="text-red-500 text-xs mt-1">
                {errors.city.message}
              </p>
            )}

          </div>

          {/* State */}
          <div>

            <label className="text-sm font-medium">
              State <span className="text-red-500">*</span>
            </label>

            <input
              {...register("state", {
                required: "State is required",
              })}
              placeholder="Enter state"
              className={`w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm ${
                errors.state
                  ? "ring-1 ring-red-500"
                  : ""
              }`}
            />

            {errors.state && (
              <p className="text-red-500 text-xs mt-1">
                {errors.state.message}
              </p>
            )}

          </div>

          {/* Latitude */}
          <div>

            <label className="text-sm font-medium">
              Latitude
            </label>

            <input
              {...register("latitude")}
              placeholder="Latitude"
              className="w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm"
            />

          </div>

          {/* Longitude */}
          <div>

            <label className="text-sm font-medium">
              Longitude
            </label>

            <input
              {...register("longitude")}
              placeholder="Longitude"
              className="w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm"
            />

          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 mt-8">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-[297px] h-[36px] bg-white border rounded-[8px] flex items-center justify-center gap-2"
            >

              <ArrowLeft size={16} />
              Back

            </button>

            <button
              type="submit"
              disabled={!isValid}
              className={`w-[297px] h-[36px] rounded-[8px] flex items-center justify-center gap-2 bg-black text-white ${
                !isValid &&
                "cursor-not-allowed"
              }`}
            >

              Submit
              <ArrowRight size={16} />

            </button>

          </div>

        </div>

      </form>

    </div>
  );
}

export default Location;
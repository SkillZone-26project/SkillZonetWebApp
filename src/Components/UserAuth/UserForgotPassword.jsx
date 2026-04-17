import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserForgotPassword = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://skillzonet-backend-auth-v1.onrender.com/api/userAuth/forgot-password", // ✅ DIRECT API
        {
          email: data.email,
        }
      );

      console.log("FORGOT RESPONSE:", res.data);

      if (res.status === 200) {
        localStorage.setItem("resetEmail", data.email);

        alert("OTP sent to your email");

        navigate(`/user-reset-password`);
      }

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        "Failed to send OTP"
      );
    }
  };

  return (
    <div className="w-full bg-white">
      {/* LOGO SECTION */}
      <div className="flex items-center justify-center mb-10">
        <img
          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1774017217/SkillZonet_Logo_2_erxxta.png"
          alt="SkillZonet Logo"
          className="w-[70px] h-[75px]"
        />
      </div>

      {/* HEADER */}
      <h1 className="font-inter font-bold text-2xl md:text-3xl text-center">
        Forgot Password
      </h1>
      <p className="font-inter font-medium text-[12px] leading-[20px] tracking-[-0.15px] text-center text-black mb-8">
        Please enter your registered email to proceed
      </p>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 pb-8"
      >
        {/* EMAIL */}
        <div>
          <input
            type="email"
            placeholder="Email"
            className={`w-full h-[56px] px-3 rounded-lg bg-[#E9E8E8] outline-none mb-5 transition-all ${
              errors.email ? "border border-red-500" : ""
            }`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[44px] rounded-lg bg-[#0B0F1A] text-white font-semibold uppercase transition hover:bg-[#111827]"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        {/* DIVIDER */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#F7F7F7] px-4 text-gray-400 font-medium">
              Or
            </span>
          </div>
        </div>

        {/* BACK TO LOGIN */}
        <Link
          to="/login"
          className="w-full h-[44px] flex items-center justify-center rounded-lg bg-[#0B0F1A] text-white font-semibold transition hover:bg-[#111827]"
        >
          Back To Log In
        </Link>
      </form>
    </div>
  );
};

export default UserForgotPassword;
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoCloseCircle } from "react-icons/io5";

const ForgotPassword = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {

    try {

      console.log("=================================");
      console.log("🚀 FORGOT PASSWORD REQUEST");
      console.log("=================================");
      console.log("EMAIL:", data.email);

      const res = await axios.post(
        "https://skillzonet-backend-auth-v1.onrender.com/api/userAuth/forgot-password",
        {
          email: data.email,
        }
      );

      console.log("=================================");
      console.log("✅ FORGOT PASSWORD SUCCESS");
      console.log("=================================");
      console.log("FULL RESPONSE:", res);
      console.log("RESPONSE DATA:", res.data);

      if (res.status === 200) {

        localStorage.setItem("resetEmail", data.email);

        alert("OTP sent to your email");

        navigate("/user-reset-password");
      }

    } catch (err) {

      console.log("=================================");
      console.log("❌ FORGOT PASSWORD ERROR");
      console.log("=================================");

      console.log("FULL ERROR:", err);

      console.log("ERROR MESSAGE:", err.message);

      console.log("ERROR RESPONSE:", err.response);

      console.log("ERROR STATUS:", err.response?.status);

      console.log("ERROR DATA:", err.response?.data);

      alert(
        err.response?.data?.message ||
        "Failed to send OTP"
      );
    }
  };

  return (
    <div className="w-full bg-white relative">

      {/* CLOSE BUTTON */}
      <div className="absolute  left-0">
        <IoCloseCircle
          onClick={() => navigate(-1)}
          className="text-[28px] text-textGray hover:text-black cursor-pointer"
        />
      </div>

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
          to="/user-login"
          className="w-full h-[44px] flex items-center justify-center rounded-lg bg-[#0B0F1A] text-white font-semibold transition hover:bg-[#111827]"
        >
          Back To Log In
        </Link>

      </form>
    </div>
  );
};

export default ForgotPassword;
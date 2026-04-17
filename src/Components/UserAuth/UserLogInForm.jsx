import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; 
import { IoCloseCircle } from "react-icons/io5";

const UserLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
  try {
    const payload = {
      email: data.email,
      password: data.password,
      device: navigator.platform,
      userAgent: navigator.userAgent,
    };

    const response = await axios.post(
      "https://skillzonet-backend-auth-v1.onrender.com/api/userAuth/login",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const { token, refreshToken, sessionId } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("sessionId", sessionId);

      navigate("/user"); // ✅ keep this
    }

  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);

    alert(
      error.response?.data?.message || "Login failed. Please try again."
    );
  }
};

  return (
    <div className="w-full bg-white">
      {/* LOGO SECTION */}

      {/* CLOSE BUTTON */}
            <div className="absolute top-6 left-[30px] lg:left-[85px] group cursor-pointer">
              <IoCloseCircle
                onClick={() => navigate(-1)}
                className="text-[28px] text-textGray hover:text-textColor transition"
              />
              <span className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-xs px-2 py-1 rounded">
                Close
              </span>
            </div>
      <div className="flex items-center justify-center mb-10">
        <img
          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1774017217/SkillZonet_Logo_2_erxxta.png"
          alt="SkillZonet Logo"
          className="w-[70px] h-[75px]"
        />
      </div>

      {/* HEADER */}
      <h1 className="font-inter font-bold text-2xl md:text-3xl text-center mb-10">
        Sign In
      </h1>

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
            className={`w-full h-[56px] px-3 rounded-lg bg-[#E9E8E8] outline-none transition-all ${
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

        {/* PASSWORD */}
        <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className={`w-full h-[56px] px-4 pr-12 rounded-lg bg-[#E9E8E8] outline-none ${
      errors.password ? "border border-red-500" : ""
    }`}
    {...register("password", {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        message:
          "Must include uppercase, lowercase, number & special character",
      },
    })}
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>

  {errors.password && (
    <p className="text-red-500 text-sm mt-1">
      {errors.password.message}
    </p>
  )}
</div>

        {/* FORGOT PASSWORD */}
        <Link 
          to="/user-forgot-password"
          className="font-bold text-[12px] text-black"
        >
          Forgot password?
        </Link>

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[44px] flex justify-center items-center gap-2 rounded-lg bg-[#030213] text-white font-bold transition hover:bg-[#111827] disabled:opacity-70"
        >
          {isSubmitting ? "Logging in..." : "Log in"}
          {!isSubmitting && (
            <ArrowRight className="w-[16px] h-[16px]" />
          )}
        </button>

        {/* POLICY TEXT */}
        <p className="text-center text-xs text-gray-500">
          I agree to abide by SkillZonet{" "}
          <a href="#" className="text-[#FF850B]">
            Terms of Service
          </a>{" "}
          and its Privacy Policy
        </p>

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

       {/* GOOGLE BUTTON */}
        <button 
        type="submit"
        className="w-full h-[44px] flex items-center justify-center gap-[10px] lg:gap-[30px] px-3 py-2 bg-[#CECECE] text-black font-bold rounded-lg ">
   {/* Google "G" Logo SVG  */}
  <img src="https://res.cloudinary.com/dqtyrjpeh/image/upload/q_auto/f_auto/v1776284079/devicon_google_ojgeln.png" alt="" />
  <span className="text-sm">CONTINUE WITH GOOGLE</span>
</button>

        <p className="font-bold text-[16px] leading-[16px] tracking-[0.004em] text-[#FF9429] text-center">DON’T HAVE A SKILLZONET ACCOUNT?</p>
        <Link
          to="/user-onboarding"
          className="w-full h-[44px] flex items-center justify-center rounded-lg bg-textColor text-white font-semibold transition hover:bg-[#111827]">
          SIGN UP
          </Link>
      </form>
    </div>
  );
};

export default UserLoginForm;
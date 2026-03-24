import { loginUser } from "../../api/authApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload={
        email: data.email,
        password: data.password,
        device: navigator.platform,
        ipAddress: "127.0.0.1",
        userAgent: navigator.userAgent,
      };
      const response= await loginUser(payload);
      if (response.status===200){
        const{ token, refreshToken, sessionId }= response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("sessionId", sessionId);

        navigate("/dashboard");
      }

    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="w-full bg-white">
      {/* LOGO SECTION */}
      <div className="flex items-center justify-center mb-[10px]">
        <img
            src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1774017217/SkillZonet_Logo_2_erxxta.png"
            alt="SkillZonet Logo"
            className="w-[70px] h-[75px]"
          />
      </div>

      {/* HEADER */}
      <h1 className="font-inter font-bold text-2xl md:text-3xl text-center mb-[10px]">
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
          to="forgot-password"
          className="font-bold text-[12px] text-black"
        >
          Forget password?
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
        <p className="text-center text-[11px] text-gray-500">
          I agree to abide by SkillZonet{" "}
          <a href="#" className="text-[#FDBA74]">
            Terms of Service
          </a>{" "}
          and its Privacy Policy
        </p>

        {/* DIVIDER */}
        <div className="relative py-[10px]">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#F7F7F7] px-[10px] text-gray-400 font-medium">
              Or
            </span>
          </div>
        </div>

        {/* GOOGLE BUTTON */}
        <button
          type="button"
          className="w-full h-[44px] flex items-center justify-center gap-2 rounded-lg bg-[#D1D5DB] text-[#111827] font-bold transition hover:bg-gray-300"
        >
         <span className="text-lg font-semibold tracking-tight">
          <img src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1774199267/logos_google_1_cgezg7.png" alt="" />
        </span>
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Phone, Lock, LockOpen, User, ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";

const UserPersonalInformation = () => {
  const navigate = useNavigate();
  const { formValues, setFormValues } = useOutletContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: formValues,
    mode: "onChange",
  });

  const password = watch("password");

  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerUser = async (payload) => {
    try {
      const response = await fetch(
        "https://skillzonet-backend-auth-v1.onrender.com/api/userAuth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("📦 RAW BACKEND RESPONSE:", data);

      if (!response.ok) {
        throw { response: { data, status: response.status } };
      }

      return { status: response.status, data };
    } catch (err) {
      console.error("❌ FETCH ERROR:", err);
      throw err;
    }
  };

  const onSubmit = async (data) => {
    setApiError("");
    setLoading(true);

    try {
      const payload = {
        email: data.email,
        password: data.password,
        fullName: `${data.firstName} ${data.lastName}`,
        sex: data.gender.toUpperCase(),
        age: parseInt(data.age),
        phone: data.phone.trim(),
      };

      console.log("📤 Payload being sent:", payload);

      const response = await registerUser(payload);

      console.log("✅ SUCCESS RESPONSE:", response);

      if (response.status === 201) {
        console.log("🎉 Account created, OTP should be sent", response.data);

        // ✅ Save token
        if (response.data?.token) {
          localStorage.setItem("token", response.data.token);
        }
 if (response.data?.user?.role) {
  localStorage.setItem("userRole", response.data.user.role);
}
        navigate("/otpVerification");
      }
    } catch (error) {
      console.error("❌ FULL ERROR OBJECT:", error);

      if (error.response) {
        setApiError(
          error.response.data?.message || "Backend error occurred. Check console."
        );
      } else if (error.request) {
        setApiError("No response from server. Check your internet.");
      } else {
        setApiError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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

        {apiError && (
          <p className="text-red-500 text-sm">{apiError}</p>
        )}

        {/* First & Last Name */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">

          <div className="space-y-1">
            <label className="text-sm font-semibold">
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              {...register("firstName", { required: "First name is required" })}
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

          <div className="space-y-1">
            <label className="text-sm font-semibold">
              Last Name<span className="text-red-500">*</span>
            </label>
            <input
              {...register("lastName", { required: "Last name is required" })}
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

        {/* Age & Gender */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">

          <div className="space-y-1">
            <label className="text-sm font-semibold">
              Age<span className="text-red-500">*</span>
            </label>
            <select
              {...register("age", { required: "Age is required" })}
              className={`w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm outline-none focus:ring-1 focus:ring-black ${
                errors.age ? "ring-1 ring-red-500" : ""
              }`}
              defaultValue=""
            >
              <option value="" disabled>Select age</option>
              {[...Array(83)].map((_, i) => (
                <option key={i} value={i + 18}>{i + 18}</option>
              ))}
            </select>
            {errors.age && (
              <p className="text-xs text-red-500 mt-1">
                {errors.age.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold">
              Gender<span className="text-red-500">*</span>
            </label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className={`w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm outline-none focus:ring-1 focus:ring-black ${
                errors.gender ? "ring-1 ring-red-500" : ""
              }`}
              defaultValue=""
            >
              <option value="" disabled>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-xs text-red-500 mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-semibold">
            Email Address<span className="text-red-500">*</span>
          </label>
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
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-sm font-semibold">
            Phone Number<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-textGray" size={18} />
            <input
              {...register("phone", { required: "Phone number is required" })}
              placeholder="+234 802 123 4567"
              className={`w-full h-[36px] bg-bgGray rounded-[8px] pl-[36px] pr-[12px] text-sm outline-none focus:ring-1 focus:ring-black ${
                errors.phone ? "ring-1 ring-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-semibold">
            Create Password<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-3 text-textGray hover:text-black transition-colors"
            >
              {showPassword ? <LockOpen size={18} /> : <Lock size={18} />}
            </button>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              className={`w-full h-[36px] bg-bgGray rounded-[8px] pl-[36px] pr-[12px] text-sm outline-none focus:ring-1 focus:ring-black ${
                errors.password ? "ring-1 ring-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="text-sm font-semibold">
            Confirm Password<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-3 top-3 text-textGray hover:text-black transition-colors"
            >
              {showConfirmPassword ? <LockOpen size={18} /> : <Lock size={18} />}
            </button>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter password"
              className={`w-full h-[36px] bg-bgGray rounded-[8px] pl-[36px] pr-[12px] text-sm outline-none focus:ring-1 focus:ring-black ${
                errors.confirmPassword ? "ring-1 ring-red-500" : ""
              }`}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-center mt-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-[297px] h-[36px] bg-white border border-bgGray rounded-[8px] flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-[297px] h-[36px] rounded-[8px] flex items-center justify-center gap-2 bg-black text-white"
          >
            {loading ? "Creating..." : "Create Account"}
            <ArrowRight size={16} />
          </button>
        </div>

      </form>
    </div>
  );
};

export default UserPersonalInformation;
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios"; // ✅ ADDED

const UserResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(236);
  const [otpVerified, setOtpVerified] = useState(false);
  const [canResend, setCanResend] = useState(false);

  const inputsRef = useRef([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const email = localStorage.getItem("resetEmail");
      const code = otp.join("");

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/userAuth/reset-password`,
        {
          email,
          otp: code,
          newPassword: data.password,
        }
      );

      console.log("RESET RESPONSE:", res.data);

      if (res.status === 200) {
        alert("Password reset successful");

        localStorage.removeItem("resetEmail");

        window.location.href = "/login";
      }

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        "Password reset failed"
      );
    }
  };

  /* TIMER */
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  /* AUTO FOCUS FIRST OTP BOX */
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  /* OTP INPUT HANDLER */
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }

    const code = newOtp.join("");

    if (code.length === 6) {
      setOtpVerified(true); // ✅ simple enable
    }
  };

  /* BACKSPACE NAVIGATION */
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  /* HANDLE OTP PASTE */
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");

    if (!/^\d{6}$/.test(paste)) return;

    const pasteArray = paste.split("");
    setOtp(pasteArray);

    pasteArray.forEach((num, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = num;
      }
    });

    setOtpVerified(true);
  };

  /* RESEND OTP */
  const handleResend = () => {
    setOtp(Array(6).fill(""));
    setTimeLeft(236);
    setCanResend(false);
    setOtpVerified(false);
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="w-full bg-white">
      {/* LOGO */}
      <div className="flex justify-center items-center mb-8">
        <img
          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1774017217/SkillZonet_Logo_2_erxxta.png"
          alt="SkillZonet Logo"
          className="w-[70px] h-[75px]"
        />
      </div>

      {/* HEADER */}
      <h1 className="font-inter font-bold text-2xl md:text-3xl text-center text-black">
        Reset Password
      </h1>

      <p className="font-inter font-medium text-[12px] leading-[20px] tracking-[-0.15px] text-center text-black mb-8">
        Please enter your one time password sent to your <br />
        registered email and entered your preferred password
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-8">

        {/* OTP INPUTS */}
        <div
          className="flex justify-center gap-2 sm:gap-3 mb-6"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-9 h-11 sm:w-10 sm:h-12 md:w-11 md:h-12 bg-[#E9E8E8] rounded-md text-center text-base sm:text-lg outline-none focus:ring-2 focus:ring-black"
            />
          ))}
        </div>

        {/* RESEND + TIMER */}
        <div className="flex justify-end items-center gap-3 font-inter font-bold text-[12px] leading-[100%] text-[#FF0900]">
          <button type="button" onClick={handleResend} disabled={!canResend}>
            Resend Code
          </button>
          <span>{formatTime(timeLeft)}</span>
        </div>

        {/* PASSWORD */}
        <div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              disabled={!otpVerified}
              className={`w-full h-[56px] px-3 pr-12 rounded-lg outline-none ${
                !otpVerified ? "bg-gray-200" : "bg-[#E9E8E8]"
              } ${errors.password ? "border border-red-500" : ""}`}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              })}
            />

            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              disabled={!otpVerified}
              className="w-full h-[56px] px-3 pr-12 rounded-lg bg-[#E9E8E8]"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />

            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2">
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting || !otpVerified}
          className="w-full h-[44px] rounded-lg bg-[#0B0F1A] text-white font-semibold uppercase"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        {/* BACK */}
        <Link
          to="/forgot-password"
          className="w-full h-[44px] flex items-center justify-center rounded-lg bg-[#0B0F1A] text-white font-semibold"
        >
          Back To Forgot Password
        </Link>

      </form>
    </div>
  );
};

export default UserResetPassword;
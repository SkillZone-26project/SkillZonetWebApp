import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
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
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert("Password reset successful (backend not connected yet)");
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
      verifyOtp(code);
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

    verifyOtp(paste);
  };

  /* OTP VERIFY (simulate backend) */
  const verifyOtp = (code) => {
    console.log("Verifying OTP:", code);

    setTimeout(() => {
      setOtpVerified(true);
    }, 1000);
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
          src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1770385830/LogoBlack_itldr3.png"
          alt="SkillZonet Logo"
          className="w-28 h-auto"
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
      className="
        w-9 h-11
        sm:w-10 sm:h-12
        md:w-11 md:h-12
        bg-[#E9E8E8]
        rounded-md
        text-center
        text-base sm:text-lg
        outline-none
        focus:ring-2 focus:ring-black
      "
    />
  ))}
</div>

        {/* RESEND + TIMER */}
        <div className="flex justify-end items-center gap-3 font-inter font-bold text-[12px] leading-[100%] text-[#FF0900]">
  <button
    type="button"
    onClick={handleResend}
    disabled={!canResend}
  >
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
                !otpVerified
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-[#E9E8E8]"
              } ${errors.password ? "border border-red-500" : ""}`}
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              disabled={!otpVerified}
              className={`w-full h-[56px] px-3 pr-12 rounded-lg outline-none ${
                !otpVerified
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-[#E9E8E8]"
              } ${
                errors.confirmPassword
                  ? "border border-red-500"
                  : ""
              }`}
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting || !otpVerified}
          className="w-full h-[44px] rounded-lg bg-[#0B0F1A] text-white font-semibold uppercase transition hover:bg-[#111827] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        {/* DIVIDER */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-gray-400 font-medium">
              Or
            </span>
          </div>
        </div>

        {/* BACK BUTTON */}
        <Link
          to="/forgot-password"
          className="w-full h-[44px] flex items-center justify-center rounded-lg bg-[#0B0F1A] text-white font-semibold transition hover:bg-[#111827]"
        >
          Back To Forgot Password
        </Link>

      </form>
    </div>
  );
};

export default ResetPassword;
import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { LuShieldCheck, LuSquareArrowLeft  } from "react-icons/lu";


// ✅ Utility to mask email
const maskEmail = (email) => {
  if (!email) return "";
  const [name, domain] = email.split("@");
  if (name.length <= 4) return email;
  return `${name.slice(0, 4)}****${name.slice(-2)}@${domain}`;
};

const OTPVerification = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState("");

  // ⏱️ Timer state (5 minutes = 300 seconds)
  const [timeLeft, setTimeLeft] = useState(300);

  // ⏱️ Timer effect
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // ✅ Convert seconds -> MM:SS
  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `00:${min}:${sec}`;
  };

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const next = document.getElementById(`otp-input-${index + 1}`);
        if (next) next.focus();
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const code = otp.join("");
      if (!code || code.length < 6) {
        setError("Please enter the 6-digit OTP");
        setLoading(false);
        return;
      }

      // const res = await axios.post(
      //   "https://backend-skillzonet.onrender.com/api/auth/verify-email",
      //   { email, otp: code }
      // );

      const token = localStorage.getItem("token");

await axios.post(
  "https://backend-skillzonet.onrender.com/api/auth/verify-email",
  { otp: code },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      if (res.data.success) {
        navigate("/login");
      } else {
        setError(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Resend OTP resets timer
  const handleResend = async () => {
    setError("");
    setResendMsg("");
    setResendLoading(true);

    try {
      const res = await axios.post(
        "https://backend-skillzonet.onrender.com/api/auth/resend-otp",
        { email }
      );

      if (res.data.success) {
        setResendMsg("A new OTP has been sent to your email.");
        setOtp(Array(6).fill(""));
        setTimeLeft(300); // reset timer to 5 min
      } else {
        setError(res.data.message || "Failed to resend OTP");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Resend failed, please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 font-secondary px-4">
      <div>
        <div className="flex flex-col items-center justify-center"> 
 <div><img src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1773612741/LOGO_3_r5us13.png" alt="" /></div> 
        <div className="text-[30px] font-bold text-textColor">
          <p>OTP Verification</p>
        </div>
        </div>
       <div className="ml-[20px] text-textGray hover:text-textColor transition-shadow">
            <LuSquareArrowLeft onClick={() => navigate(-1)} />
          </div>
      <div className="w-full max-w-md bg-white p-6 sm:p-6 rounded-2xl shadow-lg text-center">
        <div className="flex flex-col items-center justify-center"> 
          
<div className="bg-[#DBEAFE] w-[56px] h-[56px] rounded-[28px] text-[#0259CE] text-[30px] flex items-center justify-center">
  <LuShieldCheck />
</div>
</div>
        {/* Title */}
        <h1 className="text-[14px] sm:text-[22px] font-semibold text-gray-900 mb-4">
          Verification Code
        </h1>

        {/* OTP Label */}
        <p className="text-gray-800 text-sm font-medium mb-3 w-[307px]">
          We have sent the verification code to your
 email address
        </p>

        {/* OTP Input */}
        <form onSubmit={handleVerify}>
          <div className="flex justify-center gap-4 mb-6">
            {otp.map((digit, i) => (
              <div key={i} className="w-8 sm:w-10 md:w-12 flex flex-col items-center">
                <input
                  id={`otp-input-${i}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, i)}
                  className="w-full h-[56px] text-center text-lg sm:text-xl bg-transparent focus:outline-none border border-black rounded-[8px]"
                />
                              </div>
            ))}
          </div>

          {/* ✅ Show masked email only after full OTP entered */}
          {/* {otp.join("").length === 6 && (
            <p className="text-gray-600 text-sm mb-4">
              Code sent to <span className="font-medium">{maskEmail(email)}</span>
            </p>
          )} */}

          {/* Error message */}
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          {/* Resend success message */}
          {resendMsg && <p className="text-green-600 text-sm mb-3">{resendMsg}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="verifyButton w-full flex items-center justify-center gap-2 sm:gap-3 bg-black text-white font-medium text-sm sm:text-[14px] py-3 px-4 rounded-lg transition mb-4 disabled:opacity-50"
          >
            <span>{loading ? "Submiting..." : "Submit"}</span>
            <FaArrowRight className="text-base sm:text-lg" />
          </button>

          {/* Resend Options */}
          <div className="text-xs sm:text-[12px]">
            <p className="text-textGray">
              Didn’t receive the code <span className="text-[#000000]">?</span>{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={resendLoading}
                className="text-[#FF0000] font-medium hover:underline"
              >
                {resendLoading ? "Resending..." : "Resend via Email"}
              </button>
            </p>
          </div>

          {/* Expiry Note with countdown */}
          <div className="mt-3 text-[#C4BFBA] text-xs sm:text-[12px]">
            {timeLeft > 0 ? (
              <p className="text-textGray">
                Code will expire in <span className="countinDown font-semibold text-[#FF0000]">{formatTime(timeLeft)}</span>
              </p>
            ) : (
              <p className="text-[#FF0000] font-medium">OTP expired. Please resend.</p>
            )}
          </div>
        </form>
      </div>
      </div>
    </section>
  );
};

export default OTPVerification;

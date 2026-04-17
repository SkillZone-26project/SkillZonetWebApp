import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoCloseCircle } from "react-icons/io5";
import { LuShieldCheck, LuSquareArrowLeft } from "react-icons/lu";

const maskEmail = (email) => {
  if (!email) return "";
  const [name, domain] = email.split("@");
  if (name.length <= 4) return email;
  return `${name.slice(0, 4)}****${name.slice(-2)}@${domain}`;
};

const SelectLogin = () => {
  const navigate = useNavigate();

  const email = localStorage.getItem("verifyEmail");

  const [selectedRole, setSelectedRole] = useState("");

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState("");

  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `00:${min}:${sec}`;
  };

  const handleContinue = () => {
    if (!selectedRole) {
      alert("Please select a role first");
      return;
    }

    // ✅ SAVE ROLE HERE
    localStorage.setItem("userRole", selectedRole);

    if (selectedRole === "user") {
      navigate("/user-login");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 font-secondary px-4">
      <div>
        <div className="flex flex-col items-center justify-center">
          <img
            src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1774017217/SkillZonet_Logo_2_erxxta.png"
            alt="SkillZonet Logo"
            className="w-[70px] h-[75px]"
          />

          <p className="text-[20px] font-bold text-textColor">
            Select Your Role 
          </p>
        </div>

        <div className="relative ml-[20px] group">
          <IoCloseCircle
            onClick={() => navigate(-1)}
            className="text-[25px] text-textGray hover:text-textColor"
          />
          <span className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-xs px-2 py-1 rounded">
            Close
          </span>
        </div>

        <div className="w-full max-w-[900px] bg-white p-6 rounded-2xl shadow-lg text-center">
          <h1 className="text-[14px] sm:text-[24px] font-bold text-gray-900 mb-4">
            Choose your option and get login
          </h1>

          <div className="text-gray-800 flex flex-col items-center text-[24px] font-semibold w-full mx-auto mt-[50px] mb-[50px]">
            <p>Find Artisan,</p>
            <p>Connect with Client,</p>
            <p>Collaborate and</p>
            <p>Get Paid.</p>
          </div>

          <form>
            <div className="flex w-full border border-black rounded-[14px] overflow-hidden mb-[40px] text-[20px] font-normal">

              <button
                type="button"
                onClick={() => setSelectedRole("user")}
                className={`flex-1 h-[50px] flex items-center text-[18px] justify-center ${
                  selectedRole === "user"
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }`}
              >
                I’m a Client
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("artisan")}
                className={`flex-1 h-[50px] flex items-center text-[18px] justify-center border-l border-black ${
                  selectedRole === "artisan"
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }`}
              >
                I’m a Artisan
              </button>

            </div>

            <button
              type="button"
              onClick={handleContinue}
              className="w-full flex items-center justify-center gap-2 bg-black text-white font-medium text-[18px] py-3 px-4 rounded-lg mb-4 mt-[15px]"
            >
              <span>Continue</span>
              <FaArrowRight />
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default SelectLogin;

// const handleVerify = async (e) => {
//   e.preventDefault();
//   const code = otp.join("");
//   const token = localStorage.getItem("token");

//   try {
    // We only send 'otp' in the body because the controller 
    // gets the email from your middleware's 'req.authUser'
//     const res = await axios.post(
//       "https://backend-skillzonet.onrender.com/api/userAuth/verify-email",
//       { otp: code }, 
//       {
//         headers: { Authorization: `Bearer ${token}` }
//       }
//     );

//    if (res.data.success) {
//         alert("Email verified successfully");
//         localStorage.removeItem("userRole");
//         localStorage.removeItem("verifyEmail");

//         if (role === "user") navigate("/login");
//         else if (role === "artisan") navigate("/alogin");
//         else navigate("/login");
//       } else {
//         setError(res.data.message || "Verification failed");
//       }
//     } catch (err) {
//       if (err.response?.status === 401) setError("Invalid or expired OTP");
//       else setError(err.response?.data?.message || "OTP verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

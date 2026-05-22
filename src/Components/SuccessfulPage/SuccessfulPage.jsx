import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const SuccessfulPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [confetti, setConfetti] = useState([]);

  // ✅ FIXED ROLE HANDLING (IMPORTANT)
  const role =
    location.state?.role || localStorage.getItem("userRole");

  useEffect(() => {
    const pieces = Array.from({ length: 70 }).map((_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3,
      size: 8 + Math.random() * 12,
      shape: ["square", "spring"][Math.floor(Math.random() * 2)],
      color: [
        "#22c55e",
        "#3b82f6",
        "#eab308",
        "#ec4899",
        "#ef4444",
        "#8b5cf6",
      ][Math.floor(Math.random() * 6)],
    }));

    setConfetti(pieces);

    const timer = setTimeout(() => {
      setConfetti([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoginRedirect = () => {
    if (role === "artisan") {
      navigate("/login");
    } else {
      navigate("/user-login");
    }

    localStorage.removeItem("userRole");
  };

  return (
    <>
      <section className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 sm:px-6 z-50 overflow-hidden">

        {/* Celebration */}
        {confetti.map((item) => (
          <div
            key={item.id}
            className="absolute top-[-20px] animate-confetti"
            style={{
              left: `${item.left}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
            }}
          >
            {item.shape === "square" && (
              <div
                className="animate-spinSlow"
                style={{
                  width: `${item.size}px`,
                  height: `${item.size}px`,
                  backgroundColor: item.color,
                  borderRadius: "3px",
                }}
              />
            )}

            {item.shape === "spring" && (
              <div
                className="animate-spinSlow"
                style={{
                  width: "4px",
                  height: `${item.size * 2}px`,
                  backgroundColor: item.color,
                  borderRadius: "999px",
                  transform: "rotate(25deg)",
                }}
              />
            )}
          </div>
        ))}

        {/* Card */}
        <div className="relative bg-white rounded-[28px] shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-[95%] sm:max-w-md text-center overflow-hidden animate-fadeIn">

          <button
            onClick={() => navigate("/")}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </button>

          {/* Success Icon */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-green-500 flex items-center justify-center animate-pop">
                <Check className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-green-600 animate-drawCheck" />
              </div>

              <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 blur-2xl animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 leading-tight">
            Registration Successful
          </h1>

          <p className="text-sm sm:text-base text-gray-600 mb-2">
            Your account has been created successfully.
          </p>

          <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">
            You can now login to your dashboard.
          </p>

          <button
            onClick={handleLoginRedirect}
            className="w-full bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base font-semibold py-3 rounded-2xl transition duration-300 shadow-lg"
          >
            Go to Login
          </button>

        </div>
      </section>

      <style>
        {`
          @keyframes pop {
            0% { transform: scale(0); opacity: 0; }
            70% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes drawCheck {
            0% { opacity: 0; transform: scale(0.5) rotate(-20deg); }
            100% { opacity: 1; transform: scale(1) rotate(0deg); }
          }

          @keyframes confettiFall {
            0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
          }

          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .animate-pop { animation: pop 0.6s ease-out forwards; }
          .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
          .animate-drawCheck { animation: drawCheck 0.5s ease-out 0.3s forwards; }
          .animate-confetti { animation-name: confettiFall; animation-timing-function: linear; animation-fill-mode: forwards; }
          .animate-spinSlow { animation: spinSlow 3s linear infinite; }
        `}
      </style>
    </>
  );
};

export default SuccessfulPage;
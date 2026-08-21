import React from "react";

const LoadingScreen = ({ text = "Loading..." }) => {

  const LOGO_URL =
    "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1774017217/SkillZonet_Logo_2_erxxta.png";


  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">


      {/* SkillZonet Logo Animation */}

     {/* SkillZonet Logo Animation */}

<div className="animate-[heartbeat_1.5s_ease-in-out_infinite]">
  <img
    src={LOGO_URL}
    alt="SkillZonet Logo"
    className="w-[90px] h-[90px] object-contain"
  />
</div>



      {/* Loading Text */}

      <p className="text-black text-sm animate-pulse">
        {text}
      </p>



      {/* Loading Dots */}

      <div className="flex gap-2">

        <span className="w-2.5 h-2.5 bg-black rounded-full animate-bounce"></span>

        <span className="w-2.5 h-2.5 bg-black rounded-full animate-bounce [animation-delay:500ms]"></span>

        <span className="w-2.5 h-2.5 bg-black rounded-full animate-bounce [animation-delay:600ms]"></span>

      </div>


    </div>
  );
};

export default LoadingScreen;
import React from "react";

const Ready = () => {
  return (
    <section className="w-full bg-black text-white flex flex-col items-center justify-center text-center px-4 py-16 md:py-20 lg:h-[316px]">
      
      <h3 className="text-[24px] sm:text-[28px] md:text-[36px] font-bold mb-4">
        Ready to Get Started?
      </h3>

      <p className="text-[14px] sm:text-[16px] md:text-[18px] text-gray-300 max-w-[800px] mb-8">
        Join thousands of satisfied customers and skilled professionals on SkillZonet
      </p>

      <div className="flex flex-col sm:flex-row gap-4 text-[14px] w-full sm:w-auto justify-center">
        <button className="bg-white text-black px-6 py-3 rounded-lg font-medium w-full sm:w-auto">
          Find an Artisan
        </button>

        <button className="border border-white px-6 py-3 rounded-lg font-medium w-full sm:w-auto">
          Become an Artisan
        </button>
      </div>

    </section>
  );
};

export default Ready;

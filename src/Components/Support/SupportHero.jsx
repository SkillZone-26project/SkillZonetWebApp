import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import {
  supportHeroCTAs,
  heroRightFeatures,
  heroImages
} from "../../data/supportData";


const SupportHero = () => {
const cards = supportHeroCTAs;
const rightTopImage = heroImages.main;
const rightPhoneImage = heroImages.phone;

// first 2 items (top stack)
const rightFeatures = heroRightFeatures.slice(0, 2);

// last item (bottom single)
const bottomFeature = heroRightFeatures[2];

  return (
    <section className="bg-white pt-[10px] pb-10">
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-12">

          {/* HEADER */}
          <div className="flex flex-col gap-6">

            <span className="text-xs font-semibold bg-black text-white px-4 py-2 rounded-full w-fit">
              SOURCE OF FEEDBACKS
            </span>

            <div className="flex flex-col gap-3">
              <h1 className="text-[24px] md:text-[40px] leading-[48px] font-semibold tracking-[-0.5px] text-black">
                We’re Here to Help
              </h1>

              <p className="text-base text-gray-500 leading-6 max-w-[420px]">
                Find answers to your question and get the support you need.
              </p>
            </div>

            {/* SEARCH */}
            <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full text-sm text-gray-600 placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          {/* CARDS */}
          <div className="flex flex-col gap-6">
            {cards.map((item, i) => (
             <Link
             key={item.id}
            to={item.href}
            className="flex items-start gap-4 p-6 rounded-2xl bg-[#F6F6F9] shadow-sm hover:bg-[#EFEFF4] transition hover:-translate-y-1 hover:shadow-md duration-300"
            >
                {/* ICON */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${item.bgColor}`}
                >
                  <img src={item.icon} className="w-5 h-5" alt="" />
                </div>

                {/* TEXT */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold leading-5 text-black">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-5 max-w-[360px]">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-8">

          {/* TOP IMAGE */}
          <img
            src={rightTopImage}
            className="w-full h-[304px] object-cover rounded-2xl"
            alt=""
          />

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_160px] gap-6 items-start mt-8">

            {/* LEFT STACK */}
            <div className="flex flex-col gap-8">
              {rightFeatures.map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${item.bgColor}`}
                  >
                    <img src={item.icon} className="w-5 h-5" alt="" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-base font-semibold leading-5">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-400 leading-4 max-w-[200px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

           {/* PHONE */}
      <div className="h-[160px] w-full sm:w-[160px]">
        <img
          src={rightPhoneImage}
          className="w-full h-full object-cover rounded-xl"
          alt=""
       />
      </div>
          </div>

          {/* BOTTOM */}
          <div className="flex gap-4 items-start">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${bottomFeature.bgColor}`}
            >
              <img src={bottomFeature.icon} className="w-5 h-5" alt="" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-semibold leading-5">
                {bottomFeature.title}
              </h4>
              <p className="text-sm text-gray-400 leading-4 max-w-[320px]">
                {bottomFeature.desc}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SupportHero;
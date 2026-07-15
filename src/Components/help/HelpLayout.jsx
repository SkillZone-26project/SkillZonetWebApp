import { ChevronRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import SupportContacts from "../Support/SupportContacts";


const HelpLayout = ({ data }) => {
  const { hero, sections } = data;

  return (
    <>
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <Nav />

 {/* HERO */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[40%_30%_30%] gap-8 items-center border-b-2 border-gray-200 py-12 px-4 md:px-6 lg:px-12">

  {/* LEFT */}
  <div className="space-y-6 md:col-span-2 lg:col-span-1 lg:pt-24 text-center lg:text-left">

    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
      {hero.title}
    </h1>

    <p className="text-gray-500 leading-7 max-w-[320px] mx-auto lg:mx-0">
      {hero.desc}
    </p>

  </div>

  {/* MAIN IMAGE */}
  <div className="bg-[#F5F5F5] border border-gray-200 p-4 rounded-sm w-full max-w-[390px]">

  <div className="aspect-[390/360]">
    <img
      src={hero.images.main}
      alt="main image"
      className="w-full h-full object-cover rounded-[5px]"
    />
  </div>

</div>

  {/* SIDE IMAGE */}
  <div className="bg-[#F5F5F5] border border-gray-200 p-4 rounded-sm w-full max-w-[390px] lg:mt-32">

  <div className="aspect-[390/360]">
    <img
      src={hero.images.side}
      alt="main image"
      className="w-full h-full object-cover rounded-[5px]"
    />
  </div>

</div>
</div>

        {/* DIVIDER */}
       <div className="h-3 bg-black rounded-[5px] mb-5 mt-2" />

       {/* CARDS */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

         {sections.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            className="bg-[#F6F6F9] rounded-2xl p-6 flex items-start justify-between hover:shadow-md transition"
          >

            <div className="flex gap-4">

              {/* ICON */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.bgColor}`}>
                <img
                  src={item.icon}
                  alt=""
                  className="w-5 h-5"
                />
              </div>

              {/* TEXT */}
              <div>
                <h3 className="font-semibold text-base">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1 max-w-[260px]">
                  {item.desc}
                </p>
              </div>

            </div>

            <ChevronRight className="text-gray-400 w-5 h-5 shrink-0 mt-6" />

          </Link>
        ))}

      </div>
    

    </section>
    {/* CONTACT */}
    <SupportContacts />
 {/* FOOTER SECTION */}
<section className="bg-white py-6 border-t border-gray-100">
  <div className="max-w-[1200px] mx-auto px-4 flex flex-col items-center text-center md:flex-row md:justify-between md:items-center md:text-left gap-6">

    {/* LOGO */}
    <div className="flex justify-center md:justify-start">
      <img
        src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1774017217/SkillZonet_Logo_2_erxxta.png"
        alt="SkillZonet Logo"
        className="w-12"
      />
    </div>

    {/* COPYRIGHT */}
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-gray-400 text-xs md:text-sm">
      <p>© 2026</p>

      <p>All Rights Reserved</p>

      <a href="#" className="hover:text-black transition">
        Privacy Policy
      </a>
    </div>

    {/* SOCIALS */}
    <div className="flex items-center justify-center gap-5 text-gray-900">
      <Twitter size={18} />
      <Facebook size={18} />
      <Instagram size={18} />
      <Linkedin size={18} />
    </div>

  </div>
</section>
    </>
    
  );
};

export default HelpLayout;
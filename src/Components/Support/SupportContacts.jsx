import { Mail } from "lucide-react";
import { supportContacts } from "../../data/supportData";
const iconMap = {
  Mail: Mail,
};

const SupportContacts = () => {
  
  return (
    <div className="w-full">

      {/* DARK SECTION */}
<section className="bg-[#030213] text-white py-16">
  <div className="max-w-[1200px] mx-auto px-4 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">

    {/* LEFT */}
<div className="max-w-[552px] space-y-4 text-center md:text-center lg:text-left mx-auto lg:mx-0">
      <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
        {supportContacts.title}
      </h2>

      <p className="text-base text-gray-300 mx-auto lg:mx-0">
        {supportContacts.desc}
      </p>
    </div>

    {/* RIGHT */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-auto">
      
      {supportContacts.methods.map((item) => {
        const Icon = iconMap[item.iconName];

        return (
          <div
            key={item.id}
            className="flex items-start gap-4"
          >

            {/* ICON */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.bgColor}`}
            >
              {item.iconType === "lucide" && Icon && (
                <Icon className={`${item.iconColor} w-5 h-5`} />
              )}

              {item.iconType === "image" && (
                <img src={item.icon} className="w-5 h-5" alt="" />
              )}
            </div>

            {/* TEXT */}
            <div className="space-y-1">
              <p className="text-base font-semibold leading-5">
                {item.title}
              </p>

              <p className="text-sm text-gray-300 leading-6">
                {item.desc}
              </p>
            </div>

          </div>
        );
      })}

    </div>

  </div>
</section>

      

    </div>
  );
};

export default SupportContacts;



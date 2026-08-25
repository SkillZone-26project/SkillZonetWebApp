import { powerfulFeatures } from "../../data/featuresData";

const PowerfulFeatures = () => {
  

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      
      {/* HEADER */}
      <div className="text-center mx-auto mb-12 space-y-4">
        <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
          Powerful Features to Find and Hire Trusted Artisans
        </h2>
        <p className="text-base text-gray-500 leading-6">
          SkillZonet offers a suite of robust features designed to make finding and hiring skilled artisans easy and efficient
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* 1. Map through the powerfulFeatures  */}

        {powerfulFeatures.map((item) => (
          // 2. identify the keys and style
          <div key={item.id} className="flex flex-col gap-4">

            {/* IMAGE */}
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden">
              <img
                src={item.img}
                className="w-full h-full object-cover"
                alt={item.title}
              />
            </div>

            {/* CONTENT */}
            <div className="flex items-start gap-4">

              {/* ICON */}
              <div className={`${item.bgColor} w-12 h-12 rounded-lg flex items-center justify-center shrink-0`}>
                <img src={item.icon} className="w-5 h-5" alt="" />
              </div>

              {/* TEXT */}
              <div className="space-y-1">
                <h4 className="text-base font-semibold leading-5 text-black">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-500 leading-5">
                  {item.desc}
                </p>
              </div>

            </div>

          </div>
        ))}

      </div>
    </section>
  );
};

export default PowerfulFeatures;
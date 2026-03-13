import React from "react";
import { MdCircle } from "react-icons/md";
import { TbRosetteFilled } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { LuClock4 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const artisans = [
  {
    id: 1,
    name: "John Mensah",
    image:
      "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1772140352/Primitive.img_5_sqmsfy.png",
    skills: ["Plumbing", "Pipe Fitting"],
    premium: true,
    rating: 4.8,
    reviews: 127,
    distance: "2.3",
    status: "Available",
    price: "20,000",
  },
  {
    id: 2,
    name: "Ama Osei",
    image:
      "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771441211/Primitive.img_3_qcvm8i.png",
    skills: ["Electrical Work", "Wiring"],
    premium: true,
    rating: 4.9,
    reviews: 203,
    distance: "1.5",
    status: "Available",
    price: "25,000",
  },
  {
    id: 3,
    name: "Kwame Asante",
    image:
      "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1771352175/Primitive.img_2_fbdtsv.png",
    skills: ["Carpentry", "Furniture"],
    premium: false,
    rating: 4.7,
    reviews: 89,
    distance: "4.1",
    status: "Busy",
    price: "20,000",
  },
];

const AvailableArtisans = () => {
  const navigate = useNavigate();

  return (
    <main>
      {/* Header */}
      <header className="w-full flex items-center justify-between mt-[24px]">
        <p className="text-[18px] font-semibold text-textColor">
          Available Artisans
        </p>

        <p className="text-[14px] font-normal text-textGray">
          <span>{artisans.length}</span> results
        </p>
      </header>

      {/* Cards */}
      <section>
        {artisans.map((artisan) => (
          <div
            key={artisan.id}
            className="w-full border rounded-[14px] mt-[16px] p-[16px]"
          >
            <div className="flex flex-col sm:flex-row gap-[16px]">
              
              {/* Image */}
              <div className="relative flex justify-center sm:block">
                <img
                  src={artisan.image}
                  alt={artisan.name}
                  className="w-[80px] h-[80px] rounded-[40px]"
                />

                {artisan.status === "Available" && (
                  <MdCircle className="absolute bottom-0 right-[10px] text-[#00C950] text-[18px]" />
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col sm:flex-row justify-between w-full gap-[16px]">
                <div>

                  {/* Name */}
                  <div className="flex items-center gap-[5px] text-[18px] font-semibold">
                    <p className="text-textColor">{artisan.name}</p>
                    <TbRosetteFilled className="text-[#2B7FFF] text-[18px]" />
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-[5px] mt-[15px]">
                    {artisan.skills.map((skill, index) => (
                      <button
                        key={index}
                        className="text-textColor text-[12px] font-medium rounded-[8px] py-[3px] bg-[#ECEEF2] px-[8.5px]"
                      >
                        {skill}
                      </button>
                    ))}

                    {artisan.premium && (
                      <button className="text-white text-[12px] font-medium rounded-[8px] py-[3px] bg-[#FE9A00] px-[8.5px]">
                        Premium
                      </button>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-[5px] mt-[8px]">
                    <FaStar className="text-[#FDC700] text-[18px]" />
                    <p>
                      {artisan.rating}{" "}
                      <span className="text-textGray">
                        ({artisan.reviews})
                      </span>
                    </p>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-[20px] mt-[8px] text-textGray">
                    <div className="flex items-center gap-[5px]">
                      <GrLocation />
                      <p>{artisan.distance}km away</p>
                    </div>

                    <div className="flex items-center gap-[5px]">
                      <LuClock4 />
                      <p>{artisan.status}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-[8px] font-semibold">
                    ₦{artisan.price}
                  </div>

                </div>

                {/* Button */}
                <div className="flex sm:items-end">
                  <button
                    onClick={() =>
                      navigate(`/artisan-profile/${artisan.id}`)
                    }
                    className="bg-black text-white text-[14px] px-[12px] py-[8px] rounded-[8px] w-full sm:w-auto"
                  >
                    View Profile
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default AvailableArtisans;
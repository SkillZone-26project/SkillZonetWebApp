import React from "react";
import { MdCircle } from "react-icons/md";
import { TbRosetteFilled } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { LuClock4 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const fallbackArtisans = [
  {
    id: 1,
    name: "John Mensah",
    image:
      "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1772140352/Primitive.img_5_sqmsfy.png",

    skill: "Plumbing",

    subSkills: [
      "Pipe Fitting",
      "Leak Repair",
      "Drainage",
      "Water Heater",
      "Bathroom Repair",
    ],

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

    skill: "Electrical Work",

    subSkills: [
      "House Wiring",
      "Generator Repair",
      "Socket Installation",
      "Lighting",
      "Panel Installation",
    ],

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

    skill: "Carpentry",

    subSkills: [
      "Furniture",
      "Wardrobe",
      "Doors",
      "Kitchen Cabinets",
      "Roofing",
    ],

    premium: false,
    rating: 4.7,
    reviews: 89,
    distance: "4.1",
    status: "Busy",
    price: "20,000",
  },
];

const AvailableArtisans = ({
  artisans = [],
  searched = false,
  totalResults = 0,
}) => {
  const navigate = useNavigate();

 const displayArtisans =
  searched
    ? artisans
    : fallbackArtisans;

  return (
    <main>

      {/* Header */}
      <header className="w-full flex items-center justify-between mt-[24px]">

        <p className="text-[18px] font-semibold text-textColor">
          Available Artisans
        </p>

        <p className="text-[14px] font-normal text-textGray">
          <span>
  {searched ? totalResults : displayArtisans.length}
</span>{" "}
results
        </p>

      </header>

      {/* Cards */}

      <section>
      

        {displayArtisans.map((artisan) => (

          <div
            key={artisan._id || artisan.id}
            className="w-full border rounded-[14px] mt-[16px] p-[16px]"
          >

            <div className="flex flex-col sm:flex-row gap-[16px]">

              {/* Image */}

              <div className="relative flex justify-center sm:block">

                <img
  src={
    artisan.profilePic ||
    artisan.profileImage ||
    artisan.image ||
    "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1783535675/307ce493-b254-4b2d-8ba4-d12c080d6651_bq5o6e.jpg"
  }
  alt={artisan.fullName || artisan.name}
  className="w-[80px] h-[80px] rounded-[40px] object-cover"
/>

                {(artisan.status || "Available") === "Available" && (
                  <MdCircle className="absolute bottom-0 right-[10px] text-[#00C950] text-[18px]" />
                )}

              </div>

              {/* Details */}

              <div className="flex flex-col sm:flex-row justify-between w-full gap-[16px]">

                <div>

                  {/* Name */}

                  <div className="flex items-center gap-[5px] text-[18px] font-semibold">

                    <p className="text-textColor">
                      {artisan.fullName || artisan.name}
                    </p>

                    <TbRosetteFilled className="text-[#2B7FFF] text-[18px]" />

                  </div>

                  {/* Main Skill */}

                  <div className="mt-[15px]">

                    <button
                      className="bg-[#D8EBFF] text-[#1565C0] text-[12px] font-semibold rounded-[8px] py-[4px] px-[10px]"
                    >
                      {
  artisan.skillsAndSubSkills?.[0]?.skillName ||
  artisan.skill?.name ||
  artisan.skill ||
  "General Service"
}
                    </button>

                  </div>

                  {/* Services */}

                  <div className="flex flex-wrap gap-[5px] mt-[8px]">

                    {(
  artisan.skillsAndSubSkills ||
  artisan.subSkills ||
  artisan.skills ||
  []
).map((service, index) => (
  <button
    key={index}
    className="text-textColor text-[12px] font-medium rounded-[8px] py-[3px] bg-[#ECEEF2] px-[8.5px]"
  >
    {service.subSkillName ||
     service.name ||
     service}
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

                     {artisan.averageRating || artisan.rating || 0}

                      <span className="text-textGray">
                      

({artisan.ratingCount || artisan.reviews || 0})
                      </span>

                    </p>

                  </div>

                  {/* Location */}

                  <div className="flex items-center gap-[20px] mt-[8px] text-textGray">

                    <div className="flex items-center gap-[5px]">

                      <GrLocation />

                      <p>
                        {
  artisan.distanceInKm
    ? Number(artisan.distanceInKm).toFixed(1)
    : artisan.distance
    ? Number(artisan.distance).toFixed(1)
    : "0.0"
}
km away
                      </p>

                    </div>

                    <div className="flex items-center gap-[5px]">

                      <LuClock4 />

                      <p>
                        {artisan.status || "Available"}
                      </p>

                    </div>

                  </div>

                  {/* Price */}

                  {/* <div className="mt-[8px] font-semibold">

                    ₦
                    {artisan.price ||
                      artisan.hourlyRate ||
                      "N/A"}

                  </div> */}

                </div>

                {/* Button */}

                <div className="flex sm:items-end">

                  <button
                    onClick={() =>
                      navigate(
                        `/artisan-profile/${artisan._id || artisan.id}`
                      )
                    }
                    className="bg-black text-white text-[14px] px-[12px] py-[8px] rounded-[8px] w-full sm:w-auto"
                  >
                    View Profile
                  </button>

                </div>

              </div>

            </div>

          </div>

          ))
      }

      </section>

    </main>
  );
};

export default AvailableArtisans;
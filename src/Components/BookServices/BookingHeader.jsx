import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BookingHeader = ({ artisan }) => {
  const navigate = useNavigate();

  // Get the first sub-skill from the artisan returned by the backend
  const selectedSubSkill = artisan?.skills?.[0]?.subSkill;

  const subSkillId =
    selectedSubSkill?.id ||
    selectedSubSkill?._id ||
    selectedSubSkill?.subSkillId ||
    "";

  const subSkillName = selectedSubSkill?.name || "";

  // Main skill
  const mainSkill =
    selectedSubSkill?.skill?.name ||
    artisan?.skill?.name ||
    artisan?.skill ||
    artisan?.skillsAndSubSkills?.[0]?.skillName ||
    "Artisan";

  console.log("Booking Header Artisan:", artisan);
  console.log("Sub Skill ID:", subSkillId);
  console.log("Sub Skill Name:", subSkillName);

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 p-6 border-b">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        >
          <ArrowLeft size={22} />
        </button>

        <h1 className="text-2xl font-semibold">
          Book Service
        </h1>
      </div>

      {/* Artisan Card */}
      <div className="p-6">
        <div className="flex items-center gap-4 border rounded-xl p-4">

          {/* Artisan Image */}
          <img
            src={
              artisan?.profilePic ||
              artisan?.profileImage ||
              artisan?.image ||
              "https://res.cloudinary.com/dqtyrjpeh/image/upload/v1783535675/307ce493-b254-4b2d-8ba4-d12c080d6651_bq5o6e.jpg"
            }
            alt={
              artisan?.fullName ||
              artisan?.name ||
              "Artisan"
            }
            className="w-14 h-14 rounded-full object-cover"
          />

          {/* Artisan Details */}
          <div>
            <h2 className="font-semibold">
              {artisan?.fullName ||
                artisan?.name ||
                "John Mensah"}
            </h2>

            <p className="text-sm text-gray-500">
              {mainSkill}
            </p>

            {subSkillName && (
              <p className="text-xs text-gray-400 mt-1">
                {subSkillName}
              </p>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default BookingHeader;
import { ArrowLeft, ArrowRight, Briefcase } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProfessionalDetails() {
  const navigate = useNavigate();
  const { formValues, setFormValues } = useOutletContext();

  const [skillsList, setSkillsList] = useState([]);
  const [subSkillsList, setSubSkillsList] = useState([]);

  // ✅ Dropdown state
  const [showSubSkillDropdown, setShowSubSkillDropdown] =
    useState(false);

  // ✅ Selected subskills
  const [selectedSubSkills, setSelectedSubSkills] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: formValues,
    mode: "onChange",
  });

  const selectedSkill = watch("skillId");

  // ✅ FETCH SKILLS
  useEffect(() => {
    axios
      .get(
        "https://skillzonet-backend-auth-v1.onrender.com/api/skills/get-all"
      )
      .then((res) => {
        setSkillsList(res.data.skills || []);
      })
      .catch((err) => {
        console.log("SKILLS ERROR:", err);
        setSkillsList([]);
      });
  }, []);

  // ✅ FETCH SUBSKILLS
  useEffect(() => {
    if (!selectedSkill) return;

    axios
      .get(
        "https://skillzonet-backend-auth-v1.onrender.com/api/subSkills/get-all"
      )
      .then((res) => {
        const allSubSkills = res.data.subSkills || [];

        // ✅ FILTER USING skillId
        const filtered = allSubSkills.filter(
          (item) => item.skillId === selectedSkill
        );

        setSubSkillsList(filtered);

        // ✅ RESET WHEN SKILL CHANGES
        setSelectedSubSkills([]);
        setValue("subSkills", []);
        setValue("subSkillsDisplay", "");
      })
      .catch((err) => {
        console.log("SUBSKILLS ERROR:", err);
        setSubSkillsList([]);
      });
  }, [selectedSkill, setValue]);

  // ✅ HANDLE SINGLE CHECKBOX
  const handleSubSkillChange = (sub) => {
    let updated = [];

    const alreadyExists = selectedSubSkills.find(
      (item) => item.id === sub.id
    );

    if (alreadyExists) {
      // remove
      updated = selectedSubSkills.filter(
        (item) => item.id !== sub.id
      );
    } else {
      // add
      updated = [...selectedSubSkills, sub];
    }

    setSelectedSubSkills(updated);

    // ✅ STORE IDS FOR BACKEND
    setValue(
      "subSkills",
      updated.map((item) => item.id),
      { shouldValidate: true }
    );

    // ✅ DISPLAY NAMES
    setValue(
      "subSkillsDisplay",
      updated.map((item) => item.name).join(", "),
      { shouldValidate: true }
    );

    // ✅ CLOSE DROPDOWN
    setShowSubSkillDropdown(false);
  };

  // ✅ HANDLE SELECT ALL
  const handleSelectAll = () => {

    // UNSELECT ALL
    if (
      selectedSubSkills.length === subSkillsList.length
    ) {
      setSelectedSubSkills([]);

      setValue("subSkills", [], {
        shouldValidate: true,
      });

      setValue("subSkillsDisplay", "", {
        shouldValidate: true,
      });

      return;
    }

    // SELECT ALL
    setSelectedSubSkills(subSkillsList);

    setValue(
      "subSkills",
      subSkillsList.map((item) => item.id),
      { shouldValidate: true }
    );

    setValue(
      "subSkillsDisplay",
      subSkillsList.map((item) => item.name).join(", "),
      { shouldValidate: true }
    );

    // CLOSE DROPDOWN
    setShowSubSkillDropdown(false);
  };

  // ✅ SUBMIT
  const onSubmit = (data) => {

    // ✅ FORMAT FOR BACKEND
    const formattedSkills = (data.subSkills || []).map(
      (id) => ({
        subSkillId: id,
      })
    );

    setFormValues((prev) => ({
      ...prev,

      businessName: data.businessName,

      // ✅ NUMBER
      yearsExperience: Number(
        data.yearsExperience
      ),

      // ✅ BACKEND FORMAT
      skills: formattedSkills,
    }));

    navigate("/artisan-onboarding/locationSearch");
  };

  return (
    <div>

      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="bg-bgSaved p-3 rounded-full">
          <Briefcase className="text-saved w-6 h-6" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-textColor font-semibold text-[24px] text-center">
        Professional Details
      </h2>

      <p className="text-textGray mb-8 text-center">
        Tell us about your expertise
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="space-y-4">

          {/* Business Name */}
          <div>
            <label className="text-sm font-medium">
              Business Name (Optional)
            </label>

            <input
              {...register("businessName")}
              placeholder="Mensah Plumbing Services"
              className="w-full h-[36px] bg-bgGray rounded-[8px] px-[12px]"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="text-sm font-medium">
              Skills
              <span className="text-red-500">*</span>
            </label>

            <select
              {...register("skillId", {
                required: "Skill is required",
              })}
              className="w-full h-[36px] bg-bgGray rounded-[8px] px-[12px]"
            >
              <option value="">
                Select Skill
              </option>

              {Array.isArray(skillsList) &&
                skillsList.map((skill) => (
                  <option
                    key={skill.id}
                    value={skill.id}
                  >
                    {skill.name}
                  </option>
                ))}
            </select>

            {errors.skillId && (
              <p className="text-red-500 text-xs">
                {errors.skillId.message}
              </p>
            )}
          </div>

          {/* SUBSKILLS */}
          <div>

            <label className="text-sm font-medium">
              Sub-Skills
              <span className="text-red-500">*</span>
            </label>

            {/* Dropdown Header */}
            <div
              onClick={() =>
                setShowSubSkillDropdown(
                  !showSubSkillDropdown
                )
              }
              className="w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] flex items-center justify-between cursor-pointer"
            >
              <p className="text-sm text-gray-500">
                Select All Subskills You Can Offer
              </p>

              <ArrowRight
                size={16}
                className={`transition-transform ${
                  showSubSkillDropdown
                    ? "rotate-90"
                    : ""
                }`}
              />
            </div>

            {/* Dropdown List */}
            {showSubSkillDropdown && (
              <div className="max-h-[120px] overflow-y-auto border rounded p-2 mt-1 bg-white">

                {/* SELECT ALL */}
                <label className="flex items-center gap-2 text-sm py-1 border-b mb-1 pb-2 font-medium">

                  <input
                    type="checkbox"
                    checked={
                      subSkillsList.length > 0 &&
                      selectedSubSkills.length ===
                        subSkillsList.length
                    }
                    onChange={handleSelectAll}
                  />

                  All
                </label>

                {/* SUBSKILLS */}
                {subSkillsList.map((sub) => (
                  <label
                    key={sub.id}
                    className="flex items-center gap-2 text-sm py-1"
                  >
                    <input
                      type="checkbox"
                      checked={
                        !!selectedSubSkills.find(
                          (item) =>
                            item.id === sub.id
                        )
                      }
                      onChange={() =>
                        handleSubSkillChange(sub)
                      }
                    />

                    {sub.name}
                  </label>
                ))}
              </div>
            )}

            {/* DISPLAY */}
            <input
              {...register("subSkillsDisplay", {
                required:
                  "Select at least one sub-skill",
              })}
              readOnly
              placeholder="Selected sub-skills"
              className="w-full mt-2 h-[36px] bg-bgGray rounded-[8px] px-[12px]"
            />

            {/* HIDDEN VALUES */}
            <input
              type="hidden"
              {...register("subSkills", {
                required: true,
              })}
            />

            {errors.subSkillsDisplay && (
              <p className="text-red-500 text-xs">
                {errors.subSkillsDisplay.message}
              </p>
            )}
          </div>

          {/* Years */}
          <div>

            <label className="text-sm font-medium">
              Years of Experience
              <span className="text-red-500">*</span>
            </label>

            <select
              {...register("yearsExperience", {
                required:
                  "Years of experience is required",
              })}
              className="w-full h-[36px] bg-bgGray rounded-[8px] px-[12px]"
            >
              <option value="">
                Select experience level
              </option>

              <option value="1">
                1-2 Years
              </option>

              <option value="3">
                3-5 Years
              </option>

              <option value="5">
                5+ Years
              </option>
            </select>

            {errors.yearsExperience && (
              <p className="text-red-500 text-xs">
                {errors.yearsExperience.message}
              </p>
            )}
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-8">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-[297px] h-[36px] bg-white border rounded-[8px] flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-[297px] h-[36px] rounded-[8px] flex items-center justify-center gap-2 bg-black text-white ${
              !isValid &&
              "cursor-not-allowed"
            }`}
          >
            Continue
            <ArrowRight size={16} />
          </button>

        </div>

      </form>
    </div>
  );
}

export default ProfessionalDetails;
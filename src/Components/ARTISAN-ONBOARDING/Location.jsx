import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function Location() {
  const navigate = useNavigate();
  const { formValues, setFormValues } = useOutletContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: formValues,
    mode: "onChange",
  });

  // 🔥 Location states
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [sessionToken, setSessionToken] = useState(null);

  // 🔥 Generate session token when typing starts
  useEffect(() => {
    if (query.length === 1) {
      setSessionToken(uuidv4());
    }
  }, [query]);

  // 🔥 Debounced search
  useEffect(() => {
    if (query.length < 3) return;

    const delay = setTimeout(async () => {
      try {
        const res = await axios.post(
          "https://skillzonet-backend-auth-v1.onrender.com/api/location/search-location",
          {
            input: query,
            sessionToken,
          }
        );

        setSuggestions(res.data.suggestions || []);
      } catch (err) {
        console.log(err);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query, sessionToken]);

  // 🔥 Handle selection
  const handleSelect = async (placeId) => {
    try {
      const res = await axios.post(
        "https://skillzonet-backend-auth-v1.onrender.com/api/location/search-location",
        {
          placeId,
          sessionToken,
        }
      );

      const data = res.data;

      // Autofill form
      setValue("state", data.state);
      setValue("cityArea", data.city);
      setValue("streetAddress", data.formattedAddress);

      // Save globally
      setFormValues((prev) => ({
        ...prev,
        state: data.state,
        cityArea: data.city,
        streetAddress: data.formattedAddress,
        lat: data.lat,
        lng: data.lng,
      }));

      // Update UI
      setQuery(data.formattedAddress);
      setSuggestions([]);
      setSessionToken(null);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (data) => {
    setFormValues((prev) => ({ ...prev, ...data }));
    navigate("/artisan-onboarding/bank-details");
  };

  return (
    <div>
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-10 h-10 md:w-[56px] md:h-[56px] mx-auto rounded-full bg-bgCompleted flex items-center justify-center mb-4">
          <MapPin className="text-completed w-[21.33px] h-[26.66px]" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-textColor font-semibold text-[24px] text-center">
        Location & Coverage
      </h2>
      <p className="text-textGray mb-8 text-center">
        Where do you provide services?
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">

          {/* 🔥 NEW: Location Search */}
          <div>
            <label className="text-sm font-medium">
              Search Location <span className="text-red-500">*</span>
            </label>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your location (e.g., Lekki)"
              className="w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm outline-none"
            />

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="bg-white border rounded mt-1 shadow max-h-[150px] overflow-y-auto">
                {suggestions.map((item) => (
                  <p
                    key={item.placeId}
                    onClick={() => handleSelect(item.placeId)}
                    className="p-2 cursor-pointer hover:bg-gray-100 text-sm"
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* State */}
          <div>
            <label className="text-sm font-medium">
              State <span className="text-red-500">*</span>
            </label>
            <select
              {...register("state", {
                required: "State is required",
              })}
              className={`w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm ${
                errors.state ? "ring-1 ring-red-500" : ""
              }`}
            >
              <option value="">Select your state</option>
              <option value="Abuja">Abuja</option>
              <option value="Lagos">Lagos</option>
              <option value="Rivers">Rivers</option>
            </select>

            {errors.state && (
              <p className="text-red-500 text-xs mt-1">
                {errors.state.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="text-sm font-medium">
              City/Area <span className="text-red-500">*</span>
            </label>
            <input
              {...register("cityArea", {
                required: "City/Area is required",
              })}
              className={`w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm ${
                errors.cityArea ? "ring-1 ring-red-500" : ""
              }`}
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              {...register("streetAddress", {
                required: "Street Address is required",
              })}
              className="w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm"
            />
          </div>

          {/* Coverage */}
          <div>
            <label className="text-sm font-medium">
              Service Coverage Radius <span className="text-red-500">*</span>
            </label>
            <select
              {...register("serviceCoverageRadius", {
                required: "Service Coverage Radius is required",
              })}
              className={`w-full h-[36px] bg-bgGray rounded-[8px] px-[12px] text-sm ${
                errors.serviceCoverageRadius ? "ring-1 ring-red-500" : ""
              }`}
            >
              <option value="">How far can you travel?</option>
              <option value="5km">Up to 5km</option>
              <option value="10km">Up to 10km</option>
              <option value="20km">Up to 20km</option>
              <option value="statewide">Anywhere in the state</option>
            </select>
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
                !isValid && "cursor-not-allowed"
              }`}
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Location;
import React, {
  useState,
  useEffect,
} from "react";

import { SlLocationPin } from "react-icons/sl";
import { MdOutlineMyLocation } from "react-icons/md";
 import { IoMdArrowRoundForward } from "react-icons/io";

import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import {
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import { useForm } from "react-hook-form";

import axios from "axios";

const LocationSearch = () => {

  const navigate = useNavigate();

  const { 
    formValues,
    setFormValues,
  } = useOutletContext();

  // ✅ FORM
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm({
    defaultValues: formValues,
    mode: "onChange",
  });

  // ✅ STATES
  const [suggestions, setSuggestions] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [selectedLocation, setSelectedLocation] =
    useState(null);

  // ✅ WATCH INPUT
  const locationInput = watch("location");

  // ✅ SESSION TOKEN
  const [sessionToken] = useState(
    crypto.randomUUID()
  );

  // ✅ SEARCH LOCATION
  useEffect(() => {

    // minimum 3 chars
    if (
      !locationInput ||
      locationInput.length < 3
    ) {
      setSuggestions([]);
      return;
    }

    // ✅ stop search after selecting
    if (
      locationInput ===
      selectedLocation?.address
    ) {
      return;
    }

    // debounce
    const debounce = setTimeout(async () => {

      try {

        setLoading(true);

        const res = await axios.post(
          "https://skillzonet-backend-auth-v1.onrender.com/api/location/search-location",
          {
            input: locationInput,
            sessionToken,
          }
        );

        setSuggestions(
          res.data.suggestions || []
        );

      } catch (err) {

        console.log(
          "LOCATION SEARCH ERROR:",
          err
        );

        setSuggestions([]);

      } finally {

        setLoading(false);

      }

    }, 400);

    return () => clearTimeout(debounce);

  }, [
    locationInput,
    sessionToken,
    selectedLocation,
  ]);

  // ✅ HANDLE SELECT LOCATION
  const handleSelectLocation = async (
    suggestion
  ) => {

    try {

      const res = await axios.post(
        "https://skillzonet-backend-auth-v1.onrender.com/api/location/search-location",
        {
          placeId: suggestion.placeId,
          sessionToken,
        }
      );

      const locationData = {

        address:
          res.data.formattedAddress || "",

        city:
          res.data.city || "",

        state:
          res.data.state || "",

        latitude:
          res.data.lat || "",

        longitude:
          res.data.lng || "",
      };

      // ✅ SAVE FULL DATA
      setSelectedLocation(locationData);

      // ✅ UPDATE INPUT
      setValue(
        "location",
        res.data.formattedAddress,
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );

      // ✅ CLOSE DROPDOWN
      setSuggestions([]);

      // ✅ STOP LOADING
      setLoading(false);

    } catch (err) {

      console.log(
        "PLACE DETAILS ERROR:",
        err
      );

    }

  };

  // ✅ SUBMIT
  const onSubmit = () => {

    if (!selectedLocation) return;

    // ✅ SAVE TO GLOBAL FORM
    setFormValues((prev) => ({
      ...prev,

      address:
        selectedLocation.address,

      city:
        selectedLocation.city,

      state:
        selectedLocation.state,

      latitude:
        selectedLocation.latitude,

      longitude:
        selectedLocation.longitude,
    }));

    navigate(
      "/artisan-onboarding/location"
    );

  };

  return (
    <>
      <section>

        <div className="flex items-center gap-[20px] justify-center">

          <img
            src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1776284079/devicon_google_ojgeln.png"
            alt=""
          />

          <p className="font-semibold text-[24px]">
            Location
          </p>

        </div>

        <div className="flex justify-center">

          <p className="text-[16px] text-textGray">
            Enter Your Address, Street or Nearest Bustop
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
        >

          <div className="parent mt-[38px] flex relative">

            {/* LEFT */}
            <div className="flex flex-col gap-[2px] sm:flex-row sm:gap-[10px] items-center border-2 border-black w-full max-w-[244px] px-[8px] py-[10px] rounded-tl-[8px] rounded-bl-[8px]">

              <SlLocationPin className="text-[14px] sm:text-[24px]" />

              <p className="text-[12px] sm:text-[14px] font-bold">
                Enter Address or Street
              </p>

             
<IoMdArrowRoundForward className="text-[14px] sm:text-[18px]"/>

            </div>

            {/* INPUT */}
            <div className="items-center border-2 border-black w-full max-w-[337px] px-[8px] py-[10px] relative">

              <input
                type="text"
                placeholder="Lekki Phase 1"
                className="outline-none w-full flex items-center"
                {...register("location", {
                  required: true,
                })}
              />

              {/* DROPDOWN */}
              {suggestions.length > 0 &&
                locationInput !==
                  selectedLocation?.address && (

                <div className="absolute top-[45px] left-0 w-full bg-white border rounded shadow-lg z-50 max-h-[200px] overflow-y-auto">

                  {suggestions.map(
                    (item) => (

                      <div
                        key={item.placeId}
                        onClick={() =>
                          handleSelectLocation(
                            item
                          )
                        }
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {item.name}
                      </div>

                    )
                  )}

                </div>

              )}

              {/* LOADING */}
              {loading && (
                <p className="text-xs mt-1 text-gray-500">
                  Searching...
                </p>
              )}

            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-center border-2 border-black w-full max-w-[36px] px-[8px] py-[12px] rounded-tr-[8px] rounded-br-[8px]">

              <MdOutlineMyLocation />

            </div>

          </div>

          {/* BUTTONS */}
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
              disabled={
                !isValid ||
                !selectedLocation
              }
              className={`w-[297px] h-[36px] rounded-[8px] flex items-center justify-center gap-2 bg-black text-white ${
                (!isValid ||
                  !selectedLocation) &&
                "cursor-not-allowed"
              }`}
            >
              Continue
              <ArrowRight size={16} />
            </button>

          </div>

        </form>

      </section>
    </>
  );
};

export default LocationSearch;
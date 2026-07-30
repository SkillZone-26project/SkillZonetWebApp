import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import BookingHeader from "./BookingHeader";
import ServiceDetails from "./ServiceDetails";
import LocationSection from "./LocationSection";
import BookingTerms from "./BookingTerms";
import ConfirmBooking from "./ConfirmBooking";

const BookService = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const artisan = location.state?.artisan;

  const [accepted, setAccepted] = useState(false);

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [booking, setBooking] = useState({
    title: "",
    description: "",
    amount: "",
    subSkillId: "",
    state: "",
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    scheduledAt: "",
  });

  // ==========================================
  // GET SUB-SKILL ID FROM ARTISAN
  // ==========================================

  useEffect(() => {
    if (!artisan) return;

    const subSkillId =
      artisan?.skills?.[0]?.subSkill?.id ||
      artisan?.skills?.[0]?.subSkill?._id ||
      artisan?.skills?.[0]?.subSkill?.subSkillId ||
      "";

    console.log("Sub Skill ID:", subSkillId);

    setBooking((prev) => ({
      ...prev,
      subSkillId,
    }));
  }, [artisan]);

  // ==========================================
  // HANDLE BOOKING
  // ==========================================

  const handleBooking = async () => {

    // Prevent another click while request is processing
    if (loading) {
      return;
    }

    // Prevent submitting again after successful submission
    if (hasSubmitted) {
      setErrorMessage(
        "You have already submitted this booking request."
      );

      return;
    }

    try {

      setLoading(true);

      setSuccessMessage("");

      setErrorMessage("");

      const token = localStorage.getItem("token");

      // ==========================================
      // CHECK REQUIRED DATA
      // ==========================================

      if (!artisan?.id && !artisan?._id) {
        setErrorMessage(
          "Artisan information is missing."
        );

        setLoading(false);

        return;
      }

      if (!booking.subSkillId) {
        setErrorMessage(
          "Sub-skill information is missing. Please go back and select the artisan again."
        );

        setLoading(false);

        return;
      }

      if (!booking.title.trim()) {
        setErrorMessage(
          "Please enter a request title."
        );

        setLoading(false);

        return;
      }

      if (!booking.description.trim()) {
        setErrorMessage(
          "Please enter a job description."
        );

        setLoading(false);

        return;
      }

      if (!booking.amount) {
        setErrorMessage(
          "Please enter your budget."
        );

        setLoading(false);

        return;
      }

      if (!booking.address.trim()) {
        setErrorMessage(
          "Please enter your address."
        );

        setLoading(false);

        return;
      }

      // ==========================================
      // PAYLOAD
      // ==========================================

      const payload = {
        targetArtisanId:
          artisan?.id || artisan?._id,

        subSkillId:
          booking.subSkillId,

        amount:
          Number(booking.amount),

        title:
          booking.title,

        description:
          booking.description,

        state:
          booking.state,

        city:
          booking.city,

        address:
          booking.address,

        latitude:
          booking.latitude
            ? Number(booking.latitude)
            : null,

        longitude:
          booking.longitude
            ? Number(booking.longitude)
            : null,

        scheduledAt:
          booking.scheduledAt || null,
      };

      console.log(
        "Sending booking data:",
        payload
      );

      // ==========================================
      // SEND REQUEST
      // ==========================================

      const response = await axios.post(
        "https://skillzonet-backend-auth-v1.onrender.com/api/job/book",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "Booking response:",
        response.data
      );

      // ==========================================
      // SUCCESS
      // ==========================================

      if (
        response.data?.success === true ||
        response.status === 200 ||
        response.status === 201
      ) {

        console.log(
          "BOOKING SUCCESSFUL"
        );

        // IMPORTANT:
        // Prevent another submission
        setHasSubmitted(true);

        setLoading(false);

        setSuccessMessage(
          response.data?.message ||
          "Booking successfully submitted!"
        );

        setErrorMessage("");

        // Navigate after 2 seconds
        setTimeout(() => {

          console.log(
            "Navigating to user dashboard..."
          );

          navigate("/user");

        }, 2000);

        return;
      }

      // ==========================================
      // UNSUCCESSFUL RESPONSE
      // ==========================================

      setLoading(false);

      setErrorMessage(
        response.data?.message ||
        "Booking could not be completed."
      );

    } catch (error) {

      // ==========================================
      // ERROR
      // ==========================================

      setLoading(false);

      console.log(
        "Booking error:",
        error.response?.data ||
        error.message
      );

      const backendMessage =
        error.response?.data?.message;

      /*
      If backend tells us that the user already
      submitted the request, show that message.
      */

      if (
        backendMessage
          ?.toLowerCase()
          .includes("already")
      ) {

        setHasSubmitted(true);

        setErrorMessage(
          backendMessage
        );

        return;
      }

      /*
      Other backend errors
      */

      setErrorMessage(
        backendMessage ||
        "Unable to complete booking. Please try again."
      );
    }
  };

  // ==========================================
  // ARTISAN NOT FOUND
  // ==========================================

  if (!artisan) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <p className="text-gray-500 mb-4">
            Artisan information could not be loaded.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="bg-black text-white px-5 py-2 rounded-lg"
          >
            Go Back
          </button>

        </div>

      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4">

      <div className="max-w-3xl mx-auto bg-white rounded-xl border shadow-sm">

        {/* HEADER */}

        <BookingHeader
          artisan={artisan}
        />

        {/* SERVICE DETAILS */}

        <ServiceDetails
          booking={booking}
          setBooking={setBooking}
        />

        {/* LOCATION */}

        <LocationSection
          booking={booking}
          setBooking={setBooking}
        />

        {/* TERMS */}

        <BookingTerms
          accepted={accepted}
          setAccepted={setAccepted}
        />

        {/* =====================================
            ERROR MESSAGE
        ===================================== */}

        {errorMessage && (
          <div className="px-6 pb-4">

            <div className="bg-red-50 border border-red-300 text-red-700 rounded-lg p-4 text-center font-medium">

              {errorMessage}

            </div>

          </div>
        )}

        {/* =====================================
            SUCCESS MESSAGE
        ===================================== */}

        {successMessage && (
          <div className="px-6 pb-4">

            <div className="bg-green-50 border border-green-300 text-green-700 rounded-lg p-4 text-center">

              <p className="font-semibold text-lg">
                Booking Successful!
              </p>

              <p className="text-sm mt-1">
                {successMessage}
              </p>

              <p className="text-xs mt-2 text-green-600">
                Redirecting you to your dashboard...
              </p>

            </div>

          </div>
        )}

        {/* CONFIRM BUTTON */}

        <ConfirmBooking
          accepted={accepted}
          loading={loading}
          hasSubmitted={hasSubmitted}
          onSubmit={handleBooking}
        />

      </div>

    </div>
  );
};

export default BookService;


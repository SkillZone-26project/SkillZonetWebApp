import { useState } from "react";
import BookingHeader from "./BookingHeader";
import ServiceDetails from "./ServiceDetails";
import LocationSection from "./LocationSection";
import BookingTerms from "./BookingTerms";
import ConfirmBooking from "./ConfirmBooking";

import {artisan} from "../../data/bookingData";

const BookService = () => {
  const [accepted, setAccepted] = useState(false);
  const [booking, setBooking] = useState({
  service: "",
  subSkillId: "",
  title: "",
  description: "",
  amount: "",
  address: "",
});


const handleBooking = () => {
    console.log("Booking submitted");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl border shadow-sm">

        <BookingHeader />

        <ServiceDetails
          booking={booking}
          setBooking={setBooking}
        />

        <LocationSection
          booking={booking}
          setBooking={setBooking}
        />

        <BookingTerms
          accepted={accepted}
          setAccepted={setAccepted}
        />

      <ConfirmBooking
       accepted={accepted}
       onSubmit={handleBooking}
      />

      </div>
    </div>
  );
};

export default BookService;

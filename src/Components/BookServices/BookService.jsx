
import { useState } from "react";
import BookingHeader from "./BookingHeader";
import ServiceDetails from "./ServiceDetails";
import LocationSection from "./LocationSection";
import PriceBreakdown from "./PriceBreakdown";
import BookingTerms from "./BookingTerms";
import ConfirmBooking from "./ConfirmBooking";

import {
  artisan,
  bookingTerms,
  subServices,
} from "../../data/bookingData";

const BookService = () => {
  const [accepted, setAccepted] = useState(false);
  const [booking, setBooking] = useState({
  service: artisan.profession, 
  subService: "",
  title: "",
  description: "",
  date: "",
  time: "",
  address: "",
  city: "",
  state: "",
  landmark: "",
  amount: "",
  latitude: "",
  longitude: "",
});

const platformFeePercentage = 10;

const labourCost = Number(booking.amount) || 0;

const platformFee = Math.round(
  labourCost * platformFeePercentage / 100
);

const total = labourCost + platformFee;

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

       <PriceBreakdown
        amount={booking.amount}
        platformFee={platformFee}
        total={total}
      />

      <BookingTerms
        accepted={accepted}
        setAccepted={setAccepted}
      />

     <ConfirmBooking
       accepted={accepted}
       total={total}
       onSubmit={handleBooking}
    />

      </div>
    </div>
  );
};

export default BookService;

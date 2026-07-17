import { useState } from "react";
import { bookingTerms } from "../../data/bookingData";

const BookingTerms = ({ accepted, setAccepted }) => {
  return (
    <section className="border-t px-6 py-6">
        <div className="bg-barbg rounded-[10px] items-center p-6">
            <p className="text-basics text-textColor font-[500] leading-[20px]">Booking Terms:</p>
            <ul className="list-disc list-inside text-sm text-textGray leading-6 mt-2">
                {bookingTerms.map((term, index) => (
                 <li key={index}>{term}</li>
            ))}
            </ul>
        </div>

      <div className="flex items-start gap-3">

        <input
          id="terms"
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-1 h-4 w-4 accent-black cursor-pointer"
        />

        <label
          htmlFor="terms"
          className="text-sm leading-6 text-gray-600"
        >
          I have read and agree to the{" "}
          <span className="font-medium text-black">
            Terms & Conditions
          </span>{" "}
          
        </label>

      </div>

    </section>
  );
};

export default BookingTerms;
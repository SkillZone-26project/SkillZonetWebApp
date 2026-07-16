import { ArrowLeft } from "lucide-react";
import { artisan } from "../../data/bookingData";

const BookingHeader = () => {
  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 p-6 border-b">
        <ArrowLeft
          size={22}
          className="cursor-pointer"
        />

        <h1 className="text-2xl font-semibold">
          Book Service
        </h1>
      </div>

      {/* Artisan Card */}
      <div className="p-6">
        <div className="flex items-center gap-4 border rounded-xl p-4">
          <img
            src={artisan.image}
            alt={artisan.name}
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>
            <h2 className="font-semibold">
              {artisan.name}
            </h2>

            <p className="text-sm text-gray-500">
              {artisan.profession}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingHeader;
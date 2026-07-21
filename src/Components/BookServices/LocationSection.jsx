import { MapPin } from "lucide-react";

const LocationSection = ({
  booking,
  setBooking,
}) => {
  return (
    <section className="px-6 py-6 border-t">
  <h2 className="text-lg font-semibold mb-5">
    Location
  </h2>

  <div className="relative">
    <MapPin
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
    />

    <input
      type="text"
      value={booking.address}
      onChange={(e) =>
        setBooking({
          ...booking,
          address: e.target.value,
        })
      }
      placeholder="Enter your location / address"
      className="w-full h-12 rounded-lg border border-gray-200 bg-[#F8F8FA] pl-10 pr-4 outline-none focus:ring-2 focus:ring-black"
    />
  </div>
</section>
  );
};

export default LocationSection;
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

      {/* Address */}

      <div className="mb-5">
        <label className="block text-sm font-medium mb-2">
          Service Address
        </label>

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
            placeholder="Enter your address"
            className="w-full h-12 rounded-lg border border-gray-200 bg-[#F8F8FA] pl-10 pr-4 outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* City */}

      <div className="mb-5">
        <label className="block text-sm font-medium mb-2">
          City
        </label>

        <input
          type="text"
          value={booking.city}
          onChange={(e) =>
            setBooking({
              ...booking,
              city: e.target.value,
            })
          }
          className="w-full h-12 rounded-lg border border-gray-200 bg-[#F8F8FA] px-4 outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* State */}

      <div className="mb-5">
        <label className="block text-sm font-medium mb-2">
          State
        </label>

        <input
          type="text"
          value={booking.state}
          onChange={(e) =>
            setBooking({
              ...booking,
              state: e.target.value,
            })
          }
          className="w-full h-12 rounded-lg border border-gray-200 bg-[#F8F8FA] px-4 outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Landmark */}

      <div>
        <label className="block text-sm font-medium mb-2">
          Additional Location Info (Optional)
        </label>

        <input
          type="text"
          value={booking.landmark}
          onChange={(e) =>
            setBooking({
              ...booking,
              landmark: e.target.value,
            })
          }
          placeholder="Apartment number, landmark, etc."
          className="w-full h-12 rounded-lg border border-gray-200 bg-[#F8F8FA] px-4 outline-none focus:ring-2 focus:ring-black"
        />
      </div>
    </section>
  );
};

export default LocationSection;
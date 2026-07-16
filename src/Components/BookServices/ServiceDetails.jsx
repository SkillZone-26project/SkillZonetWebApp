import { subServices } from "../../data/bookingData";

const ServiceDetails = ({
  booking,
  setBooking,
}) => {
  return (
    <section className="px-6 py-6 border-t">

      {/* Heading */}
      <h2 className="text-lg font-semibold mb-5">
        Service Details
      </h2>

      {/* Service Type */}
      <div className="mb-5">

        <label className="block text-sm font-medium mb-2">
          Service Type
        </label>

        <input
          type="text"
          value={booking.service}
          disabled
          className="w-full h-12 rounded-lg border border-gray-200 bg-[#F8F8FA] px-4 outline-none text-gray-500 cursor-not-allowed"
        />

      </div>

      {/* Sub Service */}
      <div className="mb-5">

        <label className="block text-sm font-medium mb-2">
          Sub Service
        </label>

        <select
          value={booking.subService}
          onChange={(e) =>
            setBooking({
              ...booking,
              subService: e.target.value,
            })
          }
          className="w-full h-12 rounded-lg border border-gray-200 bg-[#F8F8FA] px-4 outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">
            Select sub service
          </option>

          {subServices[booking.service]?.map((service) => (
            <option
              key={service.id}
              value={service.id}
            >
              {service.name}
            </option>
          ))}
        </select>

      </div>

      {/* Description */}
      <div className="mb-5">

        <label className="block text-sm font-medium mb-2">
          Job Description
        </label>

        <textarea
          value={booking.description}
          onChange={(e) =>
            setBooking({
              ...booking,
              description: e.target.value,
            })
          }
          rows={3}
          placeholder="Describe the work you need done..."
          className="w-full rounded-lg border border-gray-200 bg-[#F8F8FA] p-4 resize-none outline-none focus:ring-2 focus:ring-black"
        />

      </div>

      {/* Budget */}
      <div>

        <label className="block text-sm font-medium mb-2">
          Budget (₦)
        </label>

        <input
          type="number"
          value={booking.amount}
          onChange={(e) =>
            setBooking({
              ...booking,
              amount: e.target.value,
            })
          }
          placeholder="Enter your budget"
          className="w-full h-12 rounded-lg border border-gray-200 bg-[#F8F8FA] px-4 outline-none focus:ring-2 focus:ring-black"
        />

      </div>

    </section>
  );
};

export default ServiceDetails;
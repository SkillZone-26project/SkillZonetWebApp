import { subServices } from "../../data/bookingData";

const ServiceDetails = ({
  booking,
  setBooking,
}) => {
  return (
    <section className="px-6 py-6 border-t">

      <h2 className="text-lg font-semibold mb-5">
        Service Request
      </h2>

      {/* Service */}
      <div className="mb-5">

        <label className="block text-sm font-medium mb-2">
          Service
        </label>

        <input
          type="text"
          value={booking.service}
          onChange={(e) =>
            setBooking({
              ...booking,
              service: e.target.value,
            })
          }
          placeholder="Search for a service"
          className="w-full h-12 rounded-lg border border-gray-200 bg-[#F8F8FA] px-4 outline-none focus:ring-2 focus:ring-black"
        />

        {/* Suggestions dropdown will be added here later */}

      </div>

            {/* Title */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-2">
          Title
        </label>

        <input
          type="text"
          value={booking.title}
          onChange={(e) =>
            setBooking({
              ...booking,
              title: e.target.value,
            })
          }
          placeholder="Enter a short title"
          className="w-full h-12 rounded-lg border border-gray-200 bg-[#F8F8FA] px-4 outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Job Description */}
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
          rows={4}
          placeholder="Not more than 100 words or 500 characters"
          className="w-full rounded-lg border border-gray-200 bg-[#F8F8FA] p-4 resize-none outline-none focus:ring-2 focus:ring-black"
        />

      </div>

      {/* Labour Cost */}
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
          placeholder="Enter labour cost"
          className="w-full h-12 rounded-lg border border-gray-200 bg-[#F8F8FA] px-4 outline-none focus:ring-2 focus:ring-black"
        />

      </div>

    </section>
  );
};

export default ServiceDetails;
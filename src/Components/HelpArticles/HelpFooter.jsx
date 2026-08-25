import { Link } from "react-router-dom";

const HelpFooter = () => {
  return (
    <section className="border-gray-200 flex justify-between">

      {/* Helpful */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div>
          <p className="font-semibold text-sm">
            Was this article helpful?
          </p>

        </div>

        <div className="flex gap-4">

          <button className="text-sm flex items-center gap-2 px-5 py-3 rounded-md hover:bg-green-50 transition">
            Yes
          </button>

          <button className="text-sm flex items-center gap-2 px-5 py-3 rounded-md hover:bg-red-50 transition">
            No
          </button>

        </div>
         {/* Contact */}

      <div className="mt-1 rounded-2xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div>

          <p>
            Still have a question?
          </p>

        </div>

        <Link
          to="/support"
          className="
            text-[#045AFF]
          "
        >
          Contact Us
        </Link>

      </div>

      </div>

    </section>
  );
};

export default HelpFooter;
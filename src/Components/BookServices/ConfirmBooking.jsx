import {CreditCard} from "lucide-react";
const ConfirmBooking = ({
  accepted,
  total,
  onSubmit,
}) => {
  return (
    <section className="border-t px-6 py-6">

      <button
        type="button"
        disabled={!accepted}
        onClick={onSubmit}
        className={`
          w-full
          h-14
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          font-semibold
          text-base
          transition-all
          duration-300

          ${
            accepted
              ? "bg-black text-white hover:bg-neutral-800 active:scale-[0.98]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }
        `}
      >
        <CreditCard size={18}/>
        Confirm & Pay ₦{total.toLocaleString()}
      </button>

    </section>
  );
};

export default ConfirmBooking;
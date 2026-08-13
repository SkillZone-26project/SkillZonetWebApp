import { Clock3, X, Info } from "lucide-react";

const PayInInstallmentsModal = ({
  isOpen,
  onClose,
  onContinue,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

      <div className="w-full max-w-[440px] bg-white rounded-lg shadow-xl">

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-5">

          <div className="flex items-start gap-3">

            {/* Clock Icon */}
            <div className="w-10 h-10 rounded-full bg-[#FFF7E6] flex items-center justify-center shrink-0">
              <Clock3
                size={25}
                strokeWidth={2}
                className="text-[#F59E0B]"
              />
            </div>

            <div>
              <h2 className="text-[20px] font-bold text-[#111827] leading-6">
                Pay in Installments
              </h2>

              <p className="text-xs text-[#111827] mt-1">
                define how you will be paid in this project
              </p>
            </div>

          </div>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="text-[#F59E0B] hover:text-orange-600 transition"
          >
            <X size={30} strokeWidth={1.5} />
          </button>

        </div>

        {/* Notification */}
        <div className="mx-5 mt-7 rounded-md border border-[#F6D79B] bg-[#FFF9EC] p-5">

          <div className="flex items-start gap-4">

            <div className="w-9 h-9 rounded-full border-2 border-black bg-[#FFD83D] flex items-center justify-center shrink-0">
              <Info
                size={22}
                strokeWidth={2.5}
                className="text-black"
              />
            </div>

            <p className="text-[16px] font-semibold leading-6 text-[#8A4B16]">
              The client will be notified of your selected
              installment payment plan before making any
              payment.
            </p>

          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end px-5 py-5">

          <button
            type="button"
            onClick={onContinue}
            className="h-11 px-7 rounded-lg bg-[#F59E0B] text-white text-sm font-semibold hover:bg-[#D97706] transition"
          >
            Continue
          </button>

        </div>

      </div>

    </div>
  );
};

export default PayInInstallmentsModal;
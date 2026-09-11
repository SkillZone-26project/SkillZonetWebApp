import { useState } from "react";
import { CircleX, X } from "lucide-react";

const RejectAgreementModal = ({ isOpen, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!reason.trim()) return;

    onConfirm(reason);
    setReason("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-[520px] bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-5">
          <div className="flex items-center gap-3">
            <CircleX size={36} strokeWidth={2} className="text-[#E62E3B]" />

            <h2 className="text-[20px] font-bold text-[#111827]">
              Cancel Agreement
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-gray-700 transition"
          >
            <X size={30} strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        <div className="px-7 pb-8 pt-8">
          {/* Description */}
          <div className="space-y-1 mb-7">
            <p className="text-[16px] text-textGray">
              You are about to cancel this agreement.
            </p>

            <p className="text-[16px] text-textGray">
              Please tell the client why you are cancelling
            </p>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-[20px] font-semibold text-black mb-7">
              Reason for cancelling{" "}
              <span className="text-red-500">(required)</span>
            </label>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide a reason for rejecting or cancelling this agreement"
              className="w-full h-[77px] resize-none rounded-md border border-[#F0D69A] bg-[#FFFDF7] px-3 py-3 text-[16px] text-gray-700 outline-none placeholder:text-textGray focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
            />
          </div>

          {/* Confirm */}
          <div className="flex justify-end mt-8">
            <button
              type="button"
              disabled={!reason.trim()}
              onClick={handleConfirm}
              className="h-11 px-4 rounded-md bg-[#E62E3B] text-white text-[14px] font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Confirm Cancellation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectAgreementModal;

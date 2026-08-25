import { useState } from "react";
import {
  CircleArrowLeft,
  X,
  Info,
} from "lucide-react";

const SendBackNotesModal = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!notes.trim()) return;

    onSubmit(notes);
    setNotes("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">

      {/* Modal */}
      <div className="w-full max-w-[520px] rounded-md bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">

          <div className="flex items-center gap-3">

            <CircleArrowLeft
              size={22}
              strokeWidth={2}
              className="text-[#D97706]"
            />

            <h2 className="text-[16px] font-semibold text-[#111827]">
              Send Back with Notes
            </h2>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={20} />
          </button>

        </div>

        {/* Content */}
        <div className="px-5 py-4">

          {/* Description */}
          <div className="mb-4">

            <p className="text-[12px] leading-[16px] text-[#797786]">
              Send this agreement back to the artisan with notes.
            </p>

            <p className="text-[12px] leading-[16px] text-[#797786]">
              The agreement will remain active and can be updated and
              resubmitted for your approval.
            </p>

          </div>

          <div className="border-t border-gray-300 mb-5" />

          {/* Revision Notes */}
          <div>

            <label className="block text-[13px] font-semibold text-[#111827] mb-3">
              Revision Notes{" "}
              <span className="text-red-500 font-normal">
                (required)
              </span>
            </label>

            <textarea
              value={notes}
              maxLength={500}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe the changes you'd like the artisan to make..."
              className="w-full h-[90px] resize-none rounded-sm border border-[#F1D9A8]  bg-[#FFFDF7] px-3 py-3 text-[12px] text-gray-700 outline-none placeholder:text-gray-400 focus:border-[#D97706] focus:ring-1 focus:ring-[#D97706]"/>

            <div className="flex justify-end mt-1">
              <span className="text-[10px] text-gray-400">
                {notes.length}/500
              </span>
            </div>

          </div>

          {/* Notice */}
          <div className="mt-4 flex items-start gap-2 rounded-md bg-[#FFF9ED] border border-[#F8E7BF] px-3 py-3">

            <Info
              size={14}
              className="text-[#D97706] mt-0.5 shrink-0"
            />

            <p className="text-[10px] leading-[14px] text-[#92400E]">
              The artisan will be notified of your notes and asked
              to revise the agreement.
            </p>

          </div>

          {/* Button */}
          <div className="flex justify-end mt-5">

            <button
              type="button"
              disabled={!notes.trim()}
              onClick={handleSubmit}
              className="h-9 px-5 rounded-md bg-[#F59E0B] text-white text-[11px] font-semibold hover:bg-[#D97706] disabled:opacity-50 disabled:cursor-not-allowed transition">
              Send Back
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SendBackNotesModal;
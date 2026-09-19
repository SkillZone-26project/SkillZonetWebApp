import { Clock3, Send, X, CheckCircle, AlertTriangle } from "lucide-react";

const ContractActions = ({
  status,
  isPartPaymentSelected,
  onSubmit,
  onCancel,
  onResubmit,
  onRequestSignoff,
  onPartPayment,
  onOpenDispute,
}) => {
  // Shared robust button styling for mobile touch-targets (h-12)
  const baseBtnStyle =
    "w-full h-12 px-2 rounded-md font-bold text-xs flex items-center justify-center transition-all active:scale-[0.98] select-none tracking-wide";

  switch (status) {
    case "DRAFT":
      return (
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            type="button"
            onClick={onCancel}
            className={`${baseBtnStyle} border border-red-200 text-red-600 bg-red-50/20 hover:bg-red-50`}
          >
            <span className="flex items-center gap-2">
              <X size={15} className="shrink-0" />
              <span>Cancel Contract</span>
            </span>
          </button>

          <button
            type="button"
            onClick={onSubmit}
            className={`${baseBtnStyle} bg-[#111827] text-white hover:bg-black shadow-sm`}
          >
            <span className="flex items-center gap-2">
              <Send size={15} className="shrink-0" />
              <span>Submit Contract</span>
            </span>
          </button>
        </div>
      );

    case "SUBMITTED_TO_CLIENT":
      return (
        <div className="w-full rounded-xl bg-gray-50 border border-gray-200 py-4 px-4 text-xs text-gray-500 font-semibold tracking-wide">
          <div className="flex items-center justify-center gap-2">
            <Clock3
              size={15}
              className="text-gray-400 shrink-0 animate-pulse"
            />
            <span>Waiting for client review</span>
          </div>
        </div>
      );

    case "REVISION_REQUESTED":
      return (
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            type="button"
            onClick={onCancel}
            className={`${baseBtnStyle} border border-red-200 text-red-600 bg-red-50/20 hover:bg-red-50`}
          >
            <span className="flex items-center gap-2">
              <X size={15} className="shrink-0" />
              <span>Cancel Contract</span>
            </span>
          </button>

          <button
            type="button"
            onClick={onResubmit}
            className={`${baseBtnStyle} bg-[#111827] text-white hover:bg-black shadow-sm`}
          >
            <span className="flex items-center gap-2">
              <Send size={15} className="shrink-0" />
              <span>Resubmit to Client</span>
            </span>
          </button>
        </div>
      );

    case "AGREED_ESCROW_LOCKED":
      return (
        /* 
          MOBILE-FIRST SPACING FIX:
          Stacks into comfortable, spacious h-12 rows on mobile so nothing cuts off.
          Transforms into a beautiful, even inline sequence on tablet/desktop (sm:flex-row).
        */
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          {isPartPaymentSelected && (
            <button
              type="button"
              onClick={onPartPayment}
              className={`${baseBtnStyle} border border-[#E5A23A] text-[#B6701C] bg-[#FEF6D8]/30 hover:bg-[#FEF6D8]/60`}
            >
              <span className="flex items-center gap-2">
                <Clock3 size={15} className="shrink-0" />
                <span>Request Part Payment</span>
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={onRequestSignoff}
            className={`${baseBtnStyle} bg-[#111827] text-white hover:bg-black shadow-sm`}
          >
            <span className="flex items-center gap-2">
              <CheckCircle size={15} className="shrink-0" />
              <span>Request Sign-off</span>
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenDispute}
            className={`${baseBtnStyle} border border-red-200 text-red-600 bg-red-50/10 hover:bg-red-50`}
          >
            <span className="flex items-center gap-2">
              <AlertTriangle size={15} className="shrink-0" />
              <span>Open Dispute</span>
            </span>
          </button>
        </div>
      );

    /* ========================================================================= */
    /* FIXED: MATCHING DISPUTED LAYOUT BLOCK FOR ARTISAN VIEW SIDE CONTROLLERS   */
    /* ========================================================================= */
    case "DISPUTED":
      return (
        <div className="flex flex-col items-center gap-3 w-full">
          {/* Frozen Alert Banner */}
          <div className="w-full rounded-xl bg-red-50 border border-red-100 py-4 px-4 text-center text-xs font-bold text-red-600 tracking-wide">
            Contract is currently under dispute. Actions are temporarily frozen.
          </div>

          {/* FIXED: sm:w-auto sm:px-8 handles keeping button tight and beautifully centered */}
          <button
            type="button"
            onClick={onOpenDispute}
            className={`${baseBtnStyle} border border-red-200 text-red-600 bg-red-50/10 hover:bg-red-50 sm:w-auto sm:px-8`}
          >
            <span className="flex items-center gap-2">
              <AlertTriangle size={15} className="shrink-0" />
              <span>Open Dispute</span>
            </span>
          </button>
        </div>
      );

    case "ON_HOLD":
      return (
        <div className="w-full rounded-xl bg-gray-50 border border-gray-200 py-4 text-center text-xs font-semibold text-gray-500 tracking-wide">
          Contract is currently on hold.
        </div>
      );

    case "COMPLETED":
      return (
        <div className="w-full rounded-xl bg-green-50 border border-green-100 py-4 text-center text-xs font-bold text-green-700 tracking-wide">
          Contract completed. No actions available.
        </div>
      );

    case "CANCELLED":
      return (
        <div className="w-full rounded-xl bg-red-50 border border-red-100 py-4 text-center text-xs font-bold text-red-600 tracking-wide">
          Contract cancelled. No actions available.
        </div>
      );

    default:
      return (
        <div className="w-full rounded-xl bg-yellow-50 border border-yellow-100 py-4 text-center text-xs font-semibold text-yellow-700 tracking-wide">
          Unknown contract status.
        </div>
      );
  }
};

export default ContractActions;

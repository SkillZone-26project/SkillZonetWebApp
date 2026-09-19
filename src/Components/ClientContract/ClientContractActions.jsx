import { CheckCircle, AlertTriangle, Clock3 } from "lucide-react";

const ClientContractActions = ({
  status, // 👈 Added status prop to read live workflow state changes
  paymentPlan,
  onComplete,
  onInstallmentPayment,
  onOpenDispute,
}) => {
  const baseBtnStyle =
    "w-full h-12 px-2 rounded-md font-bold text-xs flex items-center justify-center transition-all active:scale-[0.98] select-none tracking-wide";

   // CASE 1: Handle the "DISPUTED" status block from the matrix table
  if (status === "DISPUTED") {
    return (
      <div className="flex flex-col items-center gap-3 w-full">
        {/* Frozen Alert Banner - Red theme styling matches action freeze protocol */}
        <div className="w-full rounded-xl bg-red-50 border border-red-100 py-4 px-4 text-center text-xs font-bold text-red-600 tracking-wide">
          Contract is currently under dispute. Actions are temporarily frozen.
        </div>

        {/* THE FIXED DISPUTE BUTTON 👇 */}
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
  }

  // CASE 2: Handle the "AGREED_ESCROW_LOCKED" status lifecycle actions
  if (status === "AGREED_ESCROW_LOCKED") {
    return (
      /* 
        MOBILE-FIRST FIX: Changed from grid to flex layout container. 
        When paymentPlan !== "INSTALLMENT", the remaining two buttons split the screen real estate
        perfectly (50/50 width) on desktop layout containers without looking awkward or uneven.
      */
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        {/* Installment Payment Button Action Block */}
        {paymentPlan === "INSTALLMENT" && (
          <button
            type="button"
            onClick={onInstallmentPayment}
            className={`${baseBtnStyle} border border-[#E5A23A] text-[#B6701C] bg-[#FEF6D8]/30 hover:bg-[#FEF6D8]/60`}
          >
            <span className="flex items-center gap-2">
              <Clock3 size={15} className="shrink-0" />
              <span>Pay Installment</span>
            </span>
          </button>
        )}

        {/* Complete Contract Primary Action Button Block */}
        <button
          type="button"
          onClick={onComplete}
          className={`${baseBtnStyle} bg-[#16A34A] text-white hover:bg-green-700 shadow-sm`}
        >
          <span className="flex items-center gap-2">
            <CheckCircle size={15} className="shrink-0" />
            <span>Complete & Review</span>
          </span>
        </button>

        {/* Neutral Escrow Open Dispute Safety Action Button Block */}
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
  }

  // DEFAULT FALLBACK: For terminal or unhandled states (ON_HOLD, COMPLETED, CANCELLED)
  return null;
};;

export default ClientContractActions;

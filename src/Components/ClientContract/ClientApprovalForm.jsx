import { useState } from "react";
import ClientContractActions from "./ClientContractActions";
import { TriangleAlert, Check, ExternalLink, X } from "lucide-react";
import RejectCancelModal from "./RejectCancelModal";
import SendBackNotesModal from "./SendBackNotesModal";

const ClientApprovalForm = ({
  status,
  paymentPlan,
  onApprove,
  onComplete,
  onInstallmentPayment,
  onOpenDispute,
}) => {
  const [instructions, setInstructions] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showSendBackModal, setShowSendBackModal] = useState(false);

  // Temporary site verification photos
  const sitePhotos = [
    "https://res.cloudinary.com/dipdvqnin/image/upload/v1786183226/fe9ec3f91c9b19f0687699eb270a13903d787920_o56el2.jpg",
    "https://res.cloudinary.com/dipdvqnin/image/upload/v1786183226/92e8c1a4df8a72e3f4a53699735f609202728d5a_gy97fu.jpg",
    "https://res.cloudinary.com/dipdvqnin/image/upload/v1786183225/6bb763f9a05cfca6e073f6b75ec3d390d5e5af20_r53raz.jpg",
  ];

  // Shared fluid buttons base template matching custom mobile-first specs
  const baseBtnStyle =
    "w-full h-12 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] select-none tracking-wide sm:flex-1";

  return (
    <section className="bg-white border border-gray-200 rounded-lg relative">
      {/* Header Info Panel Section */}
      <div className="p-5 sm:p-6 border-b border-gray-100">
        <h2 className="text-lg sm:text-xl font-bold text-[#070616] leading-tight">
          Bilateral Agreement Review Console
        </h2>
        <p className="text-xs sm:text-sm text-[#797786] mt-2 leading-relaxed">
          Review the terms compiled on-site by the artisan. You can approve the
          variation order to release work execution or return it back for
          pricing adjustment.
        </p>
      </div>
      <div className="p-5 sm:p-6 space-y-6 sm:space-y-8">
        {/* 1. Client Instructions Field Area */}
        <div>
          <label className="block text-xs sm:text-sm font-bold mb-2 text-[#070616]">
            Client Instructions (Optional)
          </label>
          <textarea
            rows={3}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter custom project specifications, safety demands, or property rules you want appended..."
            className="w-full text-xs rounded-xl border border-[#FACC15] bg-[#FFFDF4] p-4 outline-none resize-none placeholder:text-gray-400 focus:ring-1 focus:ring-[#FACC15]"
          />
        </div>

        {/* 2. Payment Selected Overview Component Card */}
        <div className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <img
              src="https://res.cloudinary.com/dipdvqnin/image/upload/v1786658817/Vector_2_bhywc7.png"
              alt="Payment Plan"
              className="w-5 h-5 object-contain"
            />
            <h3 className="text-xs sm:text-sm font-bold text-[#111827]">
              Payment Plan
            </h3>
          </div>

          <div className="rounded-lg bg-gray-50 border border-gray-100 p-3">
            <p className="text-xs sm:text-sm font-bold text-[#111827]">
              {paymentPlan === "INSTALLMENT"
                ? "Pay in Installments"
                : "Full Payment"}
            </p>

            <p className="text-[11px] sm:text-xs font-medium text-gray-500 mt-1">
              {paymentPlan === "INSTALLMENT"
                ? "The artisan selected an installment payment plan for this project."
                : "The artisan selected the full payment plan for this project."}
            </p>
          </div>
        </div>

        {/* 3. On-Site Physical Verification Photo Gallery Previews */}
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-[#070616]">
            On-site Work Preview
          </h3>
          <p className="text-xs text-[#797786] mt-1">
            Review photos of the on-site work before approval.
          </p>

          <div className="mt-3 flex flex-wrap gap-3">
            {sitePhotos.map((photo, index) => (
              <div
                key={index}
                className="w-[84px] h-[72px] sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shadow-sm"
              >
                <img
                  src={photo}
                  alt={`Verification preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 4. Cautionary Warning Escrow Bar Banner */}
        <div className="bg-[#FFFBEB] border border-amber-100/70 p-4 rounded-xl flex gap-3">
          <TriangleAlert size={22} className="text-[#FFCD0F] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#B45309]">
              Pending Client Payment
            </h4>
            <p className="text-[11px] sm:text-xs text-[#92400E] mt-1 leading-relaxed font-medium">
              By accepting this agreement, you agree to transfer the remaining
              project funds to the verified artisan account listed in the
              preview document.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. Unified Bottom Dynamic Action Handlers Layout Router                  */}
        {/* ========================================================================= */}

        {/* CONDITION A: DRAFT STATUS VIEW */}
        {status === "DRAFT" && (
          <div className="pt-4 border-t border-gray-100/80 w-full">
            <button
              type="button"
              onClick={() => setShowRejectModal(true)}
              className={`${baseBtnStyle} border border-red-200 text-[#E7000B] bg-red-50/20 hover:bg-red-50 sm:w-auto sm:px-6`}
            >
              <X size={15} className="shrink-0" />
              <span>Cancel Contract</span>
            </button>
          </div>
        )}

        {/* CONDITION B: REVISION REQUESTED STATUS VIEW */}
        {status === "REVISION_REQUESTED" && (
          <div className="pt-4 border-t border-gray-100/80 w-full">
            <button
              type="button"
              onClick={() => setShowRejectModal(true)}
              className={`${baseBtnStyle} border border-red-200 text-[#E7000B] bg-red-50/20 hover:bg-red-50 sm:w-auto sm:px-6`}
            >
              <X size={15} className="shrink-0" />
              <span>Cancel Contract</span>
            </button>
          </div>
        )}

        {/* CONDITION C: SUBMITTED TO CLIENT STATUS VIEW */}
        {status === "SUBMITTED_TO_CLIENT" && (
          <div className="pt-4 border-t border-gray-100/80 flex flex-col sm:flex-row gap-3 w-full">
            {/* Action 1: Send Back Variant */}
            <button
              type="button"
              onClick={() => setShowSendBackModal(true)}
              className={`${baseBtnStyle} border border-amber-200 text-[#B6701C] bg-amber-50/20 hover:bg-[#FEF6D8]/60`}
            >
              <ExternalLink size={15} className="shrink-0" />
              <span>Request Revision</span>
            </button>

            {/* Action 2: Reject Sequence Variant */}
            <button
              type="button"
              onClick={() => setShowRejectModal(true)}
              className={`${baseBtnStyle} border border-red-200 text-[#E7000B] bg-red-50/20 hover:bg-red-50`}
            >
              <X size={15} className="shrink-0" />
              <span>Cancel Contract</span>
            </button>

            {/* Action 3: Primary Approval Release Button */}
            <button
              type="button"
              onClick={onApprove}
              className={`${baseBtnStyle} bg-[#16A34A] text-white hover:bg-green-700 shadow-sm`}
            >
              <Check size={15} className="shrink-0" />
              <span>Accept Contract</span>
            </button>
          </div>
        )}

        {/* CONDITION D: AGREED ESCROW LOCKED & DISPUTED LIFE CYCLES STATUS VIEW */}
        {(status === "AGREED_ESCROW_LOCKED" || status === "DISPUTED") && (
          <div className="pt-4 border-t border-gray-100/80">
            <ClientContractActions
              status={status}
              paymentPlan={paymentPlan}
              onComplete={onComplete}
              onInstallmentPayment={onInstallmentPayment}
              onOpenDispute={onOpenDispute}
            />
          </div>
        )}
      </div>{" "}
      {/* <-- Closes space-y container wrapper */}
      {/* MODAL CANVASES OVERLAYS */}
      <SendBackNotesModal
        isOpen={showSendBackModal}
        onClose={() => setShowSendBackModal(false)}
        onSubmit={() => {
          setShowSendBackModal(false);
        }}
      />
      <RejectCancelModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={() => {
          setShowRejectModal(false);
        }}
      />
    </section>
  );
};

export default ClientApprovalForm;

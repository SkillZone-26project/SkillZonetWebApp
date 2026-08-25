import { useState } from "react";
import {
  TriangleAlert,
  Check,
  ExternalLink,
  X,
} from "lucide-react";
import RejectCancelModal from "./RejectCancelModal";
import SendBackNotesModal from "./SendBackNotesModal";


const ClientApprovalForm = () => {
  const [instructions, setInstructions] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showSendBackModal, setShowSendBackModal] = useState(false);

  // Temporary images (replace with backend data later)
  const sitePhotos = [
    "https://res.cloudinary.com/dipdvqnin/image/upload/v1786183226/fe9ec3f91c9b19f0687699eb270a13903d787920_o56el2.jpg",
    "https://res.cloudinary.com/dipdvqnin/image/upload/v1786183226/92e8c1a4df8a72e3f4a53699735f609202728d5a_gy97fu.jpg",
    "https://res.cloudinary.com/dipdvqnin/image/upload/v1786183225/6bb763f9a05cfca6e073f6b75ec3d390d5e5af20_r53raz.jpg",
  ];

  return (
    <section className="bg-white border border-gray-200 rounded-lg">

      {/* Header */}

      <div className="p-6">

        <div className="flex items-center gap-3">

          <div>

            <h2 className="text-xl font-bold text-[#070616]">
              Bilateral Agreement Review Console
            </h2>

            <p className="text-sm text-[#797786] mt-4">
              Review the terms compiled on-site by the artisan. You can
              approve the variation order to release work execution or
              return it back for pricing adjustment.
            </p>

          </div>

        </div>

      </div>

      <div className="p-6 space-y-8">

        {/* Instructions */}

        <div>

          <label className="block text-sm font-semibold mb-2 text[#070616]">
            Client Instructions (Optional)
          </label>

          <textarea
            rows={3}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter custom project specifications, safety demands, or property rules you want appended..."
            className="w-full rounded-md border border-[#FACC15] bg-[#FFFDF4] p-4 outline-none resize-none"
          />

        </div>
        {/* Payment Option */}

<div className="rounded-lg border border-gray-300 p-4">

  <div className="flex items-center gap-2 mb-3">

  <img
    src="https://res.cloudinary.com/dipdvqnin/image/upload/v1786658817/Vector_2_bhywc7.png"
    alt="Payment Option"
    className="w-5 h-5 object-contain"
  />

  <h3 className="font-semibold text-[#111827]">
    Payment Option
  </h3>

</div>

  <div className="rounded-lg bg-white shadow-[0_2px_10px_rgba(0,0,0,0.12)] p-3">

    <p className="font-semibold text-[#111827]">
      Full Payment
    </p>

    <p className="font-semibold text-[#111827] mt-2">
      This is to notify you that artisan selected full payment option
    </p>

  </div>

</div>

        {/* Site Preview */}

        <div>

          <h3 className="font-semibold text-[#070616]">
            On-site Work Preview
          </h3>

          <p className="text-sm text-[#797786] mt-1">
            Review photos of the on-site work before approval.
          </p>

          <div className="mt-4 flex gap-3">

            {sitePhotos.map((photo, index) => (

              <img
                key={index}
                src={photo}
                alt=""
                className="w-24 h-24 rounded-md object-cover"
              />

            ))}

          </div>

        </div>

        {/* Warning */}

        <div className="bg-[#FFFBEB] p-4 rounded-sm">

          <div className="flex gap-3">

            <TriangleAlert
              size={28}
              className="text-[#FFCD0F]"
            />

            <div>

              <h4 className="font-semibold text-[#B45309]">
                Pending Client Payment
              </h4>

              <p className="text-sm text-[#92400E] mt-2 leading-6">
                By accepting this agreement, you agree to transfer the
                remaining project funds to the verified artisan account
                listed in the preview document.
              </p>

            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">

          <button
            onClick={() => setShowSendBackModal(true)}
            className="h-11 rounded-md border border-[#DD2D35] text-[#B6701C] font-medium hover:bg-red-50 transition text-sm"
          >
            <div className="flex items-center justify-center gap-2">
              <ExternalLink size={20}/>
              Send Back With Notes
            </div>

          </button>

          <button
            onClick={() => setShowRejectModal(true)}
            className="h-11 rounded-md border border-[#DD2D35] text-[#E7000B] font-medium hover:bg-red-50 transition text-sm"
          >
            <div className="flex items-center justify-center gap-2">
              <X size={20}/>
              Reject & Cancel
            </div>

          </button>

          <button
            className="h-11 rounded-md bg-[#16A34A] text-white font-semibold hover:bg-green-700 transition text-sm"
          >
            <div className="flex items-center justify-center gap-2">

              <Check size={20} />

              Approve & Release

            </div>

          </button>

        </div>

      </div>
      <SendBackNotesModal
      isOpen={showSendBackModal}
      onClose={() => setShowSendBackModal(false)}
      onSubmit={() => {
      // API call later
      setShowSendBackModal(false);
      }}
    />

      <RejectCancelModal
      isOpen={showRejectModal}
      onClose={() => setShowRejectModal(false)}
      onConfirm={() => {
    // API call later
    setShowRejectModal(false);
    }}
  />

    </section>
  );
};

export default ClientApprovalForm;
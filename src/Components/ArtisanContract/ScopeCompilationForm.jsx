import { useState } from "react";
import {
  ShieldCheck,
  UploadCloud,
  TriangleAlert,
  Send,
  Clock3,
  Lock,
  LockKeyhole,
  CreditCard,
  X,
} from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";
import {contractInfo } from "../../data/contractData";
import PayInInstallmentsModal from "./PayInInstallmentsModal";
import RejectAgreementModal from "./RejectAgreementModal";
import MaterialsSection from "./MaterialsSection";


const ScopeCompilationForm = () => {
  const [scopeForm, setScopeForm] = useState({
  commencementDate: "",
  completionDate: "",

  materialsRequired: "no",

  procurementResponsibility: "",

  materials: [
    {
      description: "",
      quantity: 1,
      unitPrice: 0,
    },
  ],
});

  const { payment } = contractInfo;
  const [showInstallmentModal, setShowInstallmentModal] = useState(false);
  const [showArtisanRejectModal, setShowArtisanRejectModal] = useState(false);

  // Temporary images (replace with backend data later)
  const sitePhotos = [
    "https://res.cloudinary.com/dipdvqnin/image/upload/v1786183226/fe9ec3f91c9b19f0687699eb270a13903d787920_o56el2.jpg",
    "https://res.cloudinary.com/dipdvqnin/image/upload/v1786183226/92e8c1a4df8a72e3f4a53699735f609202728d5a_gy97fu.jpg",
    "https://res.cloudinary.com/dipdvqnin/image/upload/v1786183225/6bb763f9a05cfca6e073f6b75ec3d390d5e5af20_r53raz.jpg",
  ];

  return (
    <section className="bg-white border border-gray-200 rounded-lg">

      <div className="p-4 sm:p-5 md:p-6">

        <div className="flex items-center gap-3">

          <div className="w-10 h-12 rounded-md bg-[#000000] flex items-center justify-center">
  <img
    src="https://res.cloudinary.com/dipdvqnin/image/upload/v1786657618/Vector_1_fibwef.png"
    alt="Project scope"
    className="w-6 h-6 object-contain"
  />
</div>

          <div>

            <h2 className="text-lg sm:text-xl font-bold text-[#111827]">
              Project Scope & Validation
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Complete the details below and submit for client approval.
            </p>

          </div>

        </div>
        <div className="flex items-center gap-3 mt-5 sm:mt-6 flex-wrap">

  <p className="text-[13px] font-semibold text-[#111827]">
    Approval Status
  </p>

  <span
    className="inline-flex items-center gap-2 p-2 border border-[#C78A35]
      bg-[#FEF6D8] text-[#B6701C] text-[11px] font-semibold uppercase tracking-wide">
    <Clock3
      size={13}
      strokeWidth={2}
    />
    Pending Approval
  </span>

</div>

      </div>

      <div className="p-6 space-y-6">

        {/* Lock Status */}

<div className="bg-[#FFF7E6] px-3 py-2">

  <div className="flex justify-between items-center">

    <div className="flex items-start gap-2 ">
<div className="w-4 h-4 flex items-center justify-center shrink-0">
  <img
    src="https://res.cloudinary.com/dipdvqnin/image/upload/v1786658099/Group_427319060_ecrfrj.png"
    alt="Lock"
    className="w-4 h-4 object-contain"
  />
</div>


<div>
  <p className="text-sm font-semibold text-[#B6701C] uppercase">
      Lock Status: Secured
  </p>

  <p className="text-xs font-medium text-[#797786] mt-[2px]">
    <span className="font-semibold text-[#111827]">
        ₦{payment.labourCost.toLocaleString()}
    </span>{" "}
    has been locked in protected fund and will be
  <br />
   released upon successful completion.
  </p>

</div>

</div>

<div className="w-4 h-4 rounded-full bg-[#111111] flex items-center justify-center shrink-0">

  <FaCircleCheck size={20} strokeWidth={2.5} className="text-[#000000] bg-white rounded-full" />

</div>

</div>

</div>



        {/* Upload */}

<div>
    <label className="block text-sm font-semibold mb-2">
       Site Verification Photo
       <span className="text-gray-400 font-normal"> (Required) </span>
    </label>

          <label
            htmlFor="verification"
            className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
          >

            <UploadCloud
              size={42}
              className="text-[#111827] mb-3"
            />

            <p className="font-medium text-[#111827]">
              Click to upload or drag and drop
            </p>

            <p className="text-xs text-gray-500 mt-2 text-center px-6">
              Upload clear photos of the work site and existing
              conditions
              <br />
              (JPG, PNG up to 10MB each)
            </p>

            <input
              id="verification"
              type="file"
              className="hidden"
            />

          </label>

        </div>
        {/* On-site Work Preview */}

<div>

  <h3 className="text-sm font-semibold text-[#111827]">
    On-site Work Preview
  </h3>

  <p className="text-sm text-gray-500 mt-1">
    Uploaded on-site work photo
  </p>

  <div className="flex gap-3 mt-3 overflow-x-auto pb-1">

    {sitePhotos.map((photo, index) => (
      <img
        key={index}
        src={photo}
        alt={`On-site work ${index + 1}`}
        className="w-[90px] h-[75px] object-cover rounded-sm"
      />
    ))}

  </div>

</div>

{/* Client Note */}

<div className="rounded-lg border border-gray-300 p-3">

  <div className="flex items-start gap-2">

    <img
    src="https://res.cloudinary.com/dipdvqnin/image/upload/v1786658817/Vector_2_bhywc7.png"
    alt="Payment Option"
    className="w-5 h-5 object-contain"
  />

    <h3 className="min-w-0 text-sm font-semibold text-[#111827]">
      Rejected/ sent Back Note from client
    </h3>

  </div>

  <div className="mt-3 rounded-lg bg-white border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.10)] p-3">

    <p className="text-sm font-bold text-[#111827]">
      Client Note(June 29, 2026 09:14 AM)
    </p>

    <p className="text-sm font-semibold text-[#797786] mt-2 leading-5">
      Please include measurements of the installed frame and closer
      photos of the joint finishing. Also confirm the paint type used.
    </p>

  </div>

</div>
<button
            onClick={() => setShowArtisanRejectModal(true)}
            className="h-11 rounded-md border border-[#DD2D35] text-[#E7000B] font-medium hover:bg-red-50 transition text-sm"
          >
            <div className="px-2 flex items-center justify-center gap-2">
              <X size={20}/>
              Reject Agreement
            </div>

          </button>

{/* Payment Schedule */}

<div className="rounded-lg border border-gray-300 p-4">

  <h3 className="text-base font-semibold text-[#111827]">
    Payment Schedule
  </h3>

  <p className="text-sm text-[#797786] mt-2">
    Receive payment in installments as work progresses
  </p>

  <div className=" mt-5 w-full max-w-[572px] min-h-[72px] rounded-[8px] px-3 sm:px-4 py-[14px] bg-[#F5F5F5] shadow-[0_0_12px_0_#0000001A] flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">

    {/* Full Payment */}

    <button
      type="button"
      className="flex-1 h-11 px-2 py-3 rounded-lg border border-[#111827] 
      flex items-center justify-center gap-2
      text-sm font-semibold text-[#111827]
      hover:bg-gray-50 transition"
    >

      <CreditCard
        size={18}
        strokeWidth={2}
        className="text-[#111827]"
      />

      <span>
        Full Payment
      </span>

    </button>


    {/* Pay in Installments */}

    <button
      type="button"
      onClick={() => setShowInstallmentModal(true)}
      className="flex-1 h-11 px-2 py-3 rounded-lg border border-[#E5A23A]
      flex items-center justify-center gap-2
      text-sm font-semibold text-[#D18400]
      hover:bg-[#FFF8EC] transition"
    >

      <Clock3
        size={18}
        strokeWidth={2}
        className="text-[#D18400]"
      />

      <span>
        Pay in installments
      </span>

    </button>

  </div>

</div>

        {/* Materials */}

        <div>

  <label className="block text-sm font-medium mb-2">
    Additional Materials Required?
  </label>

  <select
    value={scopeForm.materialsRequired}
    onChange={(e) =>
      setScopeForm((prev) => ({
        ...prev,
        materialsRequired: e.target.value,
        procurementResponsibility:
          e.target.value === "no"
            ? ""
            : prev.procurementResponsibility,
      }))
    }
    className="w-full h-11 min-w-0 rounded-md border border-gray-300 px-2 sm:px-3 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-black">

    <option value="no">
      No, labor only (materials supplied or not needed)
    </option>

    <option value="yes">
      Yes, materials are explicitly required
    </option>

  </select>

</div>

{scopeForm.materialsRequired === "yes" && (
  <MaterialsSection
    procurementResponsibility={
      scopeForm.procurementResponsibility
    }
    materials={scopeForm.materials}
    setScopeForm={setScopeForm}
  />
)}

        {/* Other Charges */}

        <div>

          <label className="block text-sm font-semibold mb-2">
            Other Charges (Logistics, Transport, Custom Tools)
          </label>

          <input
            type="number"
            placeholder="0"
            className="w-full h-11 rounded-md border border-gray-300 px-3 outline-none focus:ring-2 focus:ring-black"
          />

        </div>

        {/* Labour */}

        <div>

          <label className="block text-sm font-semibold mb-2">
            Amended Structural Labour Charge Adjustment
          </label>

          <select className="w-full h-11 min-w-0 rounded-md border border-gray-300 px-2 sm:px-3 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-black">

            <option>
              Keep Original Agreed Booking Labour (₦150)
            </option>

          </select>

        </div>

        {/* Approval

        <div>

          <label className="block text-sm font-medium mb-2">
            Approval Link Gate Activation
          </label>

          <div className="h-11 rounded-md border border-orange-400 flex items-center px-3">

            <TriangleAlert
              size={16}
              className="text-orange-500 mr-2"
            />

            <span className="text-sm text-gray-600">
              Awaiting on-site verification photo
            </span>

          </div>

        </div> */}

        {/* Commencement */}

        <div>

          <label className="block text-sm font-semibold mb-2">
            Target Commencement Date
          </label>

          <div className="relative">

            <input
              type="datetime-local"
              value={scopeForm.commencementDate}
              onChange={(e) =>
                setScopeForm({
                  ...scopeForm,
                  commencementDate: e.target.value,
                })
              }
              className="w-full h-11 rounded-md border border-gray-300 px-3 outline-none focus:ring-2 focus:ring-black"
            />


          </div>

        </div>

        {/* Completion */}

        <div>

          <label className="block text-sm font-semibold mb-2">
            Expected Completion Date
          </label>

          <div className="relative">

            <input
              type="datetime-local"
              value={scopeForm.completionDate}
              onChange={(e) =>
                setScopeForm({
                  ...scopeForm,
                  completionDate: e.target.value,
                })
              }
              className="w-full h-11 rounded-md border border-gray-300 px-3 outline-none focus:ring-2 focus:ring-black"
            />

          </div>

        </div>

        {/* Button */}

      <button className="w-full h-11 rounded-md bg-[#111827] text-white text-sm font-semibold   hover:bg-black transition flex items-center justify-center gap-2">
        <span>Submit contract for Client Approval</span>
      <Send 
      size={16}
      strokeWidth={2}
      className="text-white"
     />
    </button>

        {/* Footer */}

        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">

          <Lock size={12} />

          <span>
            By submitting you agree to SkillZone{" "}
            <span className="text-orange-500 cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-orange-500 cursor-pointer">
              Escrow Policy
            </span>.
          </span>

        </div>

      </div>
      <PayInInstallmentsModal
  isOpen={showInstallmentModal}
  onClose={() => setShowInstallmentModal(false)}
  onContinue={() => {
    setShowInstallmentModal(false);

    // Installment configuration comes next
  }}
/>

<RejectAgreementModal
      isOpen={showArtisanRejectModal}
      onClose={() => setShowArtisanRejectModal(false)}
      onConfirm={() => {
    // API call later
    setShowArtisanRejectModal(false);
    }}
  />


    </section>
  );
};

export default ScopeCompilationForm;
import { useState } from "react";
import ContractStatusBadge from "./ContractStatusBadge";
import ContractActions from "./ContractActions";
import { contractInfo, contractStatusConfig } from "../../data/contractData";
import PayInInstallmentsModal from "./PayInInstallmentsModal";
import RejectAgreementModal from "./RejectAgreementModal";
import MaterialsSection from "./MaterialsSection";
import { FaCircleCheck } from "react-icons/fa6";
import { Clock3, CreditCard, UploadCloud, X, Lock } from "lucide-react";

const ScopeCompilationForm = (onArtisanDispute) => {
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

  const { payment, status } = contractInfo;
  const statusConfig = contractStatusConfig[status];
  const [showInstallmentModal, setShowInstallmentModal] = useState(false);
  const [isPartPaymentSelected, setIsPartPaymentSelected] = useState(false);
  const [showArtisanRejectModal, setShowArtisanRejectModal] = useState(false);
const [isTermsAgreed, setIsTermsAgreed] = useState(false);

  // Dynamic file list state container
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const canEditContract = status === "DRAFT" || status === "REVISION_REQUESTED";

  // Action handoff click logic templates
  const handleContractSubmit = () => alert("Submitting validation scope...");
  // const handleContractCancel = () => alert("Initiating contract cancellation process...");
  const handleContractResubmit = () => alert("Resubmitting updated parameters to client...");
  const handleSignoffRequest = () => alert("Requesting project milestone signoff...");
  const handleDisputeOpen = () => alert("Opening a neutral platform contract dispute...");
  

  const processFiles = (files) => {
    const validFiles = files.filter((file) => {
      const isLessThan10MB = file.size / 1024 / 1024 < 10;
      if (!isLessThan10MB) alert(`${file.name} exceeds the 10MB limit.`);
      return isLessThan10MB;
    });

    setUploadedFiles((prev) => [...prev, ...validFiles]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) processFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (canEditContract) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (!canEditContract) return;

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length > 0) processFiles(imageFiles);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setUploadedFiles((prev) => {
      const updatedFiles = prev.filter((_, idx) => idx !== indexToRemove);

      // AUTO-RESET LOGIC 👇
      // If the artisan removes the last photo, instantly uncheck the terms agreement box
      if (updatedFiles.length === 0) {
        setIsTermsAgreed(false);
      }

      return updatedFiles;
    });
  };

  return (
    <section className="bg-white border border-gray-200 rounded-lg">
      {/* Header Profile Title */}
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
          <ContractStatusBadge status={status} />
          {/* <p className="text-xs text-gray-500">{statusConfig?.description}</p> */}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Lock Status Bar */}
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
              <FaCircleCheck
                size={20}
                strokeWidth={2.5}
                className="text-[#000000] bg-white rounded-full"
              />
            </div>
          </div>
        </div>
        {/* Drag and Drop Zone Container */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-[#111827]">
            Site Verification Photo
            <span className="text-gray-400 font-normal"> (Required) </span>
          </label>

          <label
            htmlFor="verification"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg h-40 flex flex-col items-center justify-center transition-all ${
              isDragging
                ? "border-black bg-gray-50/80 scale-[0.99]"
                : "border-gray-300 bg-white"
            } ${canEditContract ? "cursor-pointer hover:bg-gray-50" : "cursor-not-allowed opacity-60"}`}
          >
            <UploadCloud size={42} className="text-[#111827] mb-3" />
            <p className="font-medium text-[#111827]">
              {isDragging
                ? "Drop items right here..."
                : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-gray-500 mt-2 text-center px-6">
              Upload clear photos of the work site and existing conditions
              <br />
              (JPG, PNG up to 10MB each)
            </p>
            <input
              id="verification"
              type="file"
              multiple
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleFileChange}
              disabled={!canEditContract}
            />
          </label>
        </div>
        {/* Real-time Dynamic Image Matrix Previews */}
        <div>
          <h3 className="text-sm font-semibold text-[#111827]">
            On-site Work Preview
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Uploaded on-site work photo
          </p>

          <div className="flex flex-wrap gap-3 mt-3 pb-1">
            {uploadedFiles.length === 0 ? (
              <p className="text-xs italic text-gray-400 py-2">
                No images uploaded or dragged yet.
              </p>
            ) : (
              uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative group w-[90px] h-[75px] border border-gray-200 rounded-md overflow-hidden bg-gray-50 shadow-sm"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview asset ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {canEditContract && (
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    >
                      <X size={16} className="stroke-[2.5]" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        {/* Client Note Panel Area */}
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
        {/* Payment Plan */}
        <div className="rounded-lg border border-gray-300 p-4">
          <h3 className="text-base font-semibold text-[#111827]">
            Payment plan
          </h3>

          <p className="text-sm text-[#797786] mt-2">
            Receive payment in full or in installments as work progresses
          </p>

          <div className=" mt-5 w-full max-w-[572px] min-h-[72px] rounded-[8px] px-3 sm:px-4 py-[14px] bg-[#F5F5F5] shadow-[0_0_12px_0_#0000001A] flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {/* Full Payment */}

            <button
              type="button"
              className="flex-1 h-11 px-2 py-3 rounded-lg border border-black flex items-center justify-center gap-2 text-sm font-semibold text-black hover:bg-gray-50 transition"
            >
              <CreditCard size={18} strokeWidth={2} className="text-black" />

              <span>Full Payment</span>
            </button>

            {/* Pay in Installments */}

            <button
              type="button"
              onClick={() => setShowInstallmentModal(true)}
              className="flex-1 h-11 px-2 py-3 rounded-lg border border-[#B6701C] flex items-center justify-center gap-2 text-sm font-semibold text-[#B6701C] hover:bg-[#FFF8EC] transition"
            >
              <Clock3 size={18} strokeWidth={2} className="text-[#B6701C]" />

              <span>Pay in installments</span>
            </button>
          </div>
        </div>
        {/* Materials */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Additional Materials Required?
          </label>

          <select
            disabled={!canEditContract}
            value={scopeForm.materialsRequired}
            onChange={(e) =>
              setScopeForm((prev) => ({
                ...prev,
                materialsRequired: e.target.value,
                procurementResponsibility:
                  e.target.value === "no" ? "" : prev.procurementResponsibility,
              }))
            }
            className="w-full h-11 min-w-0 rounded-md border border-gray-300 px-2 sm:px-3 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-black"
          >
            <option value="no">
              No, labor only (materials supplied or not needed)
            </option>

            <option value="yes">Yes, materials are explicitly required</option>
          </select>
        </div>
        {scopeForm.materialsRequired === "yes" && (
          <MaterialsSection
            procurementResponsibility={scopeForm.procurementResponsibility}
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
            disabled={!canEditContract}
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

          <select
            disabled={!canEditContract}
            className=" w-full h-11 min-w-0 rounded-md border border-gray-300 px-2 sm:px-3 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-black"
          >
            <option>Keep Original Agreed Booking Labour (₦150)</option>
            <option>Request Labour Adjustment (Complex Site Realities)</option>
          </select>
        </div>
        {/* Commencement */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Target Commencement Date
          </label>

          <div className="relative">
            <input
              disabled={!canEditContract}
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
              disabled={!canEditContract}
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

        {/* Unified Bottom Layout Form Action Footer Section */}
        <div className="pt-5 mt-4 border-t border-gray-100/80 space-y-4">
          {/* Hide the confirmation checkbox entirely if the status is already DISPUTED */}
          {status !== "DISPUTED" && (
            <>
              <label className="flex items-start gap-3 cursor-pointer group select-none">
                <input
                  type="checkbox"
                  checked={isTermsAgreed}
                  onChange={(e) => {
                    if (uploadedFiles.length === 0) {
                      alert(
                        "Please upload at least one site verification photo before confirming.",
                      );
                      return;
                    }
                    setIsTermsAgreed(e.target.checked);
                  }}
                  className={`mt-0.5 w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black cursor-pointer ${
                    uploadedFiles.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                />
                <span className="text-xs text-gray-500 font-medium leading-tight group-hover:text-gray-900 transition-colors">
                  I confirm that the project scope details, verification
                  requirements, and selected payment terms are correct and
                  binding.
                </span>
              </label>

              {uploadedFiles.length === 0 && (
                <p className="text-[11px] text-amber-600 bg-amber-50 border border-amber-100/70 rounded-md p-2 font-medium">
                  ⚠️ Upload at least one verification photo above to unlock
                  contract actions.
                </p>
              )}
            </>
          )}

          {/* 
            🌟 FIXED LOGIC LAYER:
            If status is "DISPUTED", remove the pointer-events-none lock entirely 
            so the dispute dashboard button becomes instantly active and clickable!
          */}
          <div
            className={`transition-all duration-300 ${
              status !== "DISPUTED" &&
              (!isTermsAgreed || uploadedFiles.length === 0)
                ? "opacity-40 pointer-events-none filter grayscale-[30%]"
                : "opacity-100"
            }`}
          >
            <ContractActions
              status={status}
              isPartPaymentSelected={isPartPaymentSelected}
              onSubmit={handleContractSubmit}
              onCancel={() => setShowArtisanRejectModal(true)}
              onResubmit={handleContractResubmit}
              onRequestSignoff={handleSignoffRequest}
              onOpenDispute={onArtisanDispute || handleDisputeOpen}
              onPartPayment={() => setShowInstallmentModal(true)}
            />
          </div>
        </div>

        {/* 3. The uncommented Modal mounted at the absolute bottom of the layout template */}
        <RejectAgreementModal
          isOpen={showArtisanRejectModal}
          onClose={() => setShowArtisanRejectModal(false)}
          onConfirm={() => {
            // API request process runs here later
            console.log("Contract cancellation request dispatched.");
            setShowArtisanRejectModal(false);
          }}
        />
        {/* Footer */}
        <div className="flex items-center justify-center gap-2 text-xs text-black-600">
          <Lock size={12} />

          <span>
            By submitting you agree to SkillZonet{" "}
            <span className="text-[#FE9A00] cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-[#FE9A00] cursor-pointer">Escrow Policy</span>
            .
          </span>
        </div>
      </div>
      <PayInInstallmentsModal
        isOpen={showInstallmentModal}
        onClose={() => setShowInstallmentModal(false)}
        onContinue={() => {
          setShowInstallmentModal(false);
          setIsPartPaymentSelected(true);

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

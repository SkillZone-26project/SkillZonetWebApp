import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { UploadCloud } from "lucide-react";
import { DISPUTE_FORM_CONFIG } from "../../data/contractDisputeData";

const ContractDispute = ({ contractId = "cnt_8f92a10b-33c9-4b" }) => {
  const fileInputRef = useRef(null);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  // Destructure for quick, readable references within the JSX
  const {
    labels,
    placeholders,
    validation,
    alerts,
    maxPhotos,
    maxFileSizeMB,
    allowedFileTypes,
  } = DISPUTE_FORM_CONFIG;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: { contractId },
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (selectedPhotos.length + files.length > maxPhotos) {
      alert(alerts.maxPhotosExceeded(maxPhotos));
      return;
    }

    const validFiles = files.filter((file) => {
      const isLessThanMax = file.size / 1024 / 1024 < maxFileSizeMB;
      if (!isLessThanMax) alert(alerts.fileTooLarge(file.name, maxFileSizeMB));
      return isLessThanMax;
    });

    const updatedPhotos = [...selectedPhotos, ...validFiles];
    setSelectedPhotos(updatedPhotos);
    setValue("evidencePhotos", updatedPhotos, { shouldValidate: true });
  };

  const removePhoto = (indexToRemove) => {
    const updated = selectedPhotos.filter(
      (_, index) => index !== indexToRemove,
    );
    setSelectedPhotos(updated);
    setValue("evidencePhotos", updated, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    console.log("Submitting Contract Dispute Data:", {
      contractId: data.contractId,
      reasonForDispute: data.reasonForDispute,
      evidencePhotos: selectedPhotos,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert(alerts.success);
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-4">
      <div className="max-w-[441px] p-4 mx-auto w-full mt-4 bg-white rounded-[10px] border border-black/10 shadow-sm">
        {/* Title Header */}
        <div>
          <h3 className="font-bold text-[18px] md:text-[24px] text-black leading-[18px]">
            {labels.title}
          </h3>
          <p className="text-[14px] leading-[18px] text-textGray mt-4">
            {labels.subtitle}
          </p>
        </div>

        <div className="border-t border-gray-100 mt-4 mb-6 -mx-5"></div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1. Contract ID */}
          <div className="space-y-1.5">
            <label className="text-[12px] md:text-[18px] leading-[18px] font-semibold text-black">
              {labels.contractId}
            </label>
            <input
              type="text"
              readOnly
              className="w-full border border-gray-200 rounded-md p-3 text-[12px] md:text-[14px] bg-[#F8FAFC] text-textGray outline-none cursor-not-allowed font-mono"
              {...register("contractId")}
            />
          </div>

          {/* 2. Reason for Dispute Area */}
          <div className="space-y-1.5">
            <label className="text-[12px] md:text-[18px] leading-[18px] font-semibold text-black">
              {labels.reasonLabel} <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              placeholder={placeholders.reason}
              className={`w-full border rounded-md p-3 text-sm bg-white outline-none transition-all resize-none placeholder:text-textGray ${
                errors.reasonForDispute
                  ? "border-red-500 ring-1 ring-red-100"
                  : "border-gray-200 focus:border-black"
              }`}
              {...register("reasonForDispute", validation.reason)}
            />
            {errors.reasonForDispute && (
              <p className="text-[10px] text-red-500 font-medium ml-0.5">
                {errors.reasonForDispute.message}
              </p>
            )}
          </div>

          {/* 3. Drag and Drop / Photo Upload Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[12px] md:text-[18px] leading-[16px] font-semibold text-black">
              <span>{labels.uploadLabel}</span>
              <span>
                {selectedPhotos.length} / {maxPhotos} Photos
              </span>
            </div>

            <input
              type="file"
              multiple
              accept={allowedFileTypes}
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl bg-[#F8FAFC] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50/50 transition-colors"
            >
              <UploadCloud size={28} className="text-gray-900 stroke-[1.5]" />
              <p className="text-xs font-bold text-gray-900 mt-2">
                {labels.uploadTitle}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                {labels.uploadSubtitle}
              </p>
            </div>

            {/* Thumbnail list container */}
            {selectedPhotos.length > 0 && (
              <div className="grid grid-cols-5 gap-2 mt-2">
                {selectedPhotos.map((file, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-md overflow-hidden bg-gray-100 group border"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePhoto(idx);
                      }}
                      className="absolute inset-0 bg-black/50 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Form Footer Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#09090B] text-white py-3 rounded-md text-sm font-bold flex items-center justify-center hover:bg-black transition-all active:scale-[0.99] disabled:bg-gray-400"
          >
            {isSubmitting ? labels.submittingBtn : labels.submitBtn}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContractDispute;

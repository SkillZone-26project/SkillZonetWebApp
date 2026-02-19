import { ArrowLeft, ArrowRight, Upload, CreditCard } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";

import React from 'react'

const DocumentVerification = () => {
    const navigate = useNavigate();
    const { formValues, setFormValues } = useOutletContext();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: formValues,
        mode: "onChange", // 🔥 enables live validation
    });
    const idCardFile = watch("idCard");
    const certFile = watch("certification");


    const onSubmit = (data) => {
        setFormValues((prev) => ({ ...prev, ...data }));
        navigate("/artisan-onboarding/bank-details");
    };
  
  return (
    <div>
        {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="bg-bgUnread p-3 rounded-full">
                  <CreditCard className="text-unread w-8 h-8 font-medium" />
                </div>
              </div>
        
              {/* Title */}
              <h2 className="text-textColor font-semibold text-[24px] leading-[32px] tracking-[0.07px] text-center">
                Verification Documents
              </h2>
              <p className="text-textGray mb-8 font-normal text-[16px] leading-[24px] tracking-[-0.31px] text-center">
                Help  clients trust with verified credentials
              </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
                    {/* Document Upload */}
      <div
  className={`border-2 rounded-lg p-6 text-center mt-4 transition ${
    idCardFile?.length
      ? "border-green-100 bg-green-50"
      : "border-black/10"
  }`}
>
  <input
    type="file"
    accept=".jpg,.jpeg,.png,.pdf"
    {...register("idCard", {
      required: "ID Card is required",
    })}
    className="hidden"
    id="idCardUpload"
  />

  {!idCardFile?.length ? (
    <label htmlFor="idCardUpload" className="cursor-pointer block">
      <div className="flex justify-center mb-2">
        <Upload className="text-textGray w-[40px] h-[40px]" />
      </div>
      <p className="font-medium">Upload ID Card</p>
      <p className="text-sm text-gray-500">
        National ID, Driver’s License, or International Passport
      </p>
      <span className="border border-black/10 inline-block mt-3 px-4 py-2 bg-gray-100 rounded-[8px] font-medium text-sm">
        Choose File
      </span>
    </label>
  ) : (
    <div className="space-y-2">
      <p className="text-green-700 font-medium text-sm">
        ✔ {idCardFile[0].name}
      </p>
      <label
        htmlFor="idCardUpload"
        className="text-sm text-blue-600 cursor-pointer underline"
      >
        Replace file
      </label>
    </div>
  )}

  {errors.idCard && (
    <p className="text-red-500 text-xs mt-2">
      {errors.idCard.message}
    </p>
  )}
</div>


{/* professional cert */}
<div
  className={`border-2 rounded-lg p-6 text-center mt-4 transition ${
    certFile?.length
      ? "border-green-100 bg-green-50"
      : "border-black/10"
  }`}
>
  <input
    type="file"
    accept=".jpg,.jpeg,.png,.pdf"
    {...register("certification")}
    className="hidden"
    id="certUpload"
  />

  {!certFile?.length ? (
    <label htmlFor="certUpload" className="cursor-pointer block">
      <div className="flex justify-center mb-2">
        <Upload className="text-textGray w-[40px] h-[40px]" />
      </div>
      <p className="font-medium">
        Professional Certification (Optional)
      </p>
      <p className="text-sm text-textGray">
        Trade certifications, licenses, or diplomas
      </p>
      <span className="border border-black/10 inline-block mt-3 px-4 py-2 bg-gray-100 rounded-[8px] font-medium text-sm">
        Choose File
      </span>
    </label>
  ) : (
    <div className="space-y-2">
      <p className="text-green-700 font-medium text-sm">
        ✔ {certFile[0].name}
      </p>
      <label
        htmlFor="certUpload"
        className="text-sm text-blue-600 cursor-pointer underline"
      >
        Replace file
      </label>
    </div>
  )}
</div>


<input
  type="text"
  placeholder="Enter your 11-digit BVN"
  {...register("bvn", {
    required: "BVN is required",
    pattern: {
      value: /^\d{11}$/,
      message: "BVN must be exactly 11 digits",
    },
  })}
  className={`w-full h-[36px] bg-gray-100 rounded-md px-3 text-sm outline-none ${
    errors.bvn ? "ring-1 ring-red-500" : ""
  }`}
/>

{errors.bvn && (
  <p className="text-red-500 text-xs mt-1">
    {errors.bvn.message}
  </p>
)}
<span className="text-xs text-textGray leading-4">
Required for payment processing and verification </span>

<div className="px-[17px] bg-[#eff6ff] border border-[#bedbff] py-[5px] mt-4 w-full">
<p className="text-sm leading-5 text-textBlue"> 🔒 Your documents are encrypted and stored securely. They'll only be used for verification purposes.</p>
</div>

{/* Action Buttons */}
<div className="flex gap-3 justify-center mt-8">
  <button
   type="button"
   onClick={() => navigate(-1)} // Use navigate(-1) to go back
   className="w-[297px] h-[36px] bg-white border border-bgGray rounded-[8px] flex items-center justify-center gap-2 transition-all ">
   <ArrowLeft size={16} className="text-textColor" />
   <span className="font-['Inter'] font-medium text-[14px] text-textColor">
   Back</span>
  </button>
                    
  <button
  type="submit"
  disabled={!isValid || !idCardFile?.length}
  className={`w-[297px] h-[36px] rounded-[8px] flex items-center justify-center gap-2 bg-black text-white transition-all ${
  isValid && idCardFile?.length ? "hover:bg-opacity-90" : "cursor-not-allowed" }`} >
  <span className="font-['Inter'] font-medium text-[14px]">
  Continue</span>
  <ArrowRight size={16} />
  </button>
  </div>

  </form>
  </div>
    
  )
}

export default DocumentVerification
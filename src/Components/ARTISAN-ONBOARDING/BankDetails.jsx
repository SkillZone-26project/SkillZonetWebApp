import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ArrowLeft, CreditCard, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";

const BankDetails = () => {
  const navigate = useNavigate();
  const { formValues, setFormValues } = useOutletContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: formValues,
    mode: "onChange",
  });

  const onSubmit = (data) => {
    setFormValues((prev) => ({ ...prev, ...data }));
    navigate("/artisan-onboarding/confirmation");
  };

  return (
    <div>
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="bg-bgWallet p-3 rounded-full">
          <CreditCard className="text-wallet w-6 h-6" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-textColor font-semibold text-[24px] leading-[32px] text-center">
        Bank Account Details
      </h2>
      <p className="text-textGray mb-8 text-[14px] text-center">
        For receiving payments
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Bank Name */}
        <div>
          <label className="text-sm font-medium">Bank Name *</label>
          <select
            {...register("bank", { required: "Bank is required" })}
            className={`w-full h-[40px] bg-bgGray rounded-[8px] px-3 text-sm outline-none focus:ring-1 focus:ring-black ${
              errors.bank ? "ring-1 ring-red-500" : ""
            }`}
          >
            <option value="">Select your bank</option>
            <option value="Ecobank">Ecobank</option>
            <option value="UBA">United Bank For Africa</option>
          </select>
          {errors.bank && (
            <p className="text-red-500 text-xs mt-1">
              {errors.bank.message}
            </p>
          )}
        </div>

        {/* Account Number */}
        <div>
          <label className="text-sm font-medium">Account Number *</label>
          <input
            {...register("accountNumber", {
              pattern: {
              value: /^\d{10}$/,
              message: "Account Number must be exactly 10 digits",
              },
            })}
            placeholder="0123456789"
            className={`w-full h-[40px] bg-bgGray rounded-[8px] px-3 text-sm outline-none focus:ring-1 focus:ring-black ${
              errors.accountNumber ? "ring-1 ring-red-500" : ""
            }`}
          />
          {errors.accountNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.accountNumber.message}
            </p>
          )}
        </div>

        {/* Account Name */}
        <div>
          <label className="text-sm font-medium">Account Name *</label>
          <input
            {...register("accountName", {
              required: "Account name is required",
            })}
            placeholder="John Mensah"
            className="w-full h-[40px] bg-bgGray rounded-[8px] px-3 text-sm outline-none focus:ring-1 focus:ring-black"
          />
          <p className="text-xs text-textGray mt-1">
            Auto-filled from bank verification
          </p>
        </div>

        {/* Almost Done Box */}
        <div className="bg-[#f0fdf4] border border-[#b9f8cf] rounded-[10px] px-3 py-4">
          <div className="flex items-start gap-2">
            <CheckCircle className=" w-6 h-6 font-[medium] text-[#00A63E]" />
            <div className="font-inter">
              <p className="font-medium text-base tracking-[-0.31px] text-[#016630]">
                Almost Done!
              </p>
              <p className="text-sm font-normal tracking-[-0.15px] text-[#008236]">
                Once you submit, our team will review your profile within
                24–48 hours. You'll receive an email when approved.
              </p>
            </div>
          </div>
        </div>

        {/* Agreements */}
        <div className="space-y-3 border border-t-[#0000001A] p-4 opacity-100 rounded-[10px]">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              {...register("terms", { required: true })}
              className="w-4 h-4 accent-black"
            />
            I agree to the Terms of Service and Privacy Policy
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              {...register("marketing")}
              className="w-4 h-4 accent-black"
            />
            Send me tips, updates, and promotional offers
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-6">
          <button
            type="button"
            onClick={() =>
              navigate("/artisan-onboarding/document-verification")
            }
            className="w-[297px] h-[36px] bg-white border border-bgGray rounded-[8px] flex items-center justify-center gap-2 transition-all"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-[297px] h-[36px] rounded-[8px] flex items-center justify-center gap-2 bg-black text-white transition-all ${
              isValid
                ? "hover:bg-opacity-90"
                : "cursor-not-allowed"
            }`}
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default BankDetails;


//  const finalPayload = {
//     ...formValues,
//     ...data,
//   };

//   console.log(finalPayload);

  // await axios.post("/api/artisan/register", finalPayload);
import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { payoutData } from "../../data/payoutData";

const BankDetails = ({ setActiveTab }) => {
  const [bankName, setBankName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");

  const handleBankChange = (e) => {
    const value = e.target.value;

    setBankName(value);

    const selectedBank = payoutData.banks.find((bank) => bank.value === value);

    setBankCode(selectedBank?.code || "");
  };

  return (
    <div className="bg-white">
      <div className="px-3 py-3 sm:px-5">
        <h1 className="text-[20px] font-semibold text-black">Bank Details</h1>

        <p className="mt-1 text-[12px] text-textGray">
          Enter your verified bank details
        </p>
        {/* Important Requirement */}
        <div className="mt-4 border-l-4 border-[#CA8A04] bg-[#FEFCE8] px-2.5 py-2.5 shadow-[0_1px_6px_rgba(0,0,0,0.08)]">
          <div className="flex items-start gap-2">
            <TriangleAlert
              size={16}
              className="mt-0.5 shrink-0 text-[#E59A00]"
            />

            <div>
              <p className="text-[14px] font-bold uppercase text-[#B36A20]">
                {payoutData.labels.importantRequirement}
              </p>

              <p className="mt-1 text-[12px] leading-[18px] text-[#B36A20]">
                Your bank account name must strictly match the full name on your
                profile. Mismatch account details will cause payment failures.
              </p>
            </div>
          </div>
        </div>

        {/* Bank Name */}
        <div className="mt-3">
          <label
            htmlFor="bankName"
            className="mb-1 block text-[14px] font-semibold uppercase text-black"
          >
            Bank Name
          </label>

          <select
            id="bankName"
            value={bankName}
            onChange={handleBankChange}
            className="h-8 w-full rounded-md border border-[#D1D5DB] bg-white px-2 text-[14px] text-black outline-none focus:border-[#111827]"
          >
            <option value="">Select your bank</option>

            {payoutData.banks.map((bank) => (
              <option key={bank.value} value={bank.value}>
                {bank.label}
              </option>
            ))}
          </select>
        </div>

        {/* Bank Code */}
        <div className="mt-3">
          <label
            htmlFor="bankCode"
            className="mb-1 block text-[14px] font-semibold uppercase text-black"
          >
            Bank Code{" "}
            <span className="normal-case text-[12px] font-normal text-textGray">
              (auto-filled)
            </span>
          </label>

          <input
            id="bankCode"
            type="text"
            value={bankCode}
            readOnly
            placeholder="e.g. 058"
            className="h-8 w-full rounded-md border border-[#D1D5DB] bg-white px-2 text-[14px] text-textGray outline-none"
          />
        </div>

        {/* Account Number */}
        <div className="mt-3">
          <label
            htmlFor="accountNumber"
            className="mb-1 block text-[14px] font-semibold uppercase text-black"
          >
            Account Number (NUBAN)
          </label>

          <input
            id="accountNumber"
            type="text"
            inputMode="numeric"
            maxLength={10}
            value={accountNumber}
            onChange={(e) =>
              setAccountNumber(e.target.value.replace(/\D/g, ""))
            }
            placeholder="10-digit account number"
            className="h-8 w-full rounded-md border border-[#D1D5DB] bg-white px-2 text-[14px] text-[#555555] outline-none placeholder:text-[#A3A3A3] focus:border-[#111827]"
          />
        </div>

        {/* Account Holder */}
        <div className="mt-3">
          <label
            htmlFor="accountHolderName"
            className="mb-1 block text-[14px] font-semibold uppercase text-black"
          >
            Account Holder Name
          </label>

          <input
            id="accountHolderName"
            type="text"
            value={accountHolderName}
            onChange={(e) => setAccountHolderName(e.target.value)}
            placeholder="FELIX AKPEME UNIGOR"
            className="h-8 w-full rounded-md border border-[#D1D5DB] bg-white px-2 text-[14px] uppercase text-[#555555] outline-none placeholder:text-[#A3A3A3] focus:border-[#111827]"
          />

          <p className="mt-1 text-[11px] text-textGray">
            Must match your registered profile name
          </p>
        </div>

        {/* Save */}
        <button
          type="button"
          className="mt-3 h-8 w-full rounded-md bg-black text-[14px] leading-[20px] font-semibold text-white transition hover:bg-[#11102B]"
        >
          {payoutData.labels.saveBankDetails}
        </button>

        {/* Back */}
        <div className="mt-3 text-center">
          <p className="text-[12px] text-textGray">
            <span className="mr-1">←</span>
            Done updating?{" "}
            <button
              type="button"
              onClick={() => setActiveTab("request")}
              className="font-medium text-textGray underline text-[12px]"
            >
              Back To Payout Request
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;

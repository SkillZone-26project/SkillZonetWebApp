import { useState } from "react";
import { WalletCards } from "lucide-react";
import { payoutData } from "../../data/payoutData";

const RequestPayout = ({ setActiveTab }) => {
  const [amount, setAmount] = useState("");
  const [accepted, setAccepted] = useState(false);

  const { balance, destination, withdrawal, labels } = payoutData;

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="px-4 pt-5 sm:px-6">
        <h1 className="text-[20px] font-semibold text-black">Request Payout</h1>

        <p className="mt-1 text-[12px] text-textGray">
          Withdraw funds to your verified bank account
        </p>
      </div>

      {/* Withdrawable Balance */}
      <div className="mx-4 mt-4 bg-[#FEFCE8] px-3 py-3 sm:mx-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WalletCards size={18} className="text-[#A15703]" />

            <div>
              <p className="text-[14px] font-bold uppercase text-[#B06A24]">
                Withdrawable Balance
              </p>

              <p className="text-[20px] font-bold text-[#000000]">
                ₦
                {balance.amount.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          <span className="rounded-md bg-[#F0B10052] px-2 py-1 text-[14px] font-semibold text-[#76471E] shadow-sm">
            {balance.status}
          </span>
        </div>
      </div>

      {/* Payout Destination */}
      <div className="mx-4 mt-4 sm:mx-6">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-[13px] font-semibold uppercase text-[#555555]">
            {labels.payoutDestination}
          </p>

          <button
            type="button"
            onClick={() => setActiveTab("bank")}
            className="text-[14px] font-medium text-[#76471E]"
          >
            Edit
          </button>
        </div>

        <div className="rounded-md border border-[#D1D5DB] px-3 py-2">
          <p className="text-[13px] font-semibold text-[#333333]">
            {destination.bankName} • {destination.accountNumber}
          </p>

          <p className="mt-1 text-[12px] text-textGray">
            {destination.accountHolder}
          </p>
        </div>
      </div>

      {/* Withdrawal Amount */}
      <div className="mx-4 mt-4 sm:mx-6">
        <label
          htmlFor="withdrawalAmount"
          className="mb-1 block text-[14px] font-semibold uppercase text-textGray"
        >
          {labels.withdrawalAmount}
        </label>

        <input
          id="withdrawalAmount"
          type="number"
          min={withdrawal.minimum}
          max={withdrawal.maximum}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="₦ 0.00"
          className="h-9 w-full rounded-md border border-[#D1D5DB] px-3 text-[14px] text-[#333333] outline-none placeholder:text-textGray focus:border-[#111827]"
        />

        <p className="mt-1 text-[13px] text-[#999999]">
          Minimum: ₦
          {withdrawal.minimum.toLocaleString("en-NG", {
            minimumFractionDigits: 2,
          })}{" "}
          | Maximum: ₦
          {withdrawal.maximum.toLocaleString("en-NG", {
            minimumFractionDigits: 2,
          })}
        </p>
      </div>

      {/* Terms */}
      <div className="mx-4 mt-4 flex items-start gap-2 sm:mx-6">
        <input
          id="terms"
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-[1px] h-3 w-3 accent-[#111827]"
        />

        <label htmlFor="terms" className="text-[12px] leading-3 text-textGray">
          I agree to the{" "}
          <span className="text-[#D08700]">Payout Terms & Conditions</span> and
          confirm that standard processing fees apply.
        </label>
      </div>

      {/* Submit */}
      <div className="mx-4 mt-4 sm:mx-6">
        <button
          type="button"
          disabled={!accepted}
          className="h-9 w-full rounded-md bg-[#000000] text-[14px] font-medium text-white transition hover:bg-[#11102B] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {labels.submitPayout}
        </button>
      </div>

      {/* Bank Details Reminder */}
      <div className="px-4 py-4 text-center sm:px-6">
        <p className="text-[12px] text-textGray">
          Need to update bank account details?{" "}
          <button
            type="button"
            onClick={() => setActiveTab("bank")}
            className="font-medium text-textGray text-[12px] underline"
          >
            Go to Bank Details...
          </button>
        </p>
      </div>
    </div>
  );
};

export default RequestPayout;

import { Wallet, CreditCard } from "lucide-react";

const PaymentMethodIllustration = ({ type }) => {
  switch (type) {
    // =========================
    // STEP 1
    // =========================
    case "payment-method-1":
      return (
        <div className="w-full flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-12">
            <button
              type="button"
              className=" h-10 min-w-[106px] px-3 rounded-[6px]  bg-[#050019] text-white text-[12px] font-medium whitespace-nowrap">
              Request withdraw
            </button>

            <button
              type="button"
              className=" h-10 min-w-[110px] sm:min-w-[128px] px-3 sm:px-4 rounded-[6px] bg-[#050019] text-white text-[12px] font-medium flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap">
              <Wallet size={20} strokeWidth={1.8} />
              <span>Wallet</span>
            </button>
          </div>
        </div>
      );

    // =========================
    // STEP 2
    // =========================
    case "payment-method-2":
      return (
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-[184px] space-y-2">
            <div
              className=" h-[36px] w-full rounded-[6px] border  border-[#D9D9D9]  bg-white shadow-[0_1px_4px_#0000000D] flex items-center justify-between px-3 ">
              <span className="text-[13px] text-[#D1D1D1]">MM / YY</span>

              <span className="text-[12px] text-[#D1D1D1]">CVC</span>
            </div>

            <div
              className=" h-[36px] w-full rounded-[6px] border border-[#D9D9D9] bg-white shadow-[0_1px_4px_#0000000D] flex items-center justify-between px-3">
              <span className="text-[13px] text-[#D1D1D1]">Card Number</span>

              <CreditCard
                size={18}
                strokeWidth={1.5}
                className="text-[#777777]"
              />
            </div>
          </div>
        </div>
      );

    // =========================
    // STEP 3
    // =========================
    case "payment-method-3":
      return (
        <div className="w-full flex items-center justify-center">
          <div className=" w-[238px] h-[42px] border border-[#D9D9D9] bg-white flex items-center justify-between px-2">
            <button
              type="button"
              disabled
              className="h-[32px] px-2 rounded-[4px] border  border-[#D9D9D9] bg-white text-[11px]  text-[#D1D1D1] whitespace-nowrap">
              Set as default
            </button>

            <div className="relative w-[45px] h-[25px] rounded-full bg-[#002D5B] shrink-0">
              <div className="absolute top-[2px] right-[2px] w-[21px] h-[21px] rounded-full bg-white"/>
            </div>
          </div>
        </div>
      );

    // =========================
    // STEP 4
    // =========================
    case "payment-method-4":
      return (
        <div className="w-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-1">
            <span className=" h-[20px] min-w-[66px] px-2 rounded-[6px]  bg-[#A63DFF] text-white text-[10px] font-medium flex items-center justify-center whitespace-nowrap">
              ON THE-WAY
            </span>

            <span className="h-[20px] min-w-[66px] px-2 rounded-[6px] bg-[#FFB900] text-white text-[10px] font-medium flex items-center justify-center">
              Pending
            </span>

            <span className="h-[20px] min-w-[66px] px-2 rounded-[6px] bg-[#00A63C] text-white text-[10px] font-medium flex items-center justify-center">
              Complete
            </span>

            <span className="h-[20px] min-w-[66px] px-2 rounded-[6px] bg-[#E60000] text-white text-[10px] font-medium flex items-center justify-center">
              Cancel
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default PaymentMethodIllustration;

import { payoutData } from "../../data/payoutData";

const PayoutTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full border-b border-[#E5E7EB] bg-white">
      <div className="grid grid-cols-2">
        <button
          type="button"
          onClick={() => setActiveTab("request")}
          className={`relative h-10 text-[14px] font-semibold transition ${
            activeTab === "request" ? "text-[#B86A12]" : "text-[#9CA3AF]"
          }`}
        >
          1. Request Payout{payoutData.labels.requestPayout}
          {activeTab === "request" && (
            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#F59E0B]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("bank")}
          className={`relative h-10 text-[14px] font-semibold transition ${
            activeTab === "bank" ? "text-[#B86A12]" : "text-[#9CA3AF]"
          }`}
        >
          2. Bank Details{payoutData.labels.bankDetails}
          {activeTab === "bank" && (
            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#F59E0B]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PayoutTabs;

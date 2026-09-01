import { useState } from "react";
import PayoutTabs from "./PayoutTabs";
import RequestPayout from "./RequestPayout";
import BankDetails from "./BankDetails";


const Payout = () => {
  const [activeTab, setActiveTab] = useState("request");

  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-8">

      <div className="mx-auto w-full max-w-[441px] border border-black/10">

        <PayoutTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {activeTab === "request" ? (
          <RequestPayout setActiveTab={setActiveTab} />
        ) : (
          <BankDetails setActiveTab={setActiveTab} />
        )}

      </div>

    </div>
  );
};

export default Payout;
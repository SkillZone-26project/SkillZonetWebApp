import Nav from "../../Components/Nav/Nav";
import { useState } from "react";
import ClientApprovalForm from "./ClientApprovalForm";
import ContractPreview from "../ArtisanContract/ContractPreview";
import { contractInfo } from "../../data/contractData";


const ClientContract = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] pt-[80px]">
      <Nav />

      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          {/* Left */}
          <ClientApprovalForm
            status={contractInfo.status}
            paymentPlan="FULL_PAYMENT"
            onApprove={() => alert("Approve")}
            onComplete={() => alert("Complete")}
            onInstallmentPayment={() => alert("Pay installment")}
            onOpenDispute={() => alert("Open dispute")}
          />

          {/* Right */}
          <ContractPreview />
        </div>
      </div>
    </div>
  );
};

export default ClientContract;

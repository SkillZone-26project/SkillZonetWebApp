import { useState } from "react";
import ClientApprovalForm from "./ClientApprovalForm";
import ContractPreview from "../ArtisanContract/ContractPreview";

const ClientContract = () => {

  return (
    <div className="min-h-screen bg-[#F5F7FA]">

      <div className="max-w-[1440px] mx-auto px-6 py-8">

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">

          {/* Left */}
          <ClientApprovalForm />

          {/* Right */}
          <ContractPreview />

        </div>

      </div>

    </div>

    
  );
};

export default ClientContract;
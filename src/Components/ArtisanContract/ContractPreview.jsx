import {BadgeCheck, ShieldCheck, BriefcaseBusiness, User, Landmark, CreditCard, Lock, Download, UserRound } from "lucide-react";
import {MdGppGood  } from "react-icons/md";
import {
  contractInfo,
  agreementSections,
} from "../../data/contractData";


const ContractPreview = () => {
  const { artisan, client, payment, settlement } = contractInfo;

  return (
    <section className="bg-white border border-gray-200 rounded-lg overflow-hidden">

      <div className="px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 xl:py-10">

{/* CONTRACT HEADER */}

<div className="text-center">

  <p className="text-[20px] font-bold uppercase leading-tight text-[#111827]">
    Service Agreement & Secured Deposit Binding Contract
  </p>

  <p className="mt-3 text-[15px] font-semibold text-[#111827]">
    SkillZonet Secured Deposit Fund Contract
  </p>

  <p className="mt-2 text-xs text-gray-500">
    Platform Management Tracking ID: {contractInfo.trackingId}
  </p>

</div>

<div className="border-t border-dashed border-gray-300 my-6" />

{/* BASIC DETAILS */}

<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 xl:gap-x-8 gap-y-6 text-sm">

  {/* Deposit Provider */}

  <div className="flex items-start gap-3">

    <div className="w-9 h-9 rounded-full bg-[#F1F5FD] flex items-center justify-center">
      <ShieldCheck
        size={16}
        className="text-[#000000]"
      />
    </div>

    <div>

      <p className=" font-bold">
        Secured Deposit Provider
      </p>

      <p className="text-[11px] text-gray-400 mt-1">
        SkillZonet Secured Deposit Services
      </p>

    </div>

  </div>

  {/* Assigned Artisan */}

  <div className="flex items-start gap-3">

    <div className="w-9 h-9 rounded-full bg-[#F1F5FD] flex items-center justify-center">
      <BriefcaseBusiness
        size={16}
        className="text-[#000000]"
      />
    </div>

    <div>

      <p className="font-bold">
        Assigned Artisan
      </p>

      <p className="text-[11px] text-gray-400 mt-1">
        {artisan.name}
      </p>

    </div>

  </div>

  {/* Project Token */}

  <div className="flex items-start gap-3">

    <div className="w-9 h-9 rounded-full bg-[#F1F5FD] flex items-center justify-center">
      <BadgeCheck
        size={16}
        className="text-[#000000]"
      />
    </div>

    <div>

      <p className="font-bold">
        Project Token ID
      </p>

      <p className="text-[11px] text-gray-400 mt-1">
        {contractInfo.projectId}
      </p>

    </div>

  </div>

  {/* Client */}

  <div className="flex items-start gap-3">

    <div className="w-9 h-9 rounded-full bg-[#F1F5FD] flex items-center justify-center">
      <User
        size={16}
        className="text-[#000000]"
      />
    </div>

    <div>

      <p className="font-bold">
        Client of Record
      </p>

      <p className="text-[11px] text-gray-400 mt-1">
        {client.name}
      </p>

    </div>

  </div>

</div>

{/* ESCROW STATUS */}

<div className="mt-8 space-y-5">

{/* Secured Deposit */}

<div className="p-4 bg-[#FFF8E8]">

  {/* Mobile: vertical / Tablet+: horizontal */}
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

    {/* Left side */}
    <div className="flex items-start gap-3">

      {/* Shield */}
      <div className="w-4 h-4 flex items-center justify-center shrink-0">
  <img
    src="https://res.cloudinary.com/dipdvqnin/image/upload/v1786658099/Group_427319060_ecrfrj.png"
    alt="Lock"
    className="w-4 h-4 object-contain"
  />
</div>

      {/* Text */}
      <div className="min-w-0">

        <p className="font-semibold text-[14px] leading-[18px] text-[#B86A12]">
          SECURED DEPOSIT
          <br className="sm:hidden" />
          <span className="sm:ml-1">
            FINANCIAL STATUS
          </span>
        </p>

        <p className="font-medium text-[12px] leading-[15px] mt-2 text-[#A65E18] max-w-[260px] sm:max-w-none">
          Funds are securely held in the protected deposit wallet and
          will only be released after successful project completion
          and approval.
        </p>

      </div>

    </div>

    {/* Amount + Lock */}
    <div className="flex items-center justify-end gap-2 mt-3">

      <span className="font-semibold text-[14px] leading-[18px] text-[#000000]">
        ₦{payment.labourCost.toFixed(2)}
      </span>

      <Lock
        size={18}
        className="text-[#000000]"
      />

    </div>

  </div>

</div>

  {/* Verified Account */}

  <div className="p-4">

    <div className="flex items-start justify-between">

      <div className="flex gap-3">

        <div className="w-12 h-12 rounded-full bg-[#EEF3FC] flex items-center justify-center">

          <MdGppGood
            size={32}
            className="text-[#000000]"
          />

        </div>

        <div>

          <h3 className="font-semibold text-[#111827]">
            Verified Payout Account
          </h3>

          <p className="text-sm text-gray-600 mb-3">
            Your payout account has been securely verified.
          </p>

        </div>


      </div>

    </div>
    <div className="flex items-center gap-3">

  <p className="text-normal font-bold text-[#111827]">
    Status:
  </p>

<span
  className="inline-flex items-center gap-2 rounded-[5px] h-10 w-[150px] px-1 py-2 font-semibold bg-[#FEF6D8] border border-[#EDF9EE] text-[#B86A12] shadow-[0_0_8px_0_#0000001A]">
  <Lock
    size={14}
    className="text-[#B86A12]"/>
  Protected
</span>

</div>
<div className="mt-6 rounded-md border border-gray-200 bg-white p-3 sm:p-4">

  {/* Account Name */}
<div className="flex items-center gap-3 sm:gap-4 py-4 border-b border-gray-200">

  <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F4F7FC] flex items-center justify-center">
    <UserRound
      size={20}
      className="text-[#002147]"
    />
  </div>

  <div className="min-w-0 flex-1">
    <p className="text-sm sm:text-[16px] font-medium text-[#111827]">
      Account Name
    </p>

    <p className="mt-1 font-semibold text-[#111827] truncate">
      {settlement.accountName}
    </p>
  </div>

</div>


{/* Bank */}
<div className="flex items-center gap-3 sm:gap-4 py-4 border-b border-gray-200">

  <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F4F7FC] flex items-center justify-center">
    <Landmark
      size={20}
      className="text-[#002147]"
    />
  </div>

  <div className="min-w-0 flex-1">
    <p className="text-sm sm:text-[16px] font-medium text-[#111827]">
      Bank
    </p>

    <p className="mt-1 font-semibold text-[#111827] truncate">
      {settlement.bankName}
    </p>
  </div>

</div>


{/* Account Ending */}
<div className="flex items-center gap-3 sm:gap-4 py-4">

  <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F4F7FC] flex items-center justify-center">
    <CreditCard
      size={20}
      className="text-[#002147]"
    />
  </div>

  <div className="min-w-0 flex-1">

    <p className="text-sm sm:text-[16px] font-medium text-[#111827]">
      Account Ending
    </p>

    <p className="mt-1 font-semibold tracking-[2px] sm:tracking-[4px] text-[#111827] truncate">
      {settlement.accountEnding}
    </p>

  </div>

</div>

</div>
</div>

</div>
      

  {/* TERMS */}
  <div className="mt-10 space-y-4">
     {agreementSections.map((section, index) => (
        <div key={section.id}>
          <h3 className="font-bold text-[#111827] mb-2">
            {index + 1}. {section.title}
          </h3>
          <p className="text-[14px] text-gray-600 leading-8">
            {section.body}
          </p>
        </div>
        ))}

    </div>

{/* PAYMENT SUMMARY */}

<div className="mt-10 rounded-xl bg-[#111827] text-white p-4">

  <h2 className="text-xl font-bold uppercase tracking-wide mb-8">
    Payment Summary
  </h2>

  <div className="space-y-5">

    {/* Labour */}

    <div className="flex justify-between items-center border-b border-gray-700">

      <span className="text-[white]">
        Dynamic Labour Base (Secured Deposit)
      </span>

      <span className="font-semibold">
        ₦{payment.labourCost.toFixed(2)}
      </span>

    </div>

    {/* Materials */}

    <div className="flex justify-between items-center border-b border-gray-700">

      <span className="text-white">
        Direct-to-Artisan Material Cost Pool
      </span>

      <span className="font-semibold">
        ₦{payment.materialCost.toFixed(2)}
      </span>

    </div>

    {/* Logistics */}

    <div className="flex justify-between items-center border-b border-gray-700">

      <span className="text-white">
        Direct-to-Artisan Logistics / Other Charges
      </span>

      <span className="font-semibold">
        ₦{payment.logisticsCost.toFixed(2)}
      </span>

    </div>

    {/* Total */}

    <div className="flex justify-between items-center">

      <span className="text-lg font-bold">
        Total Project Footprint Value
      </span>

      <span className="text-2xl font-extrabold">
        ₦{payment.totalProjectValue.toFixed(2)}
      </span>

    </div>

  </div>

</div>

{/* DOWNLOAD */}

<div className="mt-8 flex justify-center">

  <button
  className="w-full h-14 rounded-md border border-gray-200 bg-[#D9D9D91A] text-[#111827] font-semibold
    text-[16px] hover:bg-gray-50 transition flex items-center justify-center gap-2">
  <span>Download Document</span>
  <Download
    size={20}
    strokeWidth={2.3}
    className=" text-[#111827]"
  />
</button>

</div>

</div>

</section>
 );
};

export default ContractPreview;
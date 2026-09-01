import PaymentMethodIllustration from "./PaymentMethodIllustration";

const HelpStepRow = ({ step }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[48%_48%] gap-2">

      {/* LEFT CONTENT */}
      <div className="py-8 pr-12 border-b border-[#D9D9D9] bg-[#D9D9D90D]">
        <div className="flex gap-3 items-center px-2">

          <div className="w-7 h-7 rounded-full bg-[#CFE1F5ED] text-[#045AFF] text-xs font-semibold flex items-center justify-center shrink-0">
            {step.id}
          </div>

          <div className="space-y-1">
            <h3 className="text-[14px] font-bold text-[#111827]">
              {step.title}
            </h3>

            <p className="text-[13px] leading-5 text-[#6B7280]">
              {step.description}
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT ILLUSTRATION */}
      <div className="w-full min-h-[160px] border border-gray-200/80 rounded-md bg-white flex items-center justify-center p-4 overflow-hidden">

        {step.illustrationType ? (
          <PaymentMethodIllustration
            type={step.illustrationType}
          />
        ) : (
          <img
            src={step.illustration}
            alt={step.title}
            className="max-w-[220px] h-auto object-contain"
          />
        )}

      </div>

    </div>
  );
};

export default HelpStepRow;
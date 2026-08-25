const HelpStepRow = ({ step }) => {
  return (
    <div className="grid grid-cols-[48%_48%] gap-2 ">

      {/* LEFT CONTENT COLUMN */}
      <div className="py-8 pr-12 border-b border-[#D9D9D9] bg-[#D9D9D90D]">
        <div className="flex items-start gap-3 items-center px-2">
          
          {/* NUMBER BADGE */}
          <div className="w-7 h-7 rounded-full bg-[#CFE1F5ED] text-[#045AFF] text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
            {step.id}
          </div>

          {/* TEXT DESCRIPTIONS */}
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
  
  <div className="w-full border border-gray-200/80 rounded-md px-6 bg-white flex items-center justify-center">
    <img
      src={step.illustration}
      alt={step.title}
      className="max-w-[220px] h-auto object-contain"
    />
  </div>

    </div>
  );
};

export default HelpStepRow;
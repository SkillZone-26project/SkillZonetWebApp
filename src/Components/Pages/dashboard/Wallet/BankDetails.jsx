const BankDetails = () => {
  return (
    <div className="bg-white p-5 rounded-xl border mb-6">

      <div className="flex justify-between mb-4">
        <h3 className="font-medium">Bank Account Details</h3>
        <button className="text-sm border px-3 py-1 rounded-md text-textColor">
          Edit Details
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4 bg-bgGray p-4 rounded-lg">
        <div>
          <p className="text-xs text-textGray">Bank Name</p>
          <p className="font-medium">GTBank</p>
        </div>

        <div>
          <p className="text-xs text-textGray">Account Number</p>
          <p className="font-medium">0123456789</p>
        </div>

        <div>
          <p className="text-xs text-textGray">Account Name</p>
          <p className="font-medium">John Mensah</p>
        </div>
      </div>

      <div className="mt-4 text-xs text-textBlue bg-[#EFF6FF] p-3 rounded-md">
        <span className="font-bold">Note:</span>All withdrawals are processed manually by our admin team. Funds will be transferred to your registered bank account within 24-48 hours of approval.
      </div>
    </div>
  );
};

export default BankDetails;
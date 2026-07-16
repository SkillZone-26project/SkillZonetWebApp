const PriceBreakdown = ({
  amount,
  platformFee,
  total,
}) => {
  return (
    <section className="border-t px-6 py-6">
      <h2 className="text-lg font-semibold mb-6">
        Price Breakdown
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between text-sm text-gray-500">
          <span>Labour Cost</span>

          <span>
            ₦{Number(amount).toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <span>Platform Fee</span>

          <span>
            ₦{platformFee.toLocaleString()}
          </span>
        </div>

        <hr className="border-gray-200" />

        <div className="flex justify-between">
          <p className="text-lg font-semibold">
            Total
          </p>

          <p className="text-2xl font-bold">
            ₦{total.toLocaleString()}
          </p>
        </div>

      </div>
    </section>
  );
};

export default PriceBreakdown;
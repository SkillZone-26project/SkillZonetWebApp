import { Clock, TrendingUp, DollarSign } from "lucide-react";

const BalanceCard = ({ title, amount, type }) => {
  const isPrimary = type === "primary";

  const getIcon = () => {
    if (title.toLowerCase().includes("available"))
      return <DollarSign size={18} className="text-bgActive" />;

    if (title.toLowerCase().includes("pending"))
      return <Clock size={18} className="text-textGray" />;

    if (title.toLowerCase().includes("month"))
      return <TrendingUp size={18} className="text-completed" />;
  };

  return (
    <div
      className={`p-5 rounded-xl ${
        isPrimary
          ? "bg-gradient-to-r from-blue-500 to-blue-700 text-bgActive"
          : "bg-white border border-gray-100"
      }`}
    >
      {/* TOP */}
      <div className="flex justify-between items-center">
        <p className={`text-sm ${isPrimary ? "text-bgActive" : "text-textGray"}`}>
  {title}
</p>
        {getIcon()}
      </div>

      {/* AMOUNT */}
      <h2
  className={`text-2xl font-semibold mt-3 ${
    isPrimary ? "text-white" : "text-black"
  }`}
>
  {amount}
</h2>

      {/* SUBTEXT */}
      {title.toLowerCase().includes("pending") && (
        <p className="text-xs text-textGray mt-5">
          Will be available after job completion
        </p>
      )}

      {title.toLowerCase().includes("month") && (
        <p className="text-xs text-completed mt-5">
          +12% from last month
        </p>
      )}

      {/* BUTTON */}
      {isPrimary && (
        <button className="mt-4 bg-white text-blue-600 px-16 py-2 rounded-md text-sm font-medium mx-auto block">
          Request Withdrawal
        </button>
      )}
    </div>
  );
};

export default BalanceCard;
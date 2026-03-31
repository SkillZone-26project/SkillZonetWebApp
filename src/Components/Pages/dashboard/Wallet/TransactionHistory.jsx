import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Clock } from "lucide-react";

const TransactionHistory = () => {
  const [activeTab, setActiveTab] = useState("all");

  const transactions = [
  {
    id: 1,
    title: "Payment from Sarah Johnson - Socket Installation",
    amount: 20000,
    type: "earning",
    status: "completed",
    date: "Jan 8, 2026",
  },
  {
    id: 2,
    title: "Platform Commission (10%)",
    amount: -2000,
    type: "withdrawal",
    status: "completed",
    date: "Jan 8, 2026",
  },
  {
    id: 3,
    title: "Withdrawal to Bank Account",
    amount: 15000,
    type: "withdrawal",
    status: "completed",
    date: "Jan 24, 2026",
  },
  {
    id: 4,
    title: "Payment from Sarah Johnson - Kitchen Sink Repair",
    amount: 18000,
    type: "earning",
    status: "completed",
    date: "Jan 24, 2026",
  },
];

  const filteredTransactions =
    activeTab === "all"
      ? transactions
      : transactions.filter((item) =>
          activeTab === "earnings"
            ? item.type === "earning"
            : item.type === "withdrawal"
        );

  return (
    <div className="bg-white p-5 rounded-xl border">
      <h3 className="font-semibold text-[18px] leading-[28px] tracking-[-0.44px] text-textColor  mb-6">Transaction History</h3>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 bg-barbg w-fit overflow-x-auto no-scrollbar rounded-[14px] p-1">
       {["all", "earnings", "withdrawals"].map((tab) => (
  <button
  key={tab}
  onClick={() => setActiveTab(tab)}
  className={`whitespace-nowrap px-3 py-1 rounded-[14px] font-medium text-sm leading-5 text-center capitalize transition ${
    activeTab === tab
      ? "bg-white shadow-sm text-textColor"
      : "text-textGray hover:bg-gray-100"
  }`}
>
    {tab === "all" ? "All Transactions" : tab}
  </button>
))}
      </div>

      {/* List */}
      <div className="space-y-3">
  {filteredTransactions.map((item) => (
    <div
  key={item.id}
  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
>

      {/* LEFT SIDE */}
      <div className="flex items-start gap-3">

        {/* ICON */}
        <div
  className={`p-2 rounded-full ${
    item.type === "earning"
      ? "bg-bgCompleted text-completed"
      : item.status === "pending"
      ? "bg-bgPending text-pending"
      : item.title.toLowerCase().includes("withdrawal to bank")
      ? "bg-bgActive text-active"
      : "bg-[#ffe2e2] text-textRed"
  }`}
>
  {item.type === "earning" ? (
    <ArrowDownLeft size={16} />
  ) : item.status === "pending" ? (
    <Clock size={16} />
  ) : (
    <ArrowUpRight size={16} />
  )}
</div>

        {/* TEXT */}
        <div>
          <p className="text-sm font-medium break-words">  {item.title} </p>
          <p className="text-xs text-textGray">{item.date}</p>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="text-left sm:text-right">
        <p
          className={`font-medium ${
            item.type === "earning"
  ? "text-completed"
  : item.status === "pending"
  ? "text-pending"
  : item.title.toLowerCase().includes("withdrawal to bank")
  ? "text-active"
  : "text-textRed"
          }`}
        >
          {item.type === "earning" ? "+" : ""}₦
          {Math.abs(item.amount).toLocaleString()}
        </p>

        {/* STATUS BADGE */}
        {activeTab === "all" && (
  <span
    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
      item.status === "completed"
        ? "bg-black text-white"
        : "bg-yellow-100 text-yellow-600"
    }`}
  >
    {item.status}
  </span>
)}
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default TransactionHistory;
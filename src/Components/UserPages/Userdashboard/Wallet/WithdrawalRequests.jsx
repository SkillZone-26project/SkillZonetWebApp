import StatusBadge from "./StatusBadge";
import { ArrowDownLeft, Clock, CheckCircle } from "lucide-react";

const WithdrawalRequests = () => {

  const withdrawals = [
    {
      id: 1,
      title: "Withdrawal to GTBank",
      amount: 500000,
      status: "pending",
      date: "Jan 24, 2026",
    },
    {
      id: 2,
      title: "Withdrawal to GTBank",
      amount: 300000,
      status: "completed",
      date: "Jan 20, 2026",
    },
  ];

  return (
    <div className="bg-white p-5 rounded-xl border mb-6">
      <h3 className="font-medium mb-4">Withdrawal Requests</h3>

      <div className="space-y-3">

        {withdrawals.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
          >

            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">

              {/* ICON */}
              <div
                className={`p-2 rounded-full ${
                  item.status === "pending"
                    ? "bg-bgPending text-pending"
                    : "bg-bgCompleted text-completed"
                }`}
              >
                {item.status === "pending" ? (
                  <Clock size={16} />
                ) : (
                  <CheckCircle size={16} />
                )}
              </div>

              {/* TEXT */}
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-gray-400">{item.date}</p>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="text-right">
              <p className="font-medium">
                ₦{item.amount.toLocaleString()}
              </p>
              <StatusBadge status={item.status} />
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default WithdrawalRequests;
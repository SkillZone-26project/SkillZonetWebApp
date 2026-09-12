import { Clock, TrendingUp, DollarSign, X } from "lucide-react";
import axios from "axios";
import { useState } from "react";

const API_URL =
  "https://skillzonet-backend-auth-v1.onrender.com/api/wallet/withdrawal-request";

const BalanceCard = ({ title, amount, type }) => {
  const isPrimary = type === "primary";

  const [showWithdrawalForm, setShowWithdrawalForm] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getIcon = () => {
    if (title.toLowerCase().includes("available")) {
      return (
        <DollarSign
          size={18}
          className="text-bgActive"
        />
      );
    }

    if (title.toLowerCase().includes("pending")) {
      return (
        <Clock
          size={18}
          className="text-textGray"
        />
      );
    }

    if (title.toLowerCase().includes("month")) {
      return (
        <TrendingUp
          size={18}
          className="text-completed"
        />
      );
    }

    return null;
  };

  // ==========================================
  // HANDLE WITHDRAWAL
  // ==========================================

  const handleWithdrawal = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const amount = Number(withdrawalAmount);

    // Basic validation
    if (!withdrawalAmount || isNaN(amount)) {
      setError("Please enter a valid withdrawal amount.");
      return;
    }

    if (amount <= 0) {
      setError("Withdrawal amount must be greater than ₦0.");
      return;
    }

    // Get available balance from displayed amount
    const numericBalance = Number(
      String(amount === amount ? amount : 0)
    );

    try {
      setIsSubmitting(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in. Please log in again.");
        return;
      }

      // Convert Naira to Kobo
      const amountRequestedInt = Math.round(amount * 100);

      const response = await axios.post(
        API_URL,
        {
          amountRequestedInt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setSuccess(
          response.data.message ||
            "Withdrawal request submitted successfully."
        );

        setWithdrawalAmount("");

        // Close form after successful request
        setTimeout(() => {
          setShowWithdrawalForm(false);
          setSuccess("");
        }, 3000);
      }
    } catch (error) {
      console.error(
        "Withdrawal request failed:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Unable to submit withdrawal request."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div
        className={`p-5 rounded-xl ${
          isPrimary
            ? "bg-gradient-to-r from-blue-500 to-blue-700 text-bgActive"
            : "bg-white border border-gray-100"
        }`}
      >
        {/* TOP */}
        <div className="flex justify-between items-center">
          <p
            className={`text-sm ${
              isPrimary
                ? "text-bgActive"
                : "text-textGray"
            }`}
          >
            {title}
          </p>

          {getIcon()}
        </div>

        {/* AMOUNT */}
        <h2
          className={`text-2xl font-semibold mt-3 ${
            isPrimary
              ? "text-white"
              : "text-black"
          }`}
        >
          {amount}
        </h2>

        {/* PENDING SUBTEXT */}
        {title.toLowerCase().includes("pending") && (
          <p className="text-xs text-textGray mt-5">
            Will be available after job completion
          </p>
        )}

        {/* MONTH SUBTEXT */}
        {title.toLowerCase().includes("month") && (
          <p className="text-xs text-completed mt-5">
            +12% from last month
          </p>
        )}

        {/* REQUEST WITHDRAWAL */}
        {isPrimary && (
          <button
            type="button"
            onClick={() => {
              setShowWithdrawalForm(true);
              setError("");
              setSuccess("");
            }}
            className="mt-4 bg-white text-blue-600 px-16 py-2 rounded-md text-sm font-medium mx-auto block hover:bg-gray-100 transition"
          >
            Request Withdrawal
          </button>
        )}
      </div>

      {/* ==========================================
          WITHDRAWAL FORM
      ========================================== */}

      {showWithdrawalForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-5">

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Request Withdrawal
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Enter the amount you want to withdraw.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowWithdrawalForm(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* AVAILABLE BALANCE */}
            <div className="bg-blue-50 rounded-lg p-4 mb-5">
              <p className="text-xs text-gray-500">
                Available Balance
              </p>

              <p className="text-lg font-bold text-gray-900 mt-1">
                {amount}
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-600 text-sm p-3 rounded-md">
                {success}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleWithdrawal}>

              <div className="mb-5">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Withdrawal Amount
                </label>

                <div className="relative">

                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    ₦
                  </span>

                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={withdrawalAmount}
                    onChange={(e) =>
                      setWithdrawalAmount(e.target.value)
                    }
                    placeholder="Enter amount"
                    className="w-full border border-gray-200 rounded-lg py-3 pl-8 pr-3 outline-none focus:border-blue-500"
                  />

                </div>

                <p className="text-[11px] text-gray-400 mt-2">
                  Amount will be processed in Nigerian Naira.
                </p>

              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowWithdrawalForm(false)
                  }
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Submit Request"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </>
  );
};

export default BalanceCard;
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Clock, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import StatusBadge from "./StatusBadge";

const WITHDRAWAL_API =
  "https://skillzonet-backend-auth-v1.onrender.com/api/wallet/get-withdrawal-request";

const BANK_DETAILS_API =
  "https://skillzonet-backend-auth-v1.onrender.com/api/wallet/bank-details";

const WithdrawalRequests = ({ refreshKey }) => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [bankName, setBankName] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // PAGINATION
  // ==========================================
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 5;

  // ==========================================
  // FETCH WITHDRAWALS + BANK DETAILS
  // ==========================================
  const fetchData = useCallback(
    async (showLoading = true) => {
      try {
        if (showLoading) {
          setIsLoading(true);
        }

        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setError("You are not logged in. Please log in again.");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // ==========================================
        // FETCH BOTH APIs
        // ==========================================
        const [withdrawalResponse, bankResponse] =
          await Promise.all([
            axios.get(
              `${WITHDRAWAL_API}?page=${currentPage}&limit=${limit}`,
              config
            ),

            axios.get(BANK_DETAILS_API, config),
          ]);

        // ==========================================
        // BANK DETAILS
        // ==========================================
        if (bankResponse.data.success) {
          const bankData = bankResponse.data.data;

          setBankName(bankData?.bankName || "");
        }

        // ==========================================
        // WITHDRAWAL HISTORY
        // ==========================================
        if (withdrawalResponse.data.success) {
          const withdrawalData = withdrawalResponse.data.data;

          setWithdrawals(withdrawalData || []);

          // ==========================================
          // PAGINATION DATA
          // ==========================================
          const pagination =
            withdrawalResponse.data.pagination;

          if (pagination) {
            setTotalPages(
              pagination.totalPages || 1
            );
          }
        }
      } catch (error) {
        console.error(
          "Failed to fetch withdrawal data:",
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.message ||
            "Unable to fetch withdrawal requests."
        );
      } finally {
        if (showLoading) {
          setIsLoading(false);
        }
      }
    },
    [currentPage]
  );

  // ==========================================
  // INITIAL FETCH + PAGE CHANGE
  // ==========================================
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ==========================================
  // REFRESH WHEN WITHDRAWAL IS SUBMITTED
  // ==========================================
  useEffect(() => {
    if (refreshKey > 0) {
      // Go back to page 1 after a new withdrawal
      setCurrentPage(1);
    }
  }, [refreshKey]);

  // ==========================================
  // AUTO REFRESH EVERY 10 SECONDS
  // ==========================================
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData(false);
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchData]);

  // ==========================================
  // FORMAT DATE + TIME
  // ==========================================
  const formatDateTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-NG", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ==========================================
  // GO TO NEXT PAGE
  // ==========================================
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((previousPage) => previousPage + 1);
    }
  };

  // ==========================================
  // GO TO PREVIOUS PAGE
  // ==========================================
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((previousPage) => previousPage - 1);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (isLoading) {
    return (
      <div className="bg-white p-5 rounded-xl border mb-6">
        <h3 className="font-medium mb-4">
          Withdrawal Requests
        </h3>

        <p className="text-sm text-textGray">
          Loading withdrawal requests...
        </p>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================
  if (error) {
    return (
      <div className="bg-white p-5 rounded-xl border mb-6">
        <h3 className="font-medium mb-4">
          Withdrawal Requests
        </h3>

        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl border mb-6">

      {/* HEADER */}
      <h3 className="font-medium mb-4">
        Withdrawal Requests
      </h3>

      {/* ==========================================
          NO WITHDRAWALS
      ========================================== */}
      {withdrawals.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm text-gray-400">
            No withdrawal requests yet.
          </p>
        </div>
      ) : (
        <>
          {/* ==========================================
              WITHDRAWAL LIST
          ========================================== */}
          <div className="space-y-3">

            {withdrawals.map((item) => {
              const status =
                item.status?.toLowerCase();

              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
                >

                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-3">

                    {/* STATUS ICON */}
                    <div
                      className={`p-2 rounded-full ${
                        status === "pending"
                          ? "bg-bgPending text-pending"
                          : status === "completed"
                          ? "bg-bgCompleted text-completed"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {status === "pending" ? (
                        <Clock size={16} />
                      ) : (
                        <CheckCircle size={16} />
                      )}
                    </div>

                    {/* TEXT */}
                    <div>

                      <p className="text-sm font-medium">
                        Withdrawal to{" "}
                        {bankName || "Bank Account"}
                      </p>

                      {/* DATE + TIME */}
                      <p className="text-xs text-gray-400">
                        {formatDateTime(
                          item.createdAt
                        )}
                      </p>

                    </div>

                  </div>

                  {/* RIGHT SIDE */}
                  <div className="text-right">

                    {/* AMOUNT */}
                    <p className="font-medium">
                      ₦
                      {(
                        item.amountRequestedInt / 100
                      ).toLocaleString("en-NG")}
                    </p>

                    {/* STATUS */}
                    <StatusBadge
                      status={status}
                    />

                  </div>

                </div>
              );
            })}

          </div>

          {/* ==========================================
              PAGINATION
          ========================================== */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-5">

              {/* PREVIOUS */}
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={16} />
              </button>

              {/* PAGE NUMBER */}
              <span className="text-xs text-gray-500">
                Page {currentPage} of {totalPages}
              </span>

              {/* NEXT */}
              <button
                type="button"
                onClick={handleNextPage}
                disabled={
                  currentPage === totalPages
                }
                className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronRight size={16} />
              </button>

            </div>
          )}
        </>
      )}

    </div>
  );
};

export default WithdrawalRequests;
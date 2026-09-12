import axios from "axios";
import { useEffect, useState } from "react";
import BalanceCard from "./BalanceCard";

const TRANSACTIONS_API =
  "https://skillzonet-backend-auth-v1.onrender.com/api/wallet/transactions";

const WalletSummary = () => {
  const [balance, setBalance] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);
  const [thisMonthEarnings, setThisMonthEarnings] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH WALLET SUMMARY
  // ==========================================
  const fetchWalletData = async () => {
    try {
      setIsLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in.");
        return;
      }

      const response = await axios.get(
        TRANSACTIONS_API,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("=================================");
      console.log("💰 WALLET API RESPONSE");
      console.log("=================================");

      console.log(
        JSON.stringify(response.data, null, 2)
      );

      // ==========================================
      // CHECK API SUCCESS
      // ==========================================
      if (!response.data?.success) {
        setError(
          response.data?.message ||
            "Unable to load wallet information."
        );

        return;
      }

      // ==========================================
      // GET WALLET SUMMARY
      // ==========================================
      const walletSummary =
        response.data?.data?.walletSummary;

      console.log(
        "💰 WALLET SUMMARY:",
        walletSummary
      );

      if (!walletSummary) {
        setError("Wallet summary was not returned.");
        return;
      }

      // ==========================================
      // BACKEND RETURNS AMOUNTS IN KOBO
      // ==========================================

      const availableBalance =
        Number(walletSummary.balance || 0);

      const pending =
        Number(walletSummary.pendingBalance || 0);

      const monthlyEarnings =
        Number(walletSummary.thisMonthEarnings || 0);

      console.log(
        "AVAILABLE BALANCE (KOBO):",
        availableBalance
      );

      console.log(
        "PENDING BALANCE (KOBO):",
        pending
      );

      console.log(
        "THIS MONTH EARNINGS (KOBO):",
        monthlyEarnings
      );

      // ==========================================
      // CONVERT KOBO → NAIRA
      // ==========================================

      setBalance(availableBalance / 100);

      setPendingBalance(pending / 100);

      setThisMonthEarnings(monthlyEarnings / 100);

    } catch (error) {
      console.error(
        "❌ Failed to fetch wallet data:",
        error.response?.data ||
          error.message
      );

      setError(
        error.response?.data?.message ||
          "Unable to load wallet information."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // FETCH WHEN PAGE LOADS
  // ==========================================
  useEffect(() => {
    fetchWalletData();
  }, []);

  // ==========================================
  // FORMAT NAIRA
  // ==========================================
  const formatNaira = (amount) => {
    return `₦${amount.toLocaleString("en-NG", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };

  const formattedBalance =
    formatNaira(balance);

  const formattedPendingBalance =
    formatNaira(pendingBalance);

  const formattedThisMonth =
    formatNaira(thisMonthEarnings);

  return (
    <div>

      {/* ==========================================
          HEADER
      ========================================== */}
      <div className="mb-6">

        <h2 className="font-semibold text-2xl leading-8 tracking-[0.07px]">
          Wallet
        </h2>

        <p className="text-textGray font-normal text-base leading-6 tracking-[-0.31px]">
          Manage your earnings and withdrawal requests
        </p>

      </div>

      {/* ==========================================
          ERROR
      ========================================== */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      {/* ==========================================
          BALANCE CARDS
      ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        {/* AVAILABLE BALANCE */}
        <BalanceCard
          type="primary"
          title="Available Balance"
          amount={
            isLoading
              ? "Loading..."
              : formattedBalance
          }
        />

        {/* PENDING BALANCE */}
        <BalanceCard
          title="Pending Balance"
          amount={
            isLoading
              ? "Loading..."
              : formattedPendingBalance
          }
        />

        {/* THIS MONTH */}
        <BalanceCard
          title="This Month"
          amount={
            isLoading
              ? "Loading..."
              : formattedThisMonth
          }
        />

      </div>

    </div>
  );
};

export default WalletSummary;
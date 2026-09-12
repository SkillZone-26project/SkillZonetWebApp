import WalletSummary from "./WalletSummary";
import BankDetails from "./BankDetails";
import WithdrawalRequests from "./WithdrawalRequests";
import TransactionHistory from "./TransactionHistory";

const Wallet = () => {

  const [refreshKey, setRefreshKey] = useState(0);

  const handleWithdrawalSuccess = () => {
    setRefreshKey((previous) => previous + 1);
  };

  return (
    <div className="space-y-6 pt-[85px]">
        <WalletSummary
        onWithdrawalSuccess={handleWithdrawalSuccess}
      />
      <BankDetails />
      <WithdrawalRequests
        refreshKey={refreshKey}
      />
      <TransactionHistory />
    </div>
  );
};

export default Wallet;
import WalletSummary from "./WalletSummary";
import BankDetails from "./BankDetails";
import WithdrawalRequests from "./WithdrawalRequests";
import TransactionHistory from "./TransactionHistory";

const Wallet = () => {
  return (
    <div className="space-y-6 pt-[85px]">
      <WalletSummary />
      <BankDetails />
      <WithdrawalRequests />
      <TransactionHistory />
    </div>
  );
};

export default Wallet;
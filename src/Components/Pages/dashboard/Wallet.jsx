import WalletSummary from "./Wallet/WalletSummary"
import BankDetails from "./Wallet/BankDetails"
import WithdrawalRequests from "./Wallet/WithdrawalRequests"
import TransactionHistory from "./Wallet/TransactionHistory"

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
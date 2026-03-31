import BalanceCard from "./BalanceCard";

const WalletSummary = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-semibold text-2xl leading-8 tracking-[0.07px]">Wallet</h2>
        <p className=" text-textGray font-normal text-base leading-6 tracking-[-0.31px]">Manage your earnings and withdrawal requests</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <BalanceCard type="primary" title="Available Balance" amount="₦1,250,500" />
      <BalanceCard title="Pending Balance" amount="₦180,000" />
      <BalanceCard title="This Month" amount="₦3,450,000" />
    </div>

    </div>
    
  );
};

export default WalletSummary;

import HelpLayout from "../../components/help/HelpLayout";

import { helpPagesData } from "../../data/helpPagesData";

const Billing = () => {
  return (
    <HelpLayout
      data={helpPagesData.billing}
    />
  );
};

export default Billing;
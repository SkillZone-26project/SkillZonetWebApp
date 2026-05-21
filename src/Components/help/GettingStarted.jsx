import HelpLayout from "../../components/help/HelpLayout";

import { helpPagesData } from "../../data/helpPagesData";

const GettingStarted = () => {
  return (
    <HelpLayout
      data={helpPagesData.gettingStarted}
    />
  );
};

export default GettingStarted;
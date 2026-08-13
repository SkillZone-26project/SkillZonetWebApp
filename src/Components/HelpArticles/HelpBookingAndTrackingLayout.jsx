import HelpSidebar from "./HelpSidebar";
import HelpBookingAndTrackingHeader from "./HelpBookingAndTrackingHeader";
import HelpBookingAndTrackingStepRow from "./HelpBookingAndTrackingStepRow";
import HelpFooter from "./HelpFooter";

const HelpBookingAndTrackingLayout = ({ article }) => {
  return (
    <section className="max-w-[1200px] mx-auto py-8">

      <div className="grid lg:grid-cols-[230px_1fr]">

        {/* Sidebar */}

        <HelpSidebar article={article} />

        {/* Main */}

        <div className="pl-8">

          <HelpBookingAndTrackingHeader article={article} />

          <div>

            {article.steps.map((step) => (

              <HelpBookingAndTrackingStepRow
                key={step.id}
                step={step}
              />

            ))}

          </div>

          <HelpFooter />

        </div>

      </div>

    </section>
  );
};

export default HelpBookingAndTrackingLayout;
import HelpSidebar from "./HelpSidebar";
import HelpHeader from "./HelpHeader";
import HelpStepRow from "./HelpStepRow";
import HelpFooter from "./HelpFooter";

const HelpLayout = ({ article }) => {
  return (
    <section className="max-w-[1200px] mx-auto py-8">
      <div className="grid lg:grid-cols-[230px_1fr]">
        {/* Sidebar */}

        <HelpSidebar article={article} />

        {/* Main */}

        <div className="pl-8">
          <HelpHeader article={article} />

          <div>
            {article.steps.map((step) => (
              <HelpStepRow key={step.id} step={step} />
            ))}
          </div>

          <HelpFooter />
        </div>
      </div>
    </section>
  );
};

export default HelpLayout;

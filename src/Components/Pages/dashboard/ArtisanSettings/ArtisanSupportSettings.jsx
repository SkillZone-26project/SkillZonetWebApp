import { HelpCircle, FileText } from "lucide-react";

const ArtisanSupportSettings = () => {
  // 1. Updated Item component with conditional rendering for the icon
  const Item = ({ icon: Icon, title }) => (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer">
      <div className="flex items-center gap-3 text-textColor font-medium">
        {/* Only render the Icon if it exists */}
        {Icon && <Icon size={16} />}
        <span className="text-sm ">{title}</span>
      </div>
      <span className="text-textGray">›</span>
    </div>
  );

  return (
    <div className="bg-white p-5 rounded-xl border mb-6 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-bgPending text-pending">
          <HelpCircle size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-textColor">Support & Help</h3>
          <p className="text-sm text-textGray">Get help and support</p>
        </div>
      </div>

      <div className="border-t border-gray-100 mt-6 mb-10 shadow-sm "></div>

      {/* ITEMS */}
      <div className="space-y-3">
        <Item icon={HelpCircle} title="Help Center" />
        <Item icon={FileText} title="Terms of Service" />
        <Item icon={FileText} title="Privacy Policy" />
        {/* No icon prop passed here, so no icon will show */}
        <Item title="Contact Support" />
      </div>
    </div>
  );
};

export default ArtisanSupportSettings;

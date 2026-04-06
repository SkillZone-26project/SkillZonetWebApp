import { Globe } from "lucide-react";

const ArtisanPreferenceSettings = () => {
  return (
    <div className="bg-white p-5 rounded-xl border mb-6 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-bgUnread text-unread">
          <Globe size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-textColor">Preferences</h3>
          <p className="text-sm text-textGray">Customize your experience</p>
        </div>
      </div>

      {/* LINE DEMARCATION WITH SHIFT (mb-10) */}
      <div className="border-t border-gray-100 mt-6 mb-10 shadow-sm "></div>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-textColor mb-1.5 block">Language</label>
          <select className="w-full border rounded-md p-3 text-sm bg-bgGray outline-none focus:border-black cursor-pointer">
            <option>English (UK)</option>
            <option>English (US)</option>
            <option>French</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-textColor mb-1.5 block">Time Zone</label>
          <select className="w-full border rounded-md p-3 text-sm bg-bgGray outline-none focus:border-black cursor-pointer">
            <option>West African Time (WAT)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ArtisanPreferenceSettings;
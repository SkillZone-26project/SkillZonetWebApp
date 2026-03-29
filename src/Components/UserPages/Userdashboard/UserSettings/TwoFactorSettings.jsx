import { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import { Shield } from "lucide-react";

const TwoFactorSettings = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="bg-white p-5 rounded-xl border">
      {/* HEADER SECTION */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-2 rounded-md bg-bgSaved text-saved">
            <Shield size={16} />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-black">
            Two-Factor Authentication
          </h3>
           <p className="text-xs text-textGray">
          Add an extra layer of security to your account
        </p>

          </div>
          
        </div>

       
      </div>

      {/* LINE DEMARCATION */}
      <div className="border-t border-gray-100 mt-6 mb-10 -mx-5"></div>

      {/* TOGGLE SECTION */}
      <div className="flex justify-between items-center mt-8">
        <div>
          <p className="text-sm font-medium text-black">
            Enable Two-Factor Authentication
          </p>
          <p className="text-xs text-textGray">
            Protect your account with SMS or authenticator app
          </p>
        </div>

        <ToggleSwitch enabled={enabled} setEnabled={setEnabled} />
      </div>
    </div>
  );
};

export default TwoFactorSettings;

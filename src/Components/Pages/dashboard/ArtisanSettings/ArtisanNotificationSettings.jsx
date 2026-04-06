import { useState } from "react";
import ArtisanToggleSwitch from "./ArtisanToggleSwitch";
import { Bell } from "lucide-react";

const ArtisanNotificationSettings = () => {
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(true);
  const [sms, setSms] = useState(false);
  const [jobAlert, setJobAlert] = useState(true);

  // Updated Item: Removed border-b so it looks cleaner in a list
  const Item = ({ title, desc, enabled, setEnabled }) => (
    <div className="flex justify-between items-center py-3">
      <div>
        <p className="text-sm font-medium text-textColor">{title}</p>
        <p className="text-xs text-textGray">{desc}</p>
      </div>
      <ArtisanToggleSwitch enabled={enabled} setEnabled={setEnabled} />
    </div>
  );

  return (
    <div className="bg-white p-5 rounded-xl border mb-6 shadow-sm">
      {/* Header Section */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-bgActive text-active">
          <Bell size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-textColor">Notifications</h3>
          <p className="text-sm text-textGray">
            Manage how you receive notifications
          </p>
        </div>
      </div>

      {/* LINE DEMARCATION WITH SHIFT (mb-10) */}
      <div className="border-t border-gray-100 mt-6 mb-10 shadow-sm "></div>

      {/* List of Notification Toggles */}
      <div className="space-y-2">
        <Item
          title="Email Notifications"
          desc="Receive notifications via email"
          enabled={email}
          setEnabled={setEmail}
        />
        <Item
          title="Push Notifications"
          desc="Receive push notifications on your device"
          enabled={push}
          setEnabled={setPush}
        />
        <Item
          title="SMS Notifications"
          desc="Receive notifications via SMS"
          enabled={sms}
          setEnabled={setSms}
        />
        <Item
          title="New Job Alerts"
          desc="Get notified when new job requests arrive"
          enabled={jobAlert}
          setEnabled={setJobAlert}
        />
      </div>
    </div>
  );
};

export default ArtisanNotificationSettings;

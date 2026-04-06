import ArtisanTwoFactorSettings from "./ArtisanTwoFactorSettings";
import ArtisanNotificationSettings from "./ArtisanNotificationSettings";
import ArtisanPasswordSettings from "./ArtisanPasswordSettings";
import ArtisanPreferenceSettings from "./ArtisanPreferenceSettings";
import ArtisanSupportSettings from "./ArtisanSupportSettings";
import ArtisanDangerZone from "./ArtisanDangerZone";

const Settings = () => {
  return (
    <div className="pt-[85px] px-4 sm:px-6">
      <div className="max-w-[848px] mx-auto w-full space-y-6">

        <div className="mb-6">
          <h1 className="font-semibold text-2xl leading-8 tracking-[0.07px]">
            Settings
          </h1>
          <p className="text-textGray font-normal text-base leading-6 tracking-[-0.31px]">
            Manage your account settings and preferences
          </p>
        </div>

        <ArtisanNotificationSettings />
        <ArtisanPasswordSettings />
        <ArtisanTwoFactorSettings />
        <ArtisanPreferenceSettings />
        <ArtisanSupportSettings />
        <ArtisanDangerZone />

      </div>
    </div>
  );
};

export default Settings;

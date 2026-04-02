import NotificationSettings from "./UserSettings/NotificationSettings"
import PasswordSettings from "./UserSettings/PasswordSettings"
import TwoFactorSettings from "./UserSettings/TwoFactorSettings"

const UserSettings = () => {
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


        <NotificationSettings />
        <PasswordSettings />
        <TwoFactorSettings />

      </div>
    </div>
  );
};

export default UserSettings;
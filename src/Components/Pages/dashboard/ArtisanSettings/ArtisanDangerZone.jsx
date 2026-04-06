import { LogOut } from "lucide-react";

const ArtisanDangerZone = () => {
  return (
    <div className="bg-white p-5 rounded-xl border border-bgDanger mb-6 shadow-sm">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-bgDanger text-textRed">
          <LogOut size={20} />
        </div>

        <div>
          <h3 className="font-semibold text-lg text-textRed">
            Danger Zone
          </h3>
          <p className="text-sm text-textGray">
            Irreversible actions
          </p>
        </div>
      </div>

      {/* LINE DEMARCATION WITH SHIFT (mb-10) */}
      <div className="border-t border-gray-100 mt-6 mb-10 shadow-sm "></div>

      {/* ACTIONS */}
      <div className="space-y-3">

        {/* Deactivate */}
        <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 text-sm font-medium text-textRed hover:bg-gray-50">
          Deactivate Account
        </button>

        {/* Delete */}
        <button className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium bg-[#D4183D] text-white hover:bg-danger">
          Delete Account Permanently
        </button>

      </div>
    </div>
  );
};

export default ArtisanDangerZone;
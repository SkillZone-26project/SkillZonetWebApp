import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ArtisanPasswordSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const newPasswordValue = watch("newPassword");

  const onSubmit = async (data) => {
    console.log("Submitting Password Change:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("Password updated successfully!");
  };

  return (
    <div className="bg-white p-5 rounded-xl border mb-6 shadow-sm">
      {/* Header Section */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-bgCompleted text-completed">
          <Lock size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-textColor">Change Password</h3>
          <p className="text-xs text-textGray">
            Update your password to keep your account secure
          </p>
        </div>
      </div>

      {/* LINE DEMARCATION WITH SHIFT (mb-10) */}
      <div className="border-t border-gray-100 mt-6 mb-10 shadow-sm "></div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* 1. Current Password */}
        <div className="space-y-1">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your current password"
              className={`w-full border rounded-md p-3 pr-10 text-sm bg-bgGray outline-none transition-all ${
                errors.currentPassword ? "border-red-500 ring-1 ring-red-100" : "border-gray-200 focus:border-black"
              }`}
              {...register("currentPassword", { required: "Current password is required" })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-textGray hover:text-gray-600"
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-[10px] text-textGray font-medium ml-1">{errors.currentPassword.message}</p>
          )}
        </div>

        {/* 2. New Password (STRONG VALIDATION) */}
        <div className="space-y-1">
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your new password"
              className={`w-full border rounded-md p-3 pr-10 text-sm bg-bgGray outline-none transition-all ${
                errors.newPassword ? "border-red-500 ring-1 ring-red-100" : "border-gray-200 focus:border-black"
              }`}
              {...register("newPassword", { 
                required: "New password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters long" },
                validate: {
                  hasUpper: (v) => /[A-Z]/.test(v) || "Must include an uppercase letter",
                  hasLower: (v) => /[a-z]/.test(v) || "Must include a lowercase letter",
                  hasNumber: (v) => /[0-9]/.test(v) || "Must include a number",
                  hasSymbol: (v) => /[^A-Za-z0-9]/.test(v) || "Must include a special character (@$!%*?&)"
                }
              })}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-3 text-textGray hover:text-gray-600"
            >
              {showNewPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-[10px] text-textGray font-medium ml-1">{errors.newPassword.message}</p>
          )}
        </div>

        {/* 3. Confirm Password */}
        <div className="space-y-1">
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              className={`w-full border rounded-md p-3 pr-10 text-sm bg-bgGray outline-none transition-all ${
                errors.confirmPassword ? "border-red-500 ring-1 ring-red-100" : "border-gray-200 focus:border-black"
              }`}
              {...register("confirmPassword", { 
                required: "Please confirm your password",
                validate: (value) => value === newPasswordValue || "Passwords do not match"
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-textGray hover:text-gray-600"
            >
              {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-[10px] text-textGray font-medium ml-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-3 rounded-md text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-[0.98] disabled:bg-gray-400"
        >
          <Lock size={16} /> 
          {isSubmitting ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ArtisanPasswordSettings;

import axios from "axios";
import { useEffect, useState } from "react";

const API_URL =
  "https://skillzonet-backend-auth-v1.onrender.com/api/wallet/bank-details";

const BankDetails = () => {
  // Bank details from backend
  const [bankDetails, setBankDetails] = useState(null);

  // Form data
  const [formData, setFormData] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    bankCode: "",
  });

  // UI states
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // GET BANK DETAILS
  // ==========================================
  const fetchBankDetails = async () => {
    try {
      setIsLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in. Please log in again.");
        return;
      }

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const data = response.data.data;

        // Save backend data
        setBankDetails(data);

        // Populate form
        setFormData({
          accountName: data?.accountName || "",
          accountNumber: data?.accountNumber || "",
          bankName: data?.bankName || "",
          bankCode: data?.bankCode || "",
        });
      }
    } catch (error) {
      console.error(
        "Failed to fetch bank details:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Unable to fetch bank account details."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch bank details when component loads
  useEffect(() => {
    fetchBankDetails();
  }, []);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // ==========================================
  // OPEN EDIT FORM
  // ==========================================
  const handleEdit = () => {
    setError("");
    setSuccess("");

    if (bankDetails) {
      setFormData({
        accountName: bankDetails.accountName || "",
        accountNumber: bankDetails.accountNumber || "",
        bankName: bankDetails.bankName || "",
        bankCode: bankDetails.bankCode || "",
      });
    }

    setIsEditing(true);
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================
  const handleCancel = () => {
    setError("");
    setSuccess("");

    if (bankDetails) {
      setFormData({
        accountName: bankDetails.accountName || "",
        accountNumber: bankDetails.accountNumber || "",
        bankName: bankDetails.bankName || "",
        bankCode: bankDetails.bankCode || "",
      });
    }

    setIsEditing(false);
  };

  // ==========================================
  // UPDATE BANK DETAILS
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Basic validation
    if (
      !formData.accountName.trim() ||
      !formData.accountNumber.trim() ||
      !formData.bankName.trim() ||
      !formData.bankCode.trim()
    ) {
      setError("Please fill in all bank details.");
      return;
    }

    // Account number validation
    if (!/^\d{10}$/.test(formData.accountNumber)) {
      setError("Account number must contain exactly 10 digits.");
      return;
    }

    try {
      setIsSaving(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in. Please log in again.");
        return;
      }

      const response = await axios.put(
        API_URL,
        {
          accountName: formData.accountName.trim(),
          accountNumber: formData.accountNumber.trim(),
          bankName: formData.bankName.trim(),
          bankCode: formData.bankCode.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const updatedData = response.data.data;

        // Update displayed bank details
        setBankDetails(updatedData);

        // Update form
        setFormData({
          accountName: updatedData.accountName || "",
          accountNumber: updatedData.accountNumber || "",
          bankName: updatedData.bankName || "",
          bankCode: updatedData.bankCode || "",
        });

        // Show success message
        setSuccess(
          response.data.message ||
            "Bank details updated successfully."
        );

        // Close edit form
        setIsEditing(false);

        // ==========================================
        // REMOVE SUCCESS MESSAGE AFTER 3 SECONDS
        // ==========================================
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      }
    } catch (error) {
      console.error(
        "Failed to update bank details:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Unable to update bank details. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (isLoading) {
    return (
      <div className="bg-white p-5 rounded-xl border mb-6">
        <div className="flex justify-between mb-4">
          <h3 className="font-medium">
            Bank Account Details
          </h3>
        </div>

        <div className="bg-bgGray p-5 rounded-lg">
          <p className="text-sm text-textGray">
            Loading bank details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl border mb-6">

      {/* ==========================================
          HEADER
      ========================================== */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">
          Bank Account Details
        </h3>

        {!isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            className="text-sm border px-3 py-1 rounded-md text-textColor hover:bg-gray-50 transition"
          >
            Edit Details
          </button>
        )}
      </div>

      {/* ==========================================
          ERROR MESSAGE
      ========================================== */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      {/* ==========================================
          SUCCESS MESSAGE
      ========================================== */}
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-600 text-sm p-3 rounded-md">
          {success}
        </div>
      )}

      {/* ==========================================
          EDIT FORM
      ========================================== */}
      {isEditing ? (
        <form onSubmit={handleSubmit}>

          <div className="bg-bgGray p-4 rounded-lg space-y-4">

            {/* Account Name */}
            <div>
              <label className="block text-xs text-textGray mb-1">
                Account Name
              </label>

              <input
                type="text"
                name="accountName"
                value={formData.accountName}
                onChange={handleChange}
                placeholder="Enter account name"
                className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-black"
              />
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-xs text-textGray mb-1">
                Account Number
              </label>

              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Enter account number"
                maxLength={10}
                inputMode="numeric"
                className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-black"
              />
            </div>

            {/* Bank Name */}
            <div>
              <label className="block text-xs text-textGray mb-1">
                Bank Name
              </label>

              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                placeholder="Enter bank name"
                className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-black"
              />
            </div>

            {/* Bank Code */}
            <div>
              <label className="block text-xs text-textGray mb-1">
                Bank Code
              </label>

              <input
                type="text"
                name="bankCode"
                value={formData.bankCode}
                onChange={handleChange}
                placeholder="Enter bank code e.g. 058"
                className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-black"
              />
            </div>

          </div>

          {/* ==========================================
              FORM BUTTONS
          ========================================== */}
          <div className="flex justify-end gap-3 mt-4">

            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="text-sm border border-gray-200 px-4 py-2 rounded-md text-textColor hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>
      ) : (
        <>
          {/* ==========================================
              BANK DETAILS
          ========================================== */}
          <div className="grid md:grid-cols-3 gap-4 bg-bgGray p-4 rounded-lg">

            {/* Bank Name */}
            <div>
              <p className="text-xs text-textGray">
                Bank Name
              </p>

              <p className="font-medium">
                {bankDetails?.bankName || "****"}
              </p>
            </div>

            {/* Account Number */}
            <div>
              <p className="text-xs text-textGray">
                Account Number
              </p>

              <p className="font-medium">
                {bankDetails?.accountNumber || "****"}
              </p>
            </div>

            {/* Account Name */}
            <div>
              <p className="text-xs text-textGray">
                Account Name
              </p>

              <p className="font-medium">
                {bankDetails?.accountName || "****"}
              </p>
            </div>

          </div>

          {/* ==========================================
              NOTE
          ========================================== */}
          <div className="mt-4 text-xs text-textBlue bg-[#EFF6FF] p-3 rounded-md">
            <span className="font-bold">Note:</span>{" "}
            All withdrawals are processed manually by our admin
            team. Funds will be transferred to your registered bank
            account within 24-48 hours of approval.
          </div>
        </>
      )}

    </div>
  );
};

export default BankDetails;
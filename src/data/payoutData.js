export const payoutData = {
  balance: {
    amount: 4500,
    currency: "₦",
    status: "Available",
  },

  destination: {
    bankName: "GTBank",
    accountNumber: "0123456789",
    accountHolder: "FELIX JOHN UNIGOR",
  },

  withdrawal: {
    minimum: 1000,
    maximum: 4500,
  },

  banks: [
    {
      value: "gtbank",
      label: "Guaranty Trust Bank",
      code: "058",
    },
    {
      value: "access",
      label: "Access Bank",
      code: "044",
    },
    {
      value: "firstbank",
      label: "First Bank",
      code: "011",
    },
  ],

  terms: {
    title: "Payout Terms & Conditions",
    description:
      "I agree to the Payout Terms & Conditions and confirm that standard processing fees apply.",
  },

  messages: {
    payoutDescription: "Withdraw funds to your verified bank account",

    bankRequirement:
      "Your bank account name must strictly match the full name on your profile. Mismatched account details will cause payment failures.",

    accountHolderHint: "Must match your registered profile name",

    bankDetailsReminder: "Need to update bank account details?",

    backToPayout: "Done updating?",
  },

  labels: {
    // requestPayout: "Request Payout",
    // bankDetails: "Bank Details",
    withdrawableBalance: "Withdrawable Balance",
    available: "Available",
    payoutDestination: "Payout Destination",
    withdrawalAmount: "Withdrawal Amount (₦)",
    importantRequirement: "Important Requirement",
    bankName: "Bank Name",
    bankCode: "Bank Code",
    accountNumber: "Account Number (NUBAN)",
    accountHolderName: "Account Holder Name",
    submitPayout: "Submit Payout Request",
    saveBankDetails: "Save & Update Bank Details",
  },

  placeholders: {
    withdrawalAmount: "₦ 0.00",
    bankCode: "e.g. 058",
    accountNumber: "10-digit account number",
    accountHolderName: "FELIX AKPEME UNIGOR",
  },
};

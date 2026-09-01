// contractDisputeData.js

export const DISPUTE_FORM_CONFIG = {
  // Global settings
  maxPhotos: 5,
  maxFileSizeMB: 10,
  allowedFileTypes: "image/png, image/jpeg",

  // Text content and copy
  labels: {
    title: "Raise Contract Dispute",
    subtitle:
      "Submit your complaint along with up to 5 supporting image proofs",
    contractId: "Contract ID",
    reasonLabel: "Reason for Dispute",
    uploadLabel: "Upload Evidence Photos",
    uploadTitle: "Upload image files",
    uploadSubtitle: "(JPG, PNG up to 10MB each)",
    submitBtn: "Submit Dispute",
    submittingBtn: "Submitting Dispute...",
  },

  // Field placeholders
  placeholders: {
    reason: "Describe the issues with work or contract terms...",
  },

  // Input validation criteria and error messaging
  validation: {
    reason: {
      required: "Please provide a detailed description of the dispute",
      minLength: {
        value: 10,
        message: "Description must be at least 10 characters long",
      },
    },
  },

  // Alert and system notices
  alerts: {
    maxPhotosExceeded: (max) =>
      `You can only upload up to ${max} supporting photos.`,
    fileTooLarge: (filename, max) => `${filename} exceeds the ${max}MB limit.`,
    success: "Dispute submitted successfully!",
  },
};

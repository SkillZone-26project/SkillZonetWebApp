// contractData.js

export const contractInfo = {
  trackingId: "#JOB-2026-6691",
  projectId: "SZ-2026-0286991",
  status: "AGREED_ESCROW_LOCKED", // Active state toggle anchor

  artisan: {
    name: "David Nwosu",
  },

  client: {
    name: "Sarah Jenkins",
  },

  payment: {
    labourCost: 150000, // Adjusted to numeric standard mapping format for .toLocaleString()
    materialCost: 0,
    logisticsCost: 0,
    totalProjectValue: 150000,
  },

  settlement: {
    accountName: "David Nwosu",
    bankName: "Access Bank",
    accountMask: "••••••",
    accountEnding: "9912",
  },
};

export const labourAdjustments = [
  "Keep Original Agreed Booking Labor ($150.00)",
  "Increase Labor Cost",
  "Reduce Labor Cost",
];

export const materialOptions = [
  "No, labor only (materials supplied or not needed)",
  "Yes, artisan will supply materials",
];

export const contractTerms = [
  {
    title: "PURPOSE & FIELD SCOPE VERIFICATION",
    body: "This binding covenant is established between the Client and the assigned Artisan following a physical on-site assessment.",
  },
  {
    title: "OPERATIONAL EXECUTION SCHEDULE",
    body: "Project execution begins after assessment approval and escrow confirmation.",
  },
  {
    title: "TRIPARTITE PLATFORM INDEMNIFICATION CLAUSE",
    body: "The platform provides escrow mediation and maintains financial neutrality until project completion.",
  },
];

export const agreementSections = [
  {
    id: 1,
    title: "Scope of Work",
    body: "The Artisan shall conduct a complete on-site assessment, purchase approved materials, execute the installation according to the agreed specifications, perform quality assurance and final inspections, deliver the completed project, and obtain the client's final acceptance. Any work outside the approved scope requires the client's prior written approval.",
  },
  {
    id: 2,
    title: "Verification Requirements",
    body: "Verification for each milestone shall include site verification photographs, existing condition documentation, an approved material list, a risk assessment where applicable, and all other required supporting documents to confirm successful completion.",
  },
  {
    id: 3,
    title: "Payment Terms",
    body: "All project funds shall be securely held in the secured Deposit wallet. Payments will be released only after the corresponding milestone has been completed, all verification requirements have been satisfied, and the client has reviewed and approved the completed work.",
  },
  {
    id: 4,
    title: "Change Order Policy",
    body: "Any Modification involving additional labor, materials, or timeline extension must be submitted as a contract amendment and approved by the client. No verbal agreements are recognized.",
  },
  {
    id: 5,
    title: "Client Responsibilities",
    body: "The client shall provide timely access to the project site, respond promptly to approval requests, review all submitted photographs and verification documents, complete inspections within the required review period, and communicate any questions or concerns through the SkillZonet platform.",
  },
  {
    id: 6,
    title: "Artisan Responsibilities",
    body: "The Artisans shall perform all work professionally and within the agreed timeline, comply with all SkillZonet policies and platform guidelines, upload all required documentation and evidence, maintain timely communication through the SkillZonet platform, and ensure all work meets the approved specifications and quality standards.",
  },
  {
    id: 7,
    title: "Digital Acceptance",
    body: "By proceeding, both parties acknowledge that they have read, understood, and agreed to the terms of this agreement and the SkillZonet Terms of Service.",
  },
];

export const contractStatusConfig = {
  DRAFT: {
    label: "Draft",
    description: "Contract draft is ready for submission.",
    userActions: ["cancel_contract"],
    artisanActions: ["submit_contract", "cancel_contract"],
  },

  SUBMITTED_TO_CLIENT: {
    label: "Submitted to Client",
    description: "Contract is awaiting client review.",
    userActions: ["accept_contract", "request_revision", "cancel_contract"],
    artisanActions: [],
  },

  REVISION_REQUESTED: {
    label: "Revision Requested",
    description: "Client has requested changes to the contract.",
    userActions: ["cancel_contract"],
    artisanActions: ["resubmit_contract", "cancel_contract"],
  },

  AGREED_ESCROW_LOCKED: {
    label: "Agreed • Escrow Locked",
    description: "Contract is agreed and funds are secured in escrow.",
    userActions: [
      "complete_contract",
      "open_dispute",
      "request_installment_payment",
    ],
    artisanActions: [
      "request_signoff",
      "open_dispute",
      "request_installment_payment",
    ],
  },
  DISPUTED: {
    label: "Disputed",
    description:
      "Contract actions frozen. No contract updates or cancellations allowed.",
    userActions: ["open_dispute"],
    artisanActions: ["open_dispute"],
  },
  ON_HOLD: {
    label: "On Hold",
    description: "Contract is temporarily paused.",
    userActions: [],
    artisanActions: [],
  },

  COMPLETED: {
    label: "Completed",
    description: "Contract has been successfully completed.",
    userActions: [],
    artisanActions: [],
  },

  CANCELLED: {
    label: "Cancelled",
    description: "Contract has been cancelled.",
    userActions: [],
    artisanActions: [],
  },
};

export const CONTRACT_UPLOAD_CONFIG = {
  maxPhotos: 5,
  maxFileSizeMB: 10,
  allowedFileTypes: "image/jpeg,image/png",
  alerts: {
    maxPhotosExceeded: (maxPhotos) =>
      `You can upload a maximum of ${maxPhotos} photos.`,
    fileTooLarge: (fileName, maxFileSizeMB) =>
      `${fileName} is too large. Maximum file size is ${maxFileSizeMB}MB.`,
    invalidFileType: (fileName) =>
      `${fileName} is not a supported image type. Please upload JPG or PNG.`,
  },
};

export const contractInfo = {
  trackingId: "#JOB-2026-6691",
  projectId: "SZ-2026-0286991",

  artisan: {
    name: "David Nwosu",
  },

  client: {
    name: "Sarah Jenkins",
  },

  payment: {
    labourCost: 150,
    materialCost: 0,
    logisticsCost: 0,
    totalProjectValue: 150,
  },

  settlement: {
    accountName: "••••••••••••••••",
    bankName: "••••••••••••••••",
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
    body:
      "This binding covenant is established between the Client and the assigned Artisan following a physical on-site assessment.",
  },
  {
    title: "OPERATIONAL EXECUTION SCHEDULE",
    body:
      "Project execution begins after assessment approval and escrow confirmation.",
  },
  {
    title: "TRIPARTITE PLATFORM INDEMNIFICATION CLAUSE",
    body:
      "The platform provides escrow mediation and maintains financial neutrality until project completion.",
  },
];

export const agreementSections = [
  {
    id: 1,
    title: "Scope of Work",
    body:
      "The Artisan shall conduct a complete on-site assessment, purchase approved materials, execute the installation according to the agreed specifications, perform quality assurance and final inspections, deliver the completed project, and obtain the client's final acceptance. Any work outside the approved scope requires the client's prior written approval.",
  },
  {
    id: 2,
    title: "Verification Requirements",
    body:
      "Verification for each milestone shall include site verification photographs, existing condition documentation, an approved material list, a risk assessment where applicable, and all other required supporting documents to confirm successful completion.",
  },
  {
    id: 3,
    title: "Payment Terms",
    body:
      "All project funds shall be securely held in the secured Deposit wallet. Payments will be released only after the corresponding milestone has been completed, all verification requirements have been satisfied, and the client has reviewed and approved the completed work.",
  },
  {
    id: 4,
    title: "Change Order Policy",
    body:
      "Any Modification involving additional labor, materials, or timeline extension must be submitted as a contract amendment and approved by the client. No verbal agreements are recognized.",
  },
  {
    id: 5,
    title: "Client Responsibilities",
    body:
      "The client shall provide timely access to the project site, respond promptly to approval requests, review all submitted photographs and verification documents, complete inspections within the required review period, and communicate any questions or concerns through the SkillZonet platform.",
  },
  {
    id: 6,
    title: "Artisan Responsibilities",
    body:
      "The Artisans shall perform all work professionally and within the agreed timeline, comply with all SkillZonet policies and platform guidelines, upload all required documentation and evidence, maintain timely communication through the SkillZonet platform, and ensure all work meets the approved specifications and quality standards.",
  },
  {
    id: 7,
    title: "Digital Acceptance",
    body:
      "By proceeding, both parties acknowledge that they have read, understood, and agreed to the terms of this agreement and the SkillZonet Terms of Service.",
  },
];
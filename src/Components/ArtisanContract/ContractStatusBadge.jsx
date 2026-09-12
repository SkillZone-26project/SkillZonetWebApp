import {
  Clock3,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lock,
} from "lucide-react";

import { contractStatusConfig } from "../../data/contractData";

const ContractStatusBadge = ({ status }) => {
  const config = contractStatusConfig[status];

  if (!config) {
    return (
      <span className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-600">
        <AlertTriangle size={14} />
        Unknown Status
      </span>
    );
  }

  // Map icon component models to specific status strings
  const iconMap = {
    DRAFT: Clock3,
    SUBMITTED_TO_CLIENT: Clock3,
    REVISION_REQUESTED: AlertTriangle,
    AGREED_ESCROW_LOCKED: Lock,
    ON_HOLD: Clock3,
    COMPLETED: CheckCircle,
    CANCELLED: XCircle,
  };

  // Map distinct UI tailwind colors matching standard status guidelines
  const colorMap = {
    DRAFT: "border-gray-200 bg-gray-50 text-gray-600",
    SUBMITTED_TO_CLIENT: "border-blue-200 bg-blue-50 text-blue-600",
    REVISION_REQUESTED: "border-[#C78A35] bg-[#FEF6D8] text-[#B6701C]",
    AGREED_ESCROW_LOCKED: "border-emerald-200 bg-emerald-50 text-emerald-700",
    ON_HOLD: "border-amber-200 bg-amber-50 text-amber-600",
    COMPLETED: "border-green-200 bg-green-50 text-green-700",
    CANCELLED: "border-red-200 bg-red-50 text-red-600",
  };

  const Icon = iconMap[status] || Clock3;
  const colorClasses =
    colorMap[status] || "border-gray-300 bg-gray-100 text-gray-600";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${colorClasses}`}
    >
      <Icon size={14} className="shrink-0" />
      {config.label}
    </span>
  );
};

export default ContractStatusBadge;

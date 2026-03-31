import { MessageCircle, StarIcon, Clock, User } from "lucide-react";

const stats = [
  {
    title: "Active Jobs",
    value: 2,
    icon: Clock,
    color: "text-active",
    bg: "bg-bgActive",
  },

  {
    title: "Completed",
    value: 1,
    icon: StarIcon,
    color: "text-completed",
    bg: "bg-bgCompleted",
  },
  
  {
    title: "Saved Artisan",
    value: 5,
    icon: User,
    color: "text-saved",
    bg: "bg-bgSaved",
  },
  
  {
    title: "Unread Messages",
    value: 3,
    icon: MessageCircle,
    color: "text-unread",
    bg: "bg-bgUnread",
  },
];

const UserMyBookingStats = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-white border rounded-xl p-4 flex items-center gap-3"
          >
            {/* ICON */}
            <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
              <Icon size={18} />
            </div>

            {/* TEXT */}
            <div>
              <p className="text-lg font-semibold text-textColor">{item.value}</p>
              <p className="text-xs text-textGray">{item.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserMyBookingStats;
import { MapPin, Clock, Star, Calendar } from "lucide-react";

const STATUS_COLORS = {
  booked: "bg-pink text-white", 
  progress: "bg-yellow text-white",
  completed: "bg-iconGreen text-white",
  default: "bg-gray-100 text-gray-700"
};

const UserMyBookingsCard = ({ item }) => {
  const statusKey = item.status?.toLowerCase();
  const badgeStyle = STATUS_COLORS[statusKey] || STATUS_COLORS.default;

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-start gap-3 sm:gap-4 shadow-sm hover:shadow-md transition-shadow">
      
      {/* Avatar */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden p-0.5 shrink-0 bg-white">
        <img 
          src={item.avatar || `https://ui-avatars.com{item.user}`} 
          alt={item.user} 
          className="w-full h-full object-cover rounded-full" 
        />
      </div>

      <div className="flex-1 min-w-0">
        {/* TOP ROW: Added gap-2 to keep distance between Title and Badge */}
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-gray-900 leading-tight truncate">
              Plumbing - {item.title}
            </h4>
            <p className="text-xs text-gray-400 mt-0.5 truncate">{item.user}</p>
          </div>
          
          <div className="text-right shrink-0">
            <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${badgeStyle}`}>
              {item.status}
            </span>
            <p className="text-sm sm:text-lg font-bold text-gray-900 mt-0.5 sm:mt-1">
              ₦{item.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* DETAILS ROW: Removed ml-auto so MapPin stays with the group */}
        <div className="flex items-center gap-3 sm:gap-4 mt-3 text-textGray text-[10px] sm:text-[11px]">
          <div className="flex items-center gap-1 shrink-0">
            <Calendar size={13} className="text-textGray" />
            <span className="whitespace-nowrap">{item.date}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Clock size={13} className="text-textGray" />
            <span className="whitespace-nowrap">{item.time}</span>
          </div>
          <div className="flex items-center gap-1 min-w-0">
            <MapPin size={13} className="text-textGray shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
        </div>

        {item.status?.toLowerCase() === "completed" && (
          <div className="flex justify-end mt-4">
            <button className="flex items-center gap-1.5 text-[11px] font-bold text-textColor border border-gray-200 rounded-lg px-4 py-1.5 hover:bg-gray-50 transition-colors">
              <Star size={12} /> Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMyBookingsCard;

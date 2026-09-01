import { NavLink } from "react-router-dom";
import { Mail, MessageCircle } from "lucide-react";

const HelpSidebar = ({ article }) => {
  return (
    <aside className="border-r border-gray-200 pr-8 flex flex-col gap-24">
      {/* Category */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-5">
          {article.category}
        </h3>

        <div className="space-y-2">
          {article.sidebarLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) => `
                block rounded-lg px-3 py-2.5 text-sm transition-all
                ${
                  isActive
                    ? "bg-[#EEF4FF] text-[#2563EB] font-medium"
                    : "text-gray-400 hover:text-gray-700"
                }
                `}
            >
              {link.title}
            </NavLink>
          ))}
        </div>
      </div>

      {/* HELP CARD */}

      <div className="rounded-[5px] border border-gray-200 bg-[#DBEAFE2B] p-3 shadow-[0px_2px_8px_0px_#0000001A]">
        <h4 className="text-sm font-semibold text-gray-900">
          Still need help?
        </h4>

        <p className="text-xs text-gray-500 mt-2 leading-5">
          Our support team is available 24/7 to assist you.
        </p>

        <div className="mt-6 space-y-6 mb-2">
          <button className="w-full h-11 flex items-center gap-3 px-3 hover:bg-gray-50 transition">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <Mail size={16} className="text-purple-600" />
            </div>

            <span className="text-sm">Email Support</span>
          </button>

          <button className="w-full h-11 flex items-center gap-3 px-3 hover:bg-gray-50 transition">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <MessageCircle size={16} className="text-orange-500" />
            </div>

            <span className="text-sm">Chat Support</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default HelpSidebar;
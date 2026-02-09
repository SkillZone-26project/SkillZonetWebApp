import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-[240px] bg-black text-white min-h-screen p-6">
      
      <h2 className="text-xl font-bold mb-8">SkillZonet</h2>

      <nav className="space-y-4">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? "bg-white text-black" : "hover:bg-gray-800"
            }`
          }
        >
          Overview
        </NavLink>

        <NavLink
          to="/dashboard/orders"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? "bg-white text-black" : "hover:bg-gray-800"
            }`
          }
        >
          Orders
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? "bg-white text-black" : "hover:bg-gray-800"
            }`
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;

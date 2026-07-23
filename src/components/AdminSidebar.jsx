import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaUsers,
  FaWallet,
  FaExchangeAlt,
  FaChartLine,
  FaFileAlt,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaUniversity,
  FaTimes,
} from "react-icons/fa";

const navItems = [
  {
    label: "Dashboard",
    icon: FaChartPie,
    to: "/admin",
  },
  {
    label: "Users",
    icon: FaUsers,
    to: "/admin/users",
  },
  {
    label: "Accounts",
    icon: FaWallet,
    to: "/admin/accounts",
  },
  {
    label: "Transactions",
    icon: FaExchangeAlt,
    to: "/admin/transactions",
  },
  {
    label: "Analytics",
    icon: FaChartLine,
    to: "/admin/analytics",
  },
  {
    label: "Reports",
    icon: FaFileAlt,
    to: "/admin/reports",
  },
  {
    label: "Logs",
    icon: FaClipboardList,
    to: "/admin/logs",
  },
  {
    label: "Settings",
    icon: FaCog,
    to: "/admin/settings",
  },
];

function AdminSidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-slate-950 transition-transform duration-300 lg:static lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}

      <div className="flex items-center justify-between border-b border-slate-800 p-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-yellow-400 p-3">

            <FaUniversity className="text-xl text-slate-900" />

          </div>

          <div>

            <h1 className="text-xl font-bold text-white">
              ESM Bank
            </h1>

            <p className="text-sm text-slate-400">
              Admin Panel
            </p>

          </div>

        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
        >
          <FaTimes />
        </button>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-5">

        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  isActive
                    ? "bg-yellow-400 font-semibold text-slate-900"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon className="text-lg" />

              {item.label}
            </NavLink>
          );
        })}

      </nav>

      {/* Admin Info */}

      <div className="border-t border-slate-800 p-6">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-slate-900">

            E

          </div>

          <div>

            <h3 className="font-semibold text-white">
              Esme Vera
            </h3>

            <p className="text-sm text-slate-400">
              Super Admin
            </p>

          </div>

        </div>

        <button
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          <FaSignOutAlt />

          Logout
        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;
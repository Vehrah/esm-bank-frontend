import { FaChartPie, FaUsers, FaWallet, FaExchangeAlt, FaCog, FaHome, FaTimes } from "react-icons/fa";

// Sidebar navigation links for the admin dashboard.
const navItems = [
  { label: "Overview", icon: FaHome, href: "#overview" },
  { label: "Users", icon: FaUsers, href: "#users" },
  { label: "Accounts", icon: FaWallet, href: "#accounts" },
  { label: "Transactions", icon: FaExchangeAlt, href: "#transactions" },
  { label: "Settings", icon: FaCog, href: "#settings" },
];

function AdminSidebar({ isOpen, onClose }) {
  // Sidebar is hidden on small screens and toggled via the hamburger icon.
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-80 transform overflow-y-auto border-r border-slate-200 bg-white px-6 pb-10 pt-8 shadow-xl shadow-slate-900/5 transition duration-300 dark:border-slate-800 dark:bg-slate-950 lg:static lg:translate-x-0 lg:shadow-none ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            FinEdge Admin
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Modern banking control center
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:text-white lg:hidden"
          aria-label="Close sidebar"
        >
          <FaTimes className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-10 space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </a>
          );
        })}
      </div>

      <div className="mt-12 rounded-3xl bg-slate-100 p-5 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
        <p className="text-sm font-semibold">Admin Insights</p>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
          Review users, transfers, and balances across the platform in one central space.
        </p>
      </div>
    </aside>
  );
}

export default AdminSidebar;

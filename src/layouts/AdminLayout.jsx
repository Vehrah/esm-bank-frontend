import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaChartPie,
  FaUsers,
  FaExchangeAlt,
  FaChartLine,
  FaLock,
  FaFileAlt,
  FaHistory,
  FaCog,
  FaSignOutAlt,
  FaUniversity,
} from "react-icons/fa";

export default function AdminLayout() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: <FaChartPie />, path: "/admin/dashboard" },
    { name: "Users", icon: <FaUsers />, path: "/admin/users" },
    { name: "Transactions", icon: <FaExchangeAlt />, path: "/admin/transactions" },
    { name: "Analytics", icon: <FaChartLine />, path: "/admin/analytics" },
    { name: "Accounts", icon: <FaLock />, path: "/admin/accounts" },
    { name: "Reports", icon: <FaFileAlt />, path: "/admin/reports" },
    { name: "Logs", icon: <FaHistory />, path: "/admin/logs" },
    { name: "Settings", icon: <FaCog />, path: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <aside className="w-72 bg-slate-900 text-white">
        <div className="border-b border-slate-700 p-6">
          <div className="flex items-center gap-3">
            <FaUniversity className="text-3xl text-yellow-400" />
            <div>
              <h1 className="text-xl font-bold">ESM BANK</h1>
              <p className="text-sm text-slate-400">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="mt-6">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`mx-3 mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                location.pathname === item.path
                  ? "bg-yellow-400 font-semibold text-slate-900"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 w-72 px-3">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold transition hover:bg-red-700">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-slate-50/70 p-8 dark:bg-slate-950/70">
        <Outlet />
      </main>
    </div>
  );
}
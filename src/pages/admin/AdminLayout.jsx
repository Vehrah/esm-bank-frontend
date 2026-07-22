import { Outlet, Link } from "react-router-dom";
import {
  FaChartPie,
  FaUsers,
  FaWallet,
  FaExchangeAlt,
  FaChartLine,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white">

        <div className="p-6 text-2xl font-bold border-b border-slate-700">
          RiaBank Admin
        </div>

        <nav className="mt-6 space-y-2 px-4">

          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
          >
            <FaChartPie />
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
          >
            <FaUsers />
            Users
          </Link>

          <Link
            to="/admin/accounts"
            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
          >
            <FaWallet />
            Accounts
          </Link>

          <Link
            to="/admin/transactions"
            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
          >
            <FaExchangeAlt />
            Transactions
          </Link>

          <Link
            to="/admin/analytics"
            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
          >
            <FaChartLine />
            Analytics
          </Link>

          <Link
            to="/admin/reports"
            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
          >
            <FaFileAlt />
            Reports
          </Link>

          <Link
            to="/admin/settings"
            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
          >
            <FaCog />
            Settings
          </Link>

        </nav>

        <button className="absolute bottom-6 left-4 flex items-center gap-3 rounded-lg bg-red-600 px-4 py-3 hover:bg-red-700">
          <FaSignOutAlt />
          Logout
        </button>

      </aside>

      {/* Main Content */}

      <main className="flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
}
import { useEffect, useState } from "react";
import axios from "axios";
import AnalyticsCharts from "../../components/AnalyticsCharts";
import { Link, useNavigate } from "react-router-dom";
import { FaSyncAlt } from "react-icons/fa";

export default function Analytics() {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get("/api/admin/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAnalytics(res.data);

    } catch (err) {
      console.log(err);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-semibold">
          Loading Analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Analytics</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Monitor your bank performance in real time.</p>
        </div>

        <button onClick={fetchAnalytics} className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
          <FaSyncAlt />
          Refresh
        </button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Users</p>
          <h2 className="mt-2 text-3xl font-semibold">{analytics.totalUsers ?? 0}</h2>
        </div>

        <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Transactions</p>
          <h2 className="mt-2 text-3xl font-semibold">{analytics.totalTransactions ?? 0}</h2>
        </div>

        <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 p-6 shadow dark:border-emerald-900/40 dark:bg-emerald-950/40">
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Total Deposits</p>
          <h2 className="mt-2 text-3xl font-semibold text-emerald-700 dark:text-emerald-300">${Number(analytics.totalDeposits || 0).toLocaleString()}</h2>
        </div>

        <div className="rounded-[22px] border border-rose-200 bg-rose-50 p-6 shadow dark:border-rose-900/40 dark:bg-rose-950/40">
          <p className="text-sm text-rose-600 dark:text-rose-400">Total Withdrawals</p>
          <h2 className="mt-2 text-3xl font-semibold text-rose-700 dark:text-rose-300">${Number(analytics.totalWithdrawals || 0).toLocaleString()}</h2>
        </div>

        <div className="rounded-[22px] border border-sky-200 bg-sky-50 p-6 shadow dark:border-sky-900/40 dark:bg-sky-950/40">
          <p className="text-sm text-sky-600 dark:text-sky-400">Total Transfers</p>
          <h2 className="mt-2 text-3xl font-semibold text-sky-700 dark:text-sky-300">${Number(analytics.totalTransfers || 0).toLocaleString()}</h2>
        </div>

        <div className="rounded-[22px] border border-violet-200 bg-violet-50 p-6 shadow dark:border-violet-900/40 dark:bg-violet-950/40">
          <p className="text-sm text-violet-600 dark:text-violet-400">Bank Balance</p>
          <h2 className="mt-2 text-3xl font-semibold text-violet-700 dark:text-violet-300">${Number(analytics.bankBalance || 0).toLocaleString()}</h2>
        </div>

        <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 p-6 shadow dark:border-emerald-900/40 dark:bg-emerald-950/40">
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Successful Transactions</p>
          <h2 className="mt-2 text-3xl font-semibold text-emerald-700 dark:text-emerald-300">{analytics.successfulTransactions ?? 0}</h2>
        </div>

        <div className="rounded-[22px] border border-amber-200 bg-amber-50 p-6 shadow dark:border-amber-900/40 dark:bg-amber-950/40">
          <p className="text-sm text-amber-700 dark:text-amber-400">Failed Transactions</p>
          <h2 className="mt-2 text-3xl font-semibold text-amber-800 dark:text-amber-300">{analytics.failedTransactions ?? 0}</h2>
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <button className="rounded-2xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700" onClick={() => navigate("/admin/transactions")}>View All</button>
        </div>

        <table className="min-w-full">
          <thead className="bg-slate-100 dark:bg-slate-800/90">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Reference</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Status</th>
            </tr>
          </thead>

          <tbody>
            {analytics.recentTransactions?.map((transaction) => (
              <tr key={transaction._id} className="border-t border-slate-200/70 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/70">
                <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{transaction.reference}</td>
                <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">${transaction.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{transaction.type}</td>
                <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnalyticsCharts analytics={analytics} />

      <div className="mt-8 rounded-[24px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <h2 className="mb-6 text-xl font-semibold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link to="/admin/admins" className="rounded-2xl bg-blue-600 p-4 text-center font-semibold text-white transition hover:bg-blue-700">+ Create Admin</Link>
          <Link to="/admin/accounts" className="rounded-2xl bg-rose-600 p-4 text-center font-semibold text-white transition hover:bg-rose-700">Freeze Account</Link>
          <Link to="/admin/reports" className="rounded-2xl bg-emerald-600 p-4 text-center font-semibold text-white transition hover:bg-emerald-700">Export Report</Link>
          <Link to="/admin/logs" className="rounded-2xl bg-slate-700 p-4 text-center font-semibold text-white transition hover:bg-slate-800">View Logs</Link>
        </div>
      </div>
    </div>
  );
}
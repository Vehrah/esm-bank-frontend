import { useEffect, useState } from "react";
import API from "../../services/authService";
import AnalyticsCharts from "../../components/AnalyticsCharts";
import { Link, useNavigate } from "react-router-dom";
import { FaSyncAlt } from "react-icons/fa";
import { formatCurrency } from "../../utils/formatCurrency";

export default function Analytics() {
  const navigate = useNavigate();

  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const res = await API.get("/admin/analytics");

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
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
        <p className="text-lg font-semibold">
          Loading Analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-slate-50 p-4 text-slate-900 sm:p-6 lg:p-8 dark:bg-slate-950 dark:text-slate-100">
      
      {/* ================= HEADER ================= */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Analytics
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base dark:text-slate-400">
            Monitor your bank performance in real time.
          </p>
        </div>

        <button
          onClick={fetchAnalytics}
          className="flex w-fit shrink-0 items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <FaSyncAlt />
          Refresh
        </button>
      </div>

      {/* ================= STAT CARDS ================= */}
      <div className="mb-8 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Users */}
        <div className="min-w-0 overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 sm:p-6 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Users
          </p>

          <h2 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">
            {analytics.totalUsers ?? 0}
          </h2>
        </div>

        {/* Total Transactions */}
        <div className="min-w-0 overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 sm:p-6 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Transactions
          </p>

          <h2 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">
            {analytics.totalTransactions ?? 0}
          </h2>
        </div>

        {/* Total Deposits */}
        <div className="min-w-0 overflow-hidden rounded-[22px] border border-emerald-200 bg-emerald-50 p-5 shadow sm:p-6 dark:border-emerald-900/40 dark:bg-emerald-950/40">
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            Total Deposits
          </p>

          <h2 className="mt-2 max-w-full text-2xl font-semibold leading-tight tracking-tight text-emerald-700 [overflow-wrap:anywhere] sm:text-3xl dark:text-emerald-300">
            {formatCurrency(Number(analytics.totalDeposits || 0))}
          </h2>
        </div>

        {/* Total Withdrawals */}
        <div className="min-w-0 overflow-hidden rounded-[22px] border border-rose-200 bg-rose-50 p-5 shadow sm:p-6 dark:border-rose-900/40 dark:bg-rose-950/40">
          <p className="text-sm text-rose-600 dark:text-rose-400">
            Total Withdrawals
          </p>

          <h2 className="mt-2 max-w-full text-2xl font-semibold leading-tight tracking-tight text-rose-700 [overflow-wrap:anywhere] sm:text-3xl dark:text-rose-300">
            {formatCurrency(Number(analytics.totalWithdrawals || 0))}
          </h2>
        </div>

        {/* Total Transfers */}
        <div className="min-w-0 overflow-hidden rounded-[22px] border border-sky-200 bg-sky-50 p-5 shadow sm:p-6 dark:border-sky-900/40 dark:bg-sky-950/40">
          <p className="text-sm text-sky-600 dark:text-sky-400">
            Total Transfers
          </p>

          <h2 className="mt-2 max-w-full text-2xl font-semibold leading-tight tracking-tight text-sky-700 [overflow-wrap:anywhere] sm:text-3xl dark:text-sky-300">
            {formatCurrency(Number(analytics.totalTransfers || 0))}
          </h2>
        </div>

        {/* Bank Balance */}
        <div className="min-w-0 overflow-hidden rounded-[22px] border border-violet-200 bg-violet-50 p-5 shadow sm:p-6 dark:border-violet-900/40 dark:bg-violet-950/40">
          <p className="text-sm text-violet-600 dark:text-violet-400">
            Bank Balance
          </p>

          <h2 className="mt-2 max-w-full text-2xl font-semibold leading-tight tracking-tight text-violet-700 [overflow-wrap:anywhere] sm:text-3xl dark:text-violet-300">
            {formatCurrency(Number(analytics.bankBalance || 0))}
          </h2>
        </div>

        {/* Successful Transactions */}
        <div className="min-w-0 overflow-hidden rounded-[22px] border border-emerald-200 bg-emerald-50 p-5 shadow sm:p-6 dark:border-emerald-900/40 dark:bg-emerald-950/40">
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            Successful Transactions
          </p>

          <h2 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">
            {analytics.successfulTransactions ?? 0}
          </h2>
        </div>

        {/* Failed Transactions */}
        <div className="min-w-0 overflow-hidden rounded-[22px] border border-amber-200 bg-amber-50 p-5 shadow sm:p-6 dark:border-amber-900/40 dark:bg-amber-950/40">
          <p className="text-sm text-amber-700 dark:text-amber-400">
            Failed Transactions
          </p>

          <h2 className="mt-2 text-2xl font-semibold leading-tight text-amber-800 sm:text-3xl dark:text-amber-300">
            {analytics.failedTransactions ?? 0}
          </h2>
        </div>
      </div>

      {/* ================= RECENT TRANSACTIONS ================= */}
      <div className="min-w-0 overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/60 sm:p-6 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold">
            Recent Transactions
          </h2>

          <button
            className="w-fit rounded-2xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            onClick={() => navigate("/admin/transactions")}
          >
            View All
          </button>
        </div>

        {/* Prevent table from breaking the page */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead className="bg-slate-100 dark:bg-slate-800/90">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Reference
                </th>

                <th className="w-[150px] max-w-[150px] px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Amount
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Type
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {analytics.recentTransactions?.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="border-t border-slate-200/70 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/70"
                >
                  <td className="max-w-[250px] px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                    <span className="block break-all">
                      {transaction.reference}
                    </span>
                  </td>

                  <td className="w-[150px] max-w-[150px] px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <span className="block [overflow-wrap:anywhere]">
                      {formatCurrency(Number(transaction.amount || 0))}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-sm capitalize text-slate-700 dark:text-slate-200">
                    {transaction.type}
                  </td>

                  <td className="px-4 py-3 text-sm capitalize text-slate-700 dark:text-slate-200">
                    {transaction.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= CHARTS ================= */}
      <div className="mt-8 min-w-0 overflow-hidden">
        <AnalyticsCharts analytics={analytics} />
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="mt-8 min-w-0 overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 sm:p-6 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <h2 className="mb-6 text-xl font-semibold">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/admin/admins"
            className="rounded-2xl bg-blue-600 p-4 text-center font-semibold text-white transition hover:bg-blue-700"
          >
            + Create Admin
          </Link>

          <Link
            to="/admin/accounts"
            className="rounded-2xl bg-rose-600 p-4 text-center font-semibold text-white transition hover:bg-rose-700"
          >
            Freeze Account
          </Link>

          <Link
            to="/admin/reports"
            className="rounded-2xl bg-emerald-600 p-4 text-center font-semibold text-white transition hover:bg-emerald-700"
          >
            Export Report
          </Link>

          <Link
            to="/admin/logs"
            className="rounded-2xl bg-slate-700 p-4 text-center font-semibold text-white transition hover:bg-slate-800"
          >
            View Logs
          </Link>
        </div>
      </div>
    </div>
  );
}
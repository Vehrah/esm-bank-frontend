import { useEffect, useState } from "react";
import axios from "axios";
import AnalyticsCharts from "../../components/AnalyticsCharts";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaExchangeAlt,
  FaArrowDown,
  FaArrowUp,
  FaUniversity,
  FaCheckCircle,
  FaTimesCircle,
  FaSyncAlt,
} from "react-icons/fa";

export default function Analytics() {

  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      setError("Failed to load analytics.");
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
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Analytics
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor your bank performance in real time.
          </p>
        </div>

        <button
          onClick={fetchAnalytics}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <FaSyncAlt />
          Refresh
        </button>

      </div>
      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

  <div className="rounded-xl bg-white p-6 shadow">
    <p className="text-sm text-slate-500">Total Users</p>
    <h2 className="mt-2 text-3xl font-bold">
      {analytics.totalUsers ?? 0}
    </h2>
  </div>

  <div className="rounded-xl bg-white p-6 shadow">
    <p className="text-sm text-slate-500">Total Transactions</p>
    <h2 className="mt-2 text-3xl font-bold">
      {analytics.totalTransactions ?? 0}
    </h2>
  </div>

  <div className="rounded-xl bg-green-50 p-6 shadow">
    <p className="text-sm text-green-600">Total Deposits</p>
    <h2 className="mt-2 text-3xl font-bold text-green-700">
      ${Number(analytics.totalDeposits || 0).toLocaleString()}
    </h2>
  </div>

  <div className="rounded-xl bg-red-50 p-6 shadow">
    <p className="text-sm text-red-600">Total Withdrawals</p>
    <h2 className="mt-2 text-3xl font-bold text-red-700">
      ${Number(analytics.totalWithdrawals || 0).toLocaleString()}
    </h2>
  </div>

  <div className="rounded-xl bg-blue-50 p-6 shadow">
    <p className="text-sm text-blue-600">Total Transfers</p>
    <h2 className="mt-2 text-3xl font-bold text-blue-700">
      ${Number(analytics.totalTransfers || 0).toLocaleString()}
    </h2>
  </div>

  <div className="rounded-xl bg-indigo-50 p-6 shadow">
    <p className="text-sm text-indigo-600">Bank Balance</p>
    <h2 className="mt-2 text-3xl font-bold text-indigo-700">
      ${Number(analytics.bankBalance || 0).toLocaleString()}
    </h2>
  </div>

        <div className="rounded-xl bg-emerald-50 p-6 shadow">
            <p className="text-sm text-emerald-600">Successful Transactions</p>
            <h2 className="mt-2 text-3xl font-bold text-emerald-700">
            {analytics.successfulTransactions ?? 0}
            </h2>
        </div>

        <div className="rounded-xl bg-yellow-50 p-6 shadow">
            <p className="text-sm text-yellow-700">Failed Transactions</p>
            <h2 className="mt-2 text-3xl font-bold text-yellow-800">
            {analytics.failedTransactions ?? 0}
            </h2>
        </div>


   </div>
    <div className="rounded-xl bg-white p-6 shadow">
  <div className="mb-6 flex items-center justify-between">
    <h2 className="text-xl font-bold">
      Recent Transactions
    </h2>

    <button
      className="rounded-lg bg-blue-600 px-4 py-2 text-white"
      onClick={() => navigate("/admin/transactions")}
    >
      View All
    </button>
  </div>

  <table className="min-w-full">

    <thead className="bg-slate-100">

      <tr>

        <th className="px-4 py-3 text-left">
          Reference
        </th>

        <th className="px-4 py-3 text-left">
          Amount
        </th>

        <th className="px-4 py-3 text-left">
          Type
        </th>

        <th className="px-4 py-3 text-left">
          Status
        </th>

      </tr>

    </thead>

    <tbody>

      {analytics.recentTransactions?.map((transaction) => (

        <tr
          key={transaction._id}
          className="border-t"
        >

          <td className="px-4 py-3">
            {transaction.reference}
          </td>

          <td className="px-4 py-3">
            ${transaction.amount.toLocaleString()}
          </td>

          <td className="px-4 py-3">
            {transaction.type}
          </td>

          <td className="px-4 py-3">
            {transaction.status}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

  </div>
  
  <div className="min-h-screen bg-slate-50 p-8">

    {/* Header */}
    ...
    
    {/* Statistics Cards */}
    ...
    
    {/* Charts */}
    <AnalyticsCharts analytics={analytics} />

    {/* Quick Actions */}
    <div className="mt-8 rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-bold">
        Quick Actions
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <Link
          to="/admin/admins"
          className="rounded-lg bg-blue-600 p-4 text-center font-semibold text-white hover:bg-blue-700"
        >
          + Create Admin
        </Link>

        <Link
          to="/admin/accounts"
          className="rounded-lg bg-red-600 p-4 text-center font-semibold text-white hover:bg-red-700"
        >
          Freeze Account
        </Link>

        <Link
          to="/admin/reports"
          className="rounded-lg bg-green-600 p-4 text-center font-semibold text-white hover:bg-green-700"
        >
          Export Report
        </Link>

        <Link
          to="/admin/logs"
          className="rounded-lg bg-slate-700 p-4 text-center font-semibold text-white hover:bg-slate-800"
        >
          View Logs
        </Link>

      </div>

    </div>

  </div>
        
 </div>
  );
}
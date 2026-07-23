import { useEffect, useState } from "react";
import axios from "axios";
import { formatCurrency } from "../../utils/formatCurrency";
import Topbar from "../../components/admin/Topbar";
import StatCard from "../../components/admin/StatCard";
import BalanceCard from "../../components/admin/BalanceCard";

import {
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaExchangeAlt,
  FaRegMoneyBillAlt,
  FaMoneyBillWave,
  FaSyncAlt,
} from "react-icons/fa";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatAmount = (value) => formatCurrency(value, { currency: "USD" });

  const fetchDashboard = async (showLoader = false) => {
    if (showLoader) {
      setLoading(true);
    }

    setError(null);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/admin/dashboard", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      setData(res.data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to load dashboard"
      );
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchDashboard(true);

    const interval = setInterval(() => {
      fetchDashboard(false);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <svg
          className="h-12 w-12 animate-spin text-sky-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl">
        <Topbar
          title="Dashboard"
          subtitle="Monitor users, balances, transfers and analytics."
        />

        <div className="mb-6 flex justify-end">
          <button
            onClick={() => fetchDashboard(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            <FaSyncAlt className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-200">
            <div className="flex items-start justify-between gap-3">
              <div>{error}</div>
              <button
                onClick={() => fetchDashboard(true)}
                className="rounded-xl bg-rose-600 px-3 py-1 text-white hover:bg-rose-700"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Total Users"
            value={data?.totalUsers ?? 0}
            icon={<FaUsers />}
            color="bg-sky-100 text-sky-600"
          />

          <StatCard
            title="Verified Users"
            value={data?.verifiedUsers ?? 0}
            icon={<FaUserCheck />}
            color="bg-green-100 text-green-600"
          />

          <StatCard
            title="Pending Verification"
            value={data?.pendingVerification ?? 0}
            icon={<FaUserClock />}
            color="bg-yellow-100 text-yellow-600"
          />

          <StatCard
            title="Total Transfers"
            value={data?.totalTransfers ?? 0}
            icon={<FaExchangeAlt />}
            color="bg-violet-100 text-violet-600"
          />

          <StatCard
            title="Total Deposits"
            value={formatAmount(data?.totalDeposits)}
            icon={<FaRegMoneyBillAlt />}
            color="bg-cyan-100 text-cyan-600"
          />

          <StatCard
            title="Total Withdrawals"
            value={formatAmount(data?.totalWithdrawals)}
            icon={<FaMoneyBillWave />}
            color="bg-rose-100 text-rose-600"
          />
        </div>

        <BalanceCard balance={data?.totalBalance ?? 0} />
      </div>
    </div>
  );
}

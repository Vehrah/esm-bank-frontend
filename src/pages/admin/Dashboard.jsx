import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaExchangeAlt,
  FaRegMoneyBillAlt,
  FaMoneyBillWave,
  FaSyncAlt,
} from "react-icons/fa";

// Admin Dashboard page
// Fetches statistics from GET /api/admin/dashboard using the JWT in localStorage
export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const formatAmount = (value) => formatCurrency(value, { currency: "USD" });

  const fetchDashboard = useCallback(async (showLoader = false) => {
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
    setLastUpdated(new Date());
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
}, []);

 useEffect(() => {
  fetchDashboard(true);

  const interval = setInterval(() => {
    fetchDashboard(false);
  }, 30000);

  return () => clearInterval(interval);
}, [fetchDashboard]);
  // Loading full-screen spinner
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
    <div className="min-h-screen bg-slate-50 py-8 px-4 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-end mb-6">
                <button
                    onClick={fetchDashboard}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                >
                    <FaSyncAlt className={loading ? "animate-spin" : ""} />
                    Refresh
                </button>
        </div>
        <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Welcome back, Admin 👋
                </h1>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Monitor users, balances, deposits, withdrawals and transfers in real time.
                </p>
            </div>
        {/* Header: title + refresh */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Overview of users, transactions and balances
            </p>
            <p className="text-xs text-slate-400 mt-1">
                Last updated:
                {lastUpdated
                    ? lastUpdated.toLocaleTimeString()
                    : " Never"}
                </p>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-200">
            <div className="flex items-start justify-between">
              <div>{error}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchDashboard}
                  className="rounded-md bg-rose-600 px-3 py-1 text-white hover:bg-rose-700"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Total Users */}
          <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Users</h3>
                <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">{data?.totalUsers ?? 0}</p>
              </div>
              <div className="rounded-full bg-sky-100 p-3 text-sky-600 dark:bg-sky-900/20">
                <FaUsers className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Verified Users */}
          <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Verified Users</h3>
                <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">{data?.verifiedUsers ?? 0}</p>
              </div>
              <div className="rounded-full bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-900/20">
                <FaUserCheck className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Pending Verification */}
          <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Verification</h3>
                <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">{data?.pendingVerification ?? 0}</p>
              </div>
              <div className="rounded-full bg-amber-100 p-3 text-amber-600 dark:bg-amber-900/20">
                <FaUserClock className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Total Transfers */}
          <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Transfers</h3>
                <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">{data?.totalTransfers ?? 0}</p>
              </div>
              <div className="rounded-full bg-violet-100 p-3 text-violet-600 dark:bg-violet-900/20">
                <FaExchangeAlt className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Total Deposits */}
          <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Deposits</h3>
                <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">{formatAmount(data?.totalDeposits)}</p>
              </div>
              <div className="rounded-full bg-cyan-100 p-3 text-cyan-600 dark:bg-cyan-900/20">
                <FaRegMoneyBillAlt className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Total Withdrawals */}
          <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Withdrawals</h3>
                <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">{formatAmount(data?.totalWithdrawals)}</p>
              </div>
              <div className="rounded-full bg-rose-100 p-3 text-rose-600 dark:bg-rose-900/20">
                <FaMoneyBillWave className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Total Bank Balance (full width on large screens) */}
          <div className="col-span-full rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md dark:bg-slate-900 sm:col-span-2 lg:col-span-3 xl:col-span-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Bank Balance</h3>
                <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">{formatAmount(data?.totalBalance)}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Aggregated balance across all accounts</p>
              </div>
              <div className="rounded-full bg-indigo-100 p-4 text-indigo-700 dark:bg-indigo-900/20">
                <FaRegMoneyBillAlt className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

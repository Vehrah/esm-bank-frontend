import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { formatCurrency } from "../utils/formatCurrency";
import {
  FaCopy,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";

function BalanceCard() {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(true);

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(user?.accountNumber);
      toast.success("Account number copied.");
    } catch {
      toast.error("Unable to copy account number.");
    }
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Available Balance
          </p>

          <h1 className="mt-3 text-5xl font-bold text-slate-900 dark:text-white">
            {showBalance
              ? formatCurrency(user?.balance || 0)
              : "••••••••"}
          </h1>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
            <FaCheckCircle />
            Account Active
          </div>
        </div>

        <button
          onClick={() => setShowBalance(!showBalance)}
          className="rounded-full bg-slate-100 p-3 transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          {showBalance ? <FaEyeSlash /> : <FaEye />}
        </button>

      </div>

      {/* Divider */}
      <div className="my-8 border-t border-slate-200 dark:border-slate-700" />

      {/* Account Information */}
      <div className="grid gap-6 sm:grid-cols-3">

        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Account Number
          </p>

          <div className="mt-2 flex items-center gap-3">
            <span className="font-semibold text-lg">
              {user?.accountNumber}
            </span>

            <button
              onClick={copyAccount}
              className="text-yellow-500 hover:text-yellow-600"
            >
              <FaCopy />
            </button>
          </div>
        </div>

        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Account Tier
          </p>

          <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
            {user?.accountTier || "Basic"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Currency
          </p>

          <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
            {user?.currency || "USD"}
          </p>
        </div>

      </div>

    </div>
  );
}

export default BalanceCard;
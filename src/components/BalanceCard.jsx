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

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Available Balance
          </p>

          <h1 className="mt-2 text-5xl font-bold text-slate-900 dark:text-white">
            {showBalance
              ? formatCurrency(user?.balance || 0)
              : "••••••••"}
          </h1>
        </div>

        <button
          onClick={() => setShowBalance(!showBalance)}
          className="rounded-full bg-slate-100 p-3 transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          {showBalance ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">

        <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-800">
          <p className="text-sm text-slate-500">
            Account Number
          </p>

          <div className="mt-2 flex items-center justify-between">
            <span className="font-semibold">
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

        <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-800">
          <p className="text-sm text-slate-500">
            Account Tier
          </p>

          <p className="mt-2 font-semibold">
            {user?.accountTier || "Basic"}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-800">
          <p className="text-sm text-slate-500">
            Currency
          </p>

          <p className="mt-2 font-semibold">
            {user?.currency || "USD"}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-800">
          <p className="text-sm text-slate-500">
            Account Status
          </p>

          <div className="mt-2 flex items-center gap-2 font-semibold text-green-600">
            <FaCheckCircle />
            Active
          </div>
        </div>

      </div>

    </div>
  );
}

export default BalanceCard;
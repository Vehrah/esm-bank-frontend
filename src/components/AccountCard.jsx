import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function AccountCard() {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(true);

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(user?.accountNumber);

    toast.success("Account number copied!");
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 p-8 shadow-2xl">

      {/* Background Circles */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"></div>
      <div className="absolute -bottom-10 -left-10 h-52 w-52 rounded-full bg-black/10"></div>

      <div className="relative z-10">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="rounded-3xl bg-white shadow-lg dark:bg-slate-900 text-slate-900 dark:text-white">
              ESM BANK
            </h2>

            <p className="text-slate-900 dark:text-white">
              Premium Banking
            </p>
          </div>

          <span className="rounded-full bg-white/30 px-4 py-2 font-semibold text-slate-900 dark:text-white">
            {user?.currency}
          </span>

        </div>

        {/* Balance */}
        <div className="mt-12">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="uppercase tracking-widest text-slate-900 dark:text-white">
              Available Balance
            </p>

            <button
              onClick={() => setShowBalance(!showBalance)}
              className="rounded-lg bg-white/30 px-3 py-1 text-sm font-semibold text-slate-900 dark:text-white"
            >
              {showBalance ? "🙈 Hide" : "👁 Show"}
            </button>

          </div>

          <h1 className="rounded-3xl bg-white shadow-lg dark:bg-slate-900 text-slate-900 dark:text-white">

            {showBalance
              ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: user?.currency || "USD",
                }).format(user?.balance || 0)
              : "••••••••"}

          </h1>

        </div>

        {/* User Details */}
        <div className="mt-12 flex flex-col gap-8 md:flex-row md:justify-between">

          <div>

            <p className="text-slate-900 dark:text-white">
              Account Holder
            </p>

            <h3 className="text-xl font-bold uppercase text-slate-900 dark:text-white">
              {user?.firstName} {user?.lastName}
            </h3>

          </div>

          <div>

            <p className="text-slate-900 dark:text-white">
              Account Number
            </p>

            <div className="flex items-center gap-3">

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {user?.accountNumber}
              </h3>

              <button
                onClick={copyAccountNumber}
                className="rounded-lg bg-white/30 px-3 py-1 text-sm font-semibold text-slate-900 dark:text-white"
              >
                📋 Copy
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AccountCard;
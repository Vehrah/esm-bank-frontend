import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { formatCurrency } from "../utils/formatCurrency";

function BalanceCard() {
  const { user } = useAuth();

  const [showBalance, setShowBalance] = useState(true);

  const copyAccount = () => {
    navigator.clipboard.writeText(user.accountNumber);

    alert("Account number copied.");
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-xl">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-400">
          Available Balance
        </h2>

        <button
          onClick={() =>
            setShowBalance(!showBalance)
          }
          className="text-yellow-400"
        >
          {showBalance ? "🙈" : "👁"}
        </button>

      </div>

      <h1 className="mt-4 text-5xl font-bold text-slate-900 dark:text-white">
        {showBalance
          ? formatCurrency(user?.balance)
          : "••••••••"}
      </h1>

      <div className="mt-8 flex items-center justify-between">

        <div>
          <p className="text-slate-600 dark:text-slate-400">
            Account Number
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            {user?.accountNumber}
          </h3>
        </div>

        <button
          onClick={copyAccount}
          className="rounded-xl bg-yellow-500 px-5 py-2 font-semibold text-slate-900"
        >
          Copy
        </button>

      </div>

    </div>
  );
}

export default BalanceCard;
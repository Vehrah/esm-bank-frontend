import { formatCurrency } from "../../utils/formatCurrency";
import { FaUniversity } from "react-icons/fa";

function BalanceCard({ balance }) {
  return (
    <div className="mt-8 rounded-[28px] bg-gradient-to-br from-sky-600 via-blue-600 to-violet-600 p-8 text-white shadow-xl shadow-sky-200/40 dark:from-slate-900 dark:via-slate-800 dark:to-slate-950 dark:shadow-black/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg text-slate-100/90">Total Bank Balance</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
            {formatCurrency(balance)}
          </h1>
          <p className="mt-2 text-sm text-slate-200/90 sm:text-base">
            Aggregated balance across all customer accounts
          </p>
        </div>

        <div className="rounded-full bg-yellow-400 p-6 text-4xl text-slate-900">
          <FaUniversity />
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
import { FaFilePdf, FaFileExcel, FaUsers, FaExchangeAlt } from "react-icons/fa";

export default function Reports() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold sm:text-3xl">Reports</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Export banking reports and customer data.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <div className="mb-4 flex items-center gap-3">
            <FaExchangeAlt className="text-3xl text-blue-600" />
            <h2 className="text-xl font-semibold">Transactions Report</h2>
          </div>

          <p className="mb-6 text-slate-500 dark:text-slate-400">Export every bank transaction.</p>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 rounded-2xl bg-rose-600 px-5 py-3 font-semibold text-white transition hover:bg-rose-700"><FaFilePdf />PDF</button>
            <button className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"><FaFileExcel />Excel</button>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <div className="mb-4 flex items-center gap-3">
            <FaUsers className="text-3xl text-blue-600" />
            <h2 className="text-xl font-semibold">Customers Report</h2>
          </div>

          <p className="mb-6 text-slate-500 dark:text-slate-400">Export every registered customer.</p>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 rounded-2xl bg-rose-600 px-5 py-3 font-semibold text-white transition hover:bg-rose-700"><FaFilePdf />PDF</button>
            <button className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"><FaFileExcel />Excel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
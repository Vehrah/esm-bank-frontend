import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSyncAlt,
  FaHistory,
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
  FaExchangeAlt,
} from "react-icons/fa";
import { formatCurrency } from "../../utils/formatCurrency";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get("/api/admin/logs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLogs(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const deposits = logs.filter((l) => l.type === "deposit").length;
  const withdrawals = logs.filter((l) => l.type === "withdrawal").length;
  const transfers = logs.filter((l) => l.type === "transfer").length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 lg:p-8">

      {/* Header */}

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Audit Logs
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Monitor every banking activity across the platform.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <FaSyncAlt />
          Refresh
        </button>

      </div>

      {/* Summary Cards */}

      <div className="mb-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Total Activities
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                {logs.length}
              </h2>

            </div>

            <div className="rounded-xl bg-blue-100 p-4 text-blue-600">
              <FaHistory size={22} />
            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Deposits
              </p>

              <h2 className="mt-3 text-3xl font-bold text-green-600">
                {deposits}
              </h2>

            </div>

            <div className="rounded-xl bg-green-100 p-4 text-green-600">
              <FaArrowDown size={22} />
            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Withdrawals
              </p>

              <h2 className="mt-3 text-3xl font-bold text-red-600">
                {withdrawals}
              </h2>

            </div>

            <div className="rounded-xl bg-red-100 p-4 text-red-600">
              <FaArrowUp size={22} />
            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Transfers
              </p>

              <h2 className="mt-3 text-3xl font-bold text-violet-600">
                {transfers}
              </h2>

            </div>

            <div className="rounded-xl bg-violet-100 p-4 text-violet-600">
              <FaExchangeAlt size={22} />
            </div>

          </div>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto rounded-3xl bg-white dark:bg-slate-900 shadow">

        {loading ? (

          <div className="p-16 text-center text-slate-500">
            Loading logs...
          </div>

        ) : logs.length === 0 ? (

          <div className="p-16 text-center">

            <FaMoneyBillWave
              className="mx-auto mb-5 text-slate-300"
              size={50}
            />

            <h3 className="text-xl font-semibold text-slate-700 dark:text-white">
              No Logs Found
            </h3>

            <p className="mt-2 text-slate-500">
              Banking activities will appear here.
            </p>

          </div>

        ) : (

          <table className="min-w-[1200px] w-full">

            <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800">

              <tr>

                <th className="px-6 py-4 text-left">Date</th>

                <th className="px-6 py-4 text-left">Sender</th>

                <th className="px-6 py-4 text-left">Receiver</th>

                <th className="px-6 py-4 text-left">Amount</th>

                <th className="px-6 py-4 text-left">Type</th>

                <th className="px-6 py-4 text-left">Status</th>

              </tr>

            </thead>

            <tbody>

              {logs.map((log) => (

                <tr
                  key={log._id}
                  className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                >

                  <td className="px-6 py-5 whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>

                  <td className="px-6 py-5 font-medium">
                    {log.sender
                      ? `${log.sender.firstName} ${log.sender.lastName}`
                      : "-"}
                  </td>

                  <td className="px-6 py-5">
                    {log.receiver
                      ? `${log.receiver.firstName} ${log.receiver.lastName}`
                      : "-"}
                  </td>

                  <td className="px-6 py-5 font-semibold">
                    {formatCurrency(log.amount)}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold
                        ${
                          log.type === "deposit"
                            ? "bg-green-100 text-green-700"
                            : log.type === "withdrawal"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {log.type}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold
                        ${
                          log.status === "successful"
                            ? "bg-green-100 text-green-700"
                            : log.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {log.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}
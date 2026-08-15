import { useEffect, useState } from "react";
import API from "../../services/authService";
import { FaSyncAlt, FaSearch } from "react-icons/fa";
import { formatCurrency } from "../../utils/formatCurrency";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");

  // ================= FETCH TRANSACTIONS =================

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const res = await API.get("/admin/transactions");

      setTransactions(res.data);
      setFilteredTransactions(res.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ================= FILTER TRANSACTIONS =================

  useEffect(() => {
    let filtered = [...transactions];

    const searchValue = search.trim().toLowerCase();

    if (searchValue !== "") {
      filtered = filtered.filter((transaction) => {
        const sender = transaction.sender
          ? `${transaction.sender.firstName} ${transaction.sender.lastName}`.toLowerCase()
          : "";

        const receiver = transaction.receiver
          ? `${transaction.receiver.firstName} ${transaction.receiver.lastName}`.toLowerCase()
          : "";

        const reference =
          transaction.reference?.toLowerCase() || "";

        const senderAccount =
          transaction.senderAccount?.toLowerCase() || "";

        const receiverAccount =
          transaction.receiverAccount?.toLowerCase() || "";

        return (
          sender.includes(searchValue) ||
          receiver.includes(searchValue) ||
          reference.includes(searchValue) ||
          senderAccount.includes(searchValue) ||
          receiverAccount.includes(searchValue)
        );
      });
    }

    if (type !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.type === type
      );
    }

    if (status !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.status === status
      );
    }

    setFilteredTransactions(filtered);
  }, [transactions, search, type, status]);

  // ================= STATISTICS =================

  const totalTransactions = transactions.length;

  const totalDeposits = transactions
    .filter((t) => t.type === "deposit")
    .reduce(
      (sum, t) => sum + Number(t.amount || 0),
      0
    );

  const totalWithdrawals = transactions
    .filter((t) => t.type === "withdrawal")
    .reduce(
      (sum, t) => sum + Number(t.amount || 0),
      0
    );

  const failedTransactions = transactions.filter(
    (t) => t.status === "failed"
  ).length;

  // ================= UI =================

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 p-4 text-slate-900 transition-colors sm:p-6 lg:p-8 dark:bg-slate-950 dark:text-slate-100">

      {/* ================= HEADER ================= */}

      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="min-w-0">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Transactions
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base dark:text-slate-400">
            View and manage every transaction in the bank.
          </p>
        </div>

        <button
          onClick={fetchTransactions}
          disabled={loading}
          className="flex w-fit shrink-0 items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FaSyncAlt
            className={loading ? "animate-spin" : ""}
          />

          Refresh
        </button>
      </div>

      {/* ================= STATISTICS ================= */}

      <div className="mb-8 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Transactions */}

        <div className="min-w-0 overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 sm:p-6 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Transactions
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
            {totalTransactions.toLocaleString()}
          </h2>

        </div>

        {/* Total Deposits */}

        <div className="min-w-0 overflow-hidden rounded-[22px] border border-emerald-200 bg-emerald-50 p-5 shadow sm:p-6 dark:border-emerald-900/40 dark:bg-emerald-950/40">

          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            Total Deposits
          </p>

          <h2 className="mt-3 min-w-0 break-words text-2xl font-semibold leading-tight text-emerald-700 sm:text-3xl dark:text-emerald-300">
            {formatCurrency(totalDeposits)}
          </h2>

        </div>

        {/* Total Withdrawals */}

        <div className="min-w-0 overflow-hidden rounded-[22px] border border-rose-200 bg-rose-50 p-5 shadow sm:p-6 dark:border-rose-900/40 dark:bg-rose-950/40">

          <p className="text-sm text-rose-600 dark:text-rose-400">
            Total Withdrawals
          </p>

          <h2 className="mt-3 min-w-0 break-words text-2xl font-semibold leading-tight text-rose-700 sm:text-3xl dark:text-rose-300">
            {formatCurrency(totalWithdrawals)}
          </h2>

        </div>

        {/* Failed Transactions */}

        <div className="min-w-0 overflow-hidden rounded-[22px] border border-amber-200 bg-amber-50 p-5 shadow sm:p-6 dark:border-amber-900/40 dark:bg-amber-950/40">

          <p className="text-sm text-amber-700 dark:text-amber-400">
            Failed Transactions
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-amber-800 dark:text-amber-300">
            {failedTransactions.toLocaleString()}
          </h2>

        </div>

      </div>

      {/* ================= FILTERS ================= */}

      <div className="mb-6 grid min-w-0 gap-4 md:grid-cols-3">

        {/* Search */}

        <div className="relative min-w-0">

          <FaSearch className="pointer-events-none absolute left-4 top-4 text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-yellow-500 dark:focus:ring-yellow-500/20"
          />

        </div>

        {/* Type */}

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          <option value="all">All Types</option>
          <option value="transfer">Transfer</option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          <option value="all">All Status</option>
          <option value="successful">Successful</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>

      </div>

      {/* ================= TRANSACTION TABLE ================= */}

      <div className="w-full min-w-0 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">

        {loading ? (

          <div className="p-10 text-center text-slate-500 dark:text-slate-400">
            Loading transactions...
          </div>

        ) : filteredTransactions.length === 0 ? (

          <div className="p-10 text-center text-slate-500 dark:text-slate-400">
            No transactions found.
          </div>

        ) : (

          <div className="w-full overflow-x-auto">

            <table className="w-full min-w-[1000px] table-fixed">

              <thead className="bg-slate-100 dark:bg-slate-800/90">

                <tr>

                  <th className="w-[20%] px-5 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6 dark:text-slate-200">
                    Reference
                  </th>

                  <th className="w-[14%] px-5 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6 dark:text-slate-200">
                    Sender
                  </th>

                  <th className="w-[14%] px-5 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6 dark:text-slate-200">
                    Receiver
                  </th>

                  <th className="w-[16%] px-5 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6 dark:text-slate-200">
                    Amount
                  </th>

                  <th className="w-[12%] px-5 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6 dark:text-slate-200">
                    Type
                  </th>

                  <th className="w-[12%] px-5 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6 dark:text-slate-200">
                    Status
                  </th>

                  <th className="w-[12%] px-5 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6 dark:text-slate-200">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredTransactions.map((transaction) => (

                  <tr
                    key={transaction._id}
                    className="border-t border-slate-200/70 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/70"
                  >

                    {/* Reference */}

                    <td className="px-5 py-4 sm:px-6">

                      <span className="block max-w-[180px] break-all text-sm font-medium text-slate-700 dark:text-slate-200">
                        {transaction.reference}
                      </span>

                    </td>

                    {/* Sender */}

                    <td className="px-5 py-4 sm:px-6">

                      <span className="block truncate text-sm text-slate-700 dark:text-slate-200">
                        {transaction.sender
                          ? `${transaction.sender.firstName} ${transaction.sender.lastName}`
                          : "-"}
                      </span>

                    </td>

                    {/* Receiver */}

                    <td className="px-5 py-4 sm:px-6">

                      <span className="block truncate text-sm text-slate-700 dark:text-slate-200">
                        {transaction.receiver
                          ? `${transaction.receiver.firstName} ${transaction.receiver.lastName}`
                          : "-"}
                      </span>

                    </td>

                    {/* Amount */}

                    <td className="px-5 py-4 sm:px-6">

                      <span className="block max-w-[150px] break-words text-sm font-semibold leading-tight text-slate-700 sm:text-base dark:text-slate-200">
                        {formatCurrency(transaction.amount)}
                      </span>

                    </td>

                    {/* Type */}

                    <td className="px-5 py-4 sm:px-6">

                      <span
                        className={`inline-flex max-w-full rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          transaction.type === "deposit"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                            : transaction.type === "withdrawal"
                            ? "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400"
                            : "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400"
                        }`}
                      >
                        {transaction.type}
                      </span>

                    </td>

                    {/* Status */}

                    <td className="px-5 py-4 sm:px-6">

                      <span
                        className={`inline-flex max-w-full rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          transaction.status === "successful"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                            : transaction.status === "pending"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
                            : "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400"
                        }`}
                      >
                        {transaction.status}
                      </span>

                    </td>

                    {/* Date */}

                    <td className="px-5 py-4 sm:px-6">

                      <span className="block text-sm leading-5 text-slate-700 dark:text-slate-200">
                        {new Date(
                          transaction.createdAt
                        ).toLocaleString()}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}
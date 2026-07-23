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

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

     const res = await API.get("/admin/transactions");

      setTransactions(res.data);
      setFilteredTransactions(res.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  fetchTransactions();
}, []);

useEffect(() => {
  let filtered = [...transactions];

  if (search.trim() !== "") {
    filtered = filtered.filter((transaction) => {
      const sender = transaction.sender
        ? `${transaction.sender.firstName} ${transaction.sender.lastName}`.toLowerCase()
        : "";

      const receiver = transaction.receiver
        ? `${transaction.receiver.firstName} ${transaction.receiver.lastName}`.toLowerCase()
        : "";

      return (
        sender.includes(search.toLowerCase()) ||
        receiver.includes(search.toLowerCase()) ||
        transaction.reference.toLowerCase().includes(search.toLowerCase()) ||
        transaction.senderAccount.includes(search) ||
        transaction.receiverAccount.includes(search)
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

const totalTransactions = transactions.length;

const totalDeposits = transactions
  .filter((t) => t.type === "deposit")
  .reduce((sum, t) => sum + t.amount, 0);

const totalWithdrawals = transactions
  .filter((t) => t.type === "withdrawal")
  .reduce((sum, t) => sum + t.amount, 0);

const failedTransactions = transactions.filter(
  (t) => t.status === "failed"
).length;

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Transactions</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">View and manage every transaction in the bank.</p>
        </div>

        <button
          onClick={fetchTransactions}
          className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <FaSyncAlt />
          Refresh
        </button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Transactions</p>
          <h2 className="mt-2 text-3xl font-semibold">{totalTransactions}</h2>
        </div>

        <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 p-6 shadow dark:border-emerald-900/40 dark:bg-emerald-950/40">
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Total Deposits</p>
          <h2 className="mt-2 text-3xl font-semibold text-emerald-700 dark:text-emerald-300">{formatCurrency(totalDeposits)}</h2>
        </div>

        <div className="rounded-[22px] border border-rose-200 bg-rose-50 p-6 shadow dark:border-rose-900/40 dark:bg-rose-950/40">
          <p className="text-sm text-rose-600 dark:text-rose-400">Total Withdrawals</p>
          <h2 className="mt-2 text-3xl font-semibold text-rose-700 dark:text-rose-300">{formatCurrency(totalWithdrawals)}</h2>
        </div>

        <div className="rounded-[22px] border border-amber-200 bg-amber-50 p-6 shadow dark:border-amber-900/40 dark:bg-amber-950/40">
          <p className="text-sm text-amber-700 dark:text-amber-400">Failed Transactions</p>
          <h2 className="mt-2 text-3xl font-semibold text-amber-800 dark:text-amber-300">{failedTransactions}</h2>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="relative">
          <FaSearch className="pointer-events-none absolute left-4 top-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-yellow-500 dark:focus:ring-yellow-500/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select className="rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="transfer">Transfer</option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
        </select>

        <select className="rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="successful">Successful</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="w-full overflow-x-auto rounded-[24px] border border-slate-200 bg-white shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        {loading ? (
          <div className="p-10 text-center text-slate-500 dark:text-slate-400">Loading transactions...</div>
        ) : (
          <table className="min-w-[1100px] w-full">
            <thead className="bg-slate-100 dark:bg-slate-800/90">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Reference</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Sender</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Receiver</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction._id} className="border-t border-slate-200/70 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/70">
                  <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-200">{transaction.reference}</td>
                  <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">{transaction.sender ? `${transaction.sender.firstName} ${transaction.sender.lastName}` : "-"}</td>
                  <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">{transaction.receiver ? `${transaction.receiver.firstName} ${transaction.receiver.lastName}` : "-"}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-200">{formatCurrency(transaction.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${transaction.type === "deposit" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" : transaction.type === "withdrawal" ? "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400" : "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400"}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${transaction.status === "successful" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" : transaction.status === "pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400" : "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400"}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">{new Date(transaction.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
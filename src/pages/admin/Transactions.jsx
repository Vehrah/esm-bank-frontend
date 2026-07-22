import { useEffect, useState } from "react";
import axios from "axios";
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
      useEffect(() => {
  fetchTransactions();
}, []);



      const token = localStorage.getItem("token");

      const res = await axios.get("/api/admin/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Transactions
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage every transaction in the bank.
          </p>

        </div>

        <button
          onClick={fetchTransactions}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <FaSyncAlt />
          Refresh
        </button>

      </div>
      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

  {/* Total Transactions */}
  <div className="rounded-xl bg-white p-6 shadow">
    <p className="text-sm text-slate-500">Total Transactions</p>
    <h2 className="mt-2 text-3xl font-bold">
      {totalTransactions}
    </h2>
  </div>

  {/* Total Deposits */}
  <div className="rounded-xl bg-green-50 p-6 shadow">
    <p className="text-sm text-green-600">Total Deposits</p>
    <h2 className="mt-2 text-3xl font-bold text-green-700">
      {formatCurrency(totalDeposits)}
    </h2>
  </div>

  {/* Total Withdrawals */}
  <div className="rounded-xl bg-red-50 p-6 shadow">
    <p className="text-sm text-red-600">Total Withdrawals</p>
    <h2 className="mt-2 text-3xl font-bold text-red-700">
      {formatCurrency(totalWithdrawals)}
    </h2>
  </div>

  {/* Failed Transactions */}
  <div className="rounded-xl bg-yellow-50 p-6 shadow">
    <p className="text-sm text-yellow-700">Failed Transactions</p>
    <h2 className="mt-2 text-3xl font-bold text-yellow-800">
      {failedTransactions}
    </h2>
  </div>

</div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border py-3 pl-11 pr-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>
        <select
          className="rounded-lg border p-3"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="transfer">Transfer</option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
        </select>

        <select
          className="rounded-lg border p-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="successful">Successful</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>

      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">

  {loading ? (
    <div className="p-10 text-center">
      Loading transactions...
    </div>
  ) : (
    <table className="min-w-full">

      <thead className="bg-slate-100">

        <tr>

          <th className="px-6 py-4 text-left">Reference</th>

          <th className="px-6 py-4 text-left">Sender</th>

          <th className="px-6 py-4 text-left">Receiver</th>

          <th className="px-6 py-4 text-left">Amount</th>

          <th className="px-6 py-4 text-left">Type</th>

          <th className="px-6 py-4 text-left">Status</th>

          <th className="px-6 py-4 text-left">Date</th>

        </tr>

      </thead>

      <tbody>

        {filteredTransactions.map((transaction) => (

          <tr
            key={transaction._id}
            className="border-t hover:bg-slate-50"
          >

            <td className="px-6 py-4 font-medium">
              {transaction.reference}
            </td>

            <td className="px-6 py-4">
              {transaction.sender
                ? `${transaction.sender.firstName} ${transaction.sender.lastName}`
                : "-"}
            </td>

            <td className="px-6 py-4">
              {transaction.receiver
                ? `${transaction.receiver.firstName} ${transaction.receiver.lastName}`
                : "-"}
            </td>

            <td className="px-6 py-4 font-semibold">
              {formatCurrency(transaction.amount)}
            </td>

            <td className="px-6 py-4">

              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold
                  ${
                    transaction.type === "deposit"
                      ? "bg-green-100 text-green-700"
                      : transaction.type === "withdrawal"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
              >
                {transaction.type}
              </span>

            </td>

            <td className="px-6 py-4">

              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold
                  ${
                    transaction.status === "successful"
                      ? "bg-green-100 text-green-700"
                      : transaction.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
              >
                {transaction.status}
              </span>

            </td>

            <td className="px-6 py-4">
              {new Date(transaction.createdAt).toLocaleString()}
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
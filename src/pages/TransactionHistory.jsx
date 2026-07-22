import { useEffect, useState } from "react";
import API from "../services/authService";
import { formatCurrency } from "../utils/formatCurrency";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transaction/history");
      setTransactions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
   <div className="min-h-screen bg-gray-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <h1 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
        Transaction History
      </h1>

      <div className="space-y-4">
        {transactions.map((tx) => (
          <div
            key={tx._id}
            className="rounded-xl bg-white dark:bg-slate-900 p-5"
          >
            <p>Reference: {tx.reference}</p>
            <p>Amount: {formatCurrency(tx.amount)}</p>
            <p>Description: {tx.description}</p>
            <p>Status: {tx.status}</p>
            <p>Type: {tx.type}</p>
            <p>
              Date:{" "}
              {new Date(tx.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionHistory;
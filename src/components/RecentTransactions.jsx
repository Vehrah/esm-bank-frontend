import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/authService";
import { formatCurrency } from "../utils/formatCurrency";

function RecentTransactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const res = await API.get("/transaction/history");
      setTransactions(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Recent Transactions
      </h2>

      {transactions.length === 0 ? (
        <p className="text-slate-500">
          No transactions yet.
        </p>
      ) : (
        transactions.map((item) => {
          const isIncoming =
            item.receiverAccount === user?.accountNumber;

          return (
            <div
              key={item._id}
              className="flex items-center justify-between border-b border-gray-200 py-4 dark:border-slate-800"
            >
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {item.type.charAt(0).toUpperCase() +
                    item.type.slice(1)}
                </h3>

                <p className="text-sm text-slate-500">
                  {item.type === "transfer"
                    ? isIncoming
                      ? `From ${
                          item.sender?.firstName ||
                          item.senderAccount
                        }`
                      : `To ${
                          item.receiver?.firstName ||
                          item.receiverAccount
                        }`
                    : item.description}
                </p>
              </div>

              <span
                className={
                  isIncoming
                    ? "font-semibold text-green-500"
                    : "font-semibold text-red-500"
                }
              >
                {isIncoming ? "+" : "-"}
                {formatCurrency(item.amount)}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
}

export default RecentTransactions;
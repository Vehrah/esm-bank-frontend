import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/authService";
import { formatCurrency } from "../utils/formatCurrency";
import {
  FaArrowDown,
  FaArrowUp,
  FaExchangeAlt,
} from "react-icons/fa";

function RecentTransactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const res = await API.get("/transaction/history");
      setTransactions(res.data.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900">

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Your latest account activity
          </p>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 py-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
          No transactions yet.
        </div>
      ) : (
        <div className="space-y-4">

          {transactions.map((item) => {
            const isIncoming =
              item.receiverAccount === user?.accountNumber;

            const icon =
              item.type === "deposit" ? (
                <FaArrowDown />
              ) : item.type === "withdraw" ? (
                <FaArrowUp />
              ) : (
                <FaExchangeAlt />
              );

            return (
              <div
                key={item._id}
                className="flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition hover:border-yellow-400 hover:shadow-md dark:border-slate-700 dark:hover:border-yellow-500"
              >

                <div className="flex items-center gap-4">

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl ${
                      isIncoming
                        ? "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                        : "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                    }`}
                  >
                    {icon}
                  </div>

                  <div>

                    <h3 className="font-semibold capitalize text-slate-900 dark:text-white">
                      {item.type}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
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
                        : item.description || "Bank Transaction"}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>

                  </div>

                </div>

                <div
                  className={`text-lg font-bold ${
                    isIncoming
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {isIncoming ? "+" : "-"}
                  {formatCurrency(item.amount)}
                </div>

              </div>
            );
          })}

        </div>
      )}

    </section>
  );
}

export default RecentTransactions;
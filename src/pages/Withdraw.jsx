import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Withdraw() {
  const navigate = useNavigate();
   const { user, setUser } = useAuth();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async (e) => {
  e.preventDefault();

  const withdrawAmount = Number(amount);

  // Validate amount
  if (!amount || withdrawAmount <= 0) {
    toast.error("Please enter a valid amount.");
    return;
  }

  // Maximum withdrawal per transaction
  if (withdrawAmount > 10000000) {
    toast.error("Maximum withdrawal is $10,000,000.");
    return;
  }

  try {
    setLoading(true);

    const res = await API.post("/transaction/withdraw", {
      amount: withdrawAmount,
    });

    setUser({
      ...user,
      balance: res.data.balance,
    });

    toast.success(res.data.message);

    navigate("/dashboard");
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
        "Withdrawal failed"
    );
  } finally {
    setLoading(false);
  }
};
  return (
   <div className="min-h-screen bg-gray-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <form onSubmit={handleWithdraw} className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Withdraw Money</h1>

        <input
          type="number"
          placeholder="Amount"
          min="1"
          max="10000000"
          step="0.01"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="mt-8 w-full rounded-xl bg-gray-100 dark:bg-slate-800 p-4 text-slate-900 dark:text-white"
          required
        />

        <button
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-red-500 py-4 font-bold text-slate-900 dark:text-white"
        >
          {loading ? "Processing..." : "Withdraw"}
        </button>
      </form>
    </div>
  );
}

export default Withdraw;
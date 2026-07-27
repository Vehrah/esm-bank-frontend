import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Deposit() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeposit = async (e) => {
  e.preventDefault();

  const depositAmount = Number(amount);

  if (isNaN(depositAmount) || depositAmount <= 0) {
    return toast.error("Enter a valid deposit amount.");
  }

  if (depositAmount > 10000000) {
    return toast.error("Maximum deposit is ₦10,000,000.");
  }

  try {
    setLoading(true);

    const res = await API.post("/transaction/deposit", {
      amount: depositAmount,
    });

    setUser({
      ...user,
      balance: res.data.balance,
    });

    toast.success(res.data.message);

    navigate("/dashboard");
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Deposit failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <form onSubmit={handleDeposit} className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Deposit Money
        </h1>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          min="1"
          max="10000000"
          step="0.01"
          onChange={(e) => {
            const value = e.target.value;

            if (value === "" || Number(value) <= 10000000) {
              setAmount(value);
            }
          }}
          className="mt-8 w-full rounded-xl bg-gray-100 dark:bg-slate-800 p-4 text-slate-900 dark:text-white"
          required
       />

        <button
          disabled={loading || !amount}
          className="mt-6 w-full rounded-xl bg-green-500 py-4 font-bold text-slate-900 dark:text-white"
        >
          {loading ? "Processing..." : "Deposit"}
        </button>
      </form>
    </div>
  );
}

export default Deposit;
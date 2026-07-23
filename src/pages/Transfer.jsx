import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/authService";

function Transfer() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    to: "",
    amount: "",
    description: "",
  });

  const [accountName, setAccountName] = useState("");
  const [loading, setLoading] = useState(false);

  const reference =
    "RIA-" +
    Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchAccountName = async (accountNumber) => {
    if (accountNumber.length !== 10) {
      setAccountName("");
      return;
    }

    try {
      const res = await API.get(
        `/transaction/name-enquiry/${accountNumber}`
      );

      setAccountName(
        res.data.accountName ||
          res.data.name ||
          "Account Found"
      );
    } catch (err) {
      setAccountName("Account not found");
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

     const res = await API.post(
  "/transaction/transfer",
  formData
);

// Update balance in context
setUser({
  ...user,
  balance: res.data.balance,
});

toast.success(res.data.message);

setShowConfirm(false);

navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Transfer failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-slate-900 dark:bg-slate-950 dark:text-white">

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setShowConfirm(true);
        }}
        className="mx-auto w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-900"
      >
        <h1 className="text-2xl font-bold sm:text-3xl">
          Transfer Money
        </h1>

        <input
          type="text"
          name="to"
          placeholder="Recipient Account Number"
          value={formData.to}
          onChange={(e) => {
            handleChange(e);
            fetchAccountName(e.target.value);
          }}
          maxLength={10}
          className="mt-8 w-full rounded-xl bg-gray-100 p-4 outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-slate-800"
          required
        />

        {accountName && (
          <div className="mt-3 rounded-xl bg-gray-100 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-500">
              Recipient Name
            </p>

            <p
              className={`font-semibold ${
                accountName === "Account not found"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {accountName}
            </p>
          </div>
        )}

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="mt-5 w-full rounded-xl bg-gray-100 p-4 outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-slate-800"
          required
        />

        <textarea
          name="description"
          placeholder="Description (Optional)"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-5 w-full rounded-xl bg-gray-100 p-4 outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-slate-800"
        />

        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">

          <h2 className="mb-4 text-lg font-semibold">
            Transfer Summary
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span className="text-slate-500">
                Recipient
              </span>

              <span className="font-semibold">
                {accountName || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">
                Amount
              </span>

              <span className="font-semibold">
                $
                {formData.amount
                  ? Number(formData.amount).toLocaleString()
                  : "0"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">
                Transfer Fee
              </span>

              <span className="text-green-600">
                Free
              </span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>

              <span>
                $
                {formData.amount
                  ? Number(formData.amount).toLocaleString()
                  : "0"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">
                Reference
              </span>

              <span className="font-semibold">
                {reference}
              </span>
            </div>

          </div>

        </div>

        <button
          type="submit"
          disabled={
            loading ||
            accountName === "" ||
            accountName === "Account not found"
          }
          className="mt-8 w-full rounded-xl bg-yellow-500 py-4 font-bold text-slate-900 transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
        </button>

      </form>

      {showConfirm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">

            <h2 className="mb-6 text-2xl font-bold">
              Confirm Transfer
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Recipient</span>
                <strong>{accountName}</strong>
              </div>

              <div className="flex justify-between">
                <span>Account</span>
                <strong>{formData.to}</strong>
              </div>

              <div className="flex justify-between">
                <span>Amount</span>
                <strong>
                  $
                  {Number(formData.amount).toLocaleString()}
                </strong>
              </div>

              <div className="flex justify-between">
                <span>Reference</span>
                <strong>{reference}</strong>
              </div>

            </div>

            <div className="mt-8 flex gap-3">

              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-xl border py-3"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 rounded-xl bg-yellow-500 py-3 font-bold text-slate-900 hover:bg-yellow-400"
              >
                {loading
                  ? "Sending..."
                  : "Confirm Transfer"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Transfer;
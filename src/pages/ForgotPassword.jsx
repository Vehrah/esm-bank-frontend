import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotPassword } from "../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await forgotPassword(email);

      toast.success(res.data.message);

      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-10 shadow-2xl">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Forgot Password
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Enter your email to receive a password reset link.
        </p>

        <div className="mt-8">
          <label className="text-slate-700 dark:text-slate-300">
            Email
          </label>

          <input
            type="email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="mt-2 w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-950 p-4 text-slate-900 dark:text-white outline-none focus:border-yellow-500"
          />
        </div>

        <button
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-yellow-500 py-4 font-semibold text-slate-900"
        >
          {loading
            ? "Sending..."
            : "Send Reset Link"}
        </button>

        <p className="mt-6 text-center text-slate-400">
          <Link
            to="/login"
            className="text-yellow-500"
          >
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;
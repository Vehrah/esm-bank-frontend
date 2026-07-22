import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword } from "../services/authService";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    if (password.length < 8) {
      return toast.error(
        "Password must be at least 8 characters."
      );
    }

    try {
      setLoading(true);

      const res = await resetPassword(token, password);

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950 px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-10 shadow-2xl">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Reset Password</h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">Enter your new password.</p>

        <div className="mt-8">
          <label className="text-slate-300">
            New Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            className="mt-2 w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-950 p-4 text-slate-900 dark:text-white outline-none focus:border-yellow-500"
          />
        </div>

        <div className="mt-6">
          <label className="text-slate-300">
            Confirm Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
            className="mt-2 w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-950 p-4 text-slate-900 dark:text-white outline-none focus:border-yellow-500"
          />
        </div>

        <button
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-yellow-500 py-4 font-semibold text-slate-900 hover:bg-yellow-400"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>

        <p className="mt-6 text-center">
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

export default ResetPassword;
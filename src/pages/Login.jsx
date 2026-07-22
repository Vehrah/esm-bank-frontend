import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginUser(formData);

      login(res.data.user, res.data.token);

      toast.success("Login successful");

      navigate("/dashboard");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950 px-6">

      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-10 shadow-2xl">

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">Login to your Esm Bank account</p>

        <div className="mt-8">

          <label className="text-slate-700 dark:text-slate-300">
            Email
          </label>

          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-950 p-4 text-slate-900 dark:text-white outline-none focus:border-yellow-500"
          />

        </div>

        <div className="mt-6">

          <label className="text-slate-700 dark:text-slate-300">
            Password
          </label>

          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-950 p-4 text-slate-900 dark:text-white outline-none focus:border-yellow-500"
          />

        </div>
        <div className="mt-2 text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-yellow-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-yellow-500 py-4 font-semibold text-slate-900 transition hover:bg-yellow-400"
        >
          {loading ? "Signing In..." : "Login"}
        </button>

        <p className="mt-8 text-center text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-yellow-500"
          >
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;
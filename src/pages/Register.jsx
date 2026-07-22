import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bvn: "",
    password: "",
    confirmPassword: "",
  });

 const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]:
      name === "email"
        ? value.trim().toLowerCase()
        : value,
  }));
};

 const handleSubmit = async (e) => {
  e.preventDefault();

  // First Name
  if (
  !/^[A-Za-z]+([ '-][A-Za-z]+)*$/.test(
    formData.firstName.trim()
  )
) {
  return toast.error(
    "Enter a valid first name."
  );
}

  // Last Name
 if (
  !/^[A-Za-z]+([ '-][A-Za-z]+)*$/.test(
    formData.lastName.trim()
  )
) {
  return toast.error(
    "Enter a valid last name."
  );
}

  // Email
  if (!formData.email.trim()) {
    return toast.error("Email is required.");
  }

  // BVN
  if (!/^\d{11}$/.test(formData.bvn)) {
    return toast.error("BVN must be exactly 11 digits.");
  }

  // Password
  if (formData.password.length < 8) {
    return toast.error(
      "Password must be at least 8 characters."
    );
  }

  // Confirm Password
  if (formData.password !== formData.confirmPassword) {
    return toast.error("Passwords do not match.");
  }

  try {
    setLoading(true);

    const response = await registerUser({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      bvn: formData.bvn,
      password: formData.password,
    });

    toast.success(response.data.message);

    navigate("/login");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Registration failed."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950 px-6 py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 p-10 shadow-2xl">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Create Account</h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">Open your Esm Bank account today.</p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div>
            <label className="text-slate-700 dark:text-slate-300">First Name</label>

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              pattern="[A-Za-z ]+"
              title="Only letters are allowed"
              className="mt-2 w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-950 p-4 text-slate-900 dark:text-white outline-none focus:border-yellow-500"
/>
          </div>

          <div>
            <label className="text-slate-700 dark:text-slate-300">Last Name</label>

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              pattern="[A-Za-z ]+"
              title="Only letters are allowed"
              className="mt-2 w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-950 p-4 text-slate-900 dark:text-white outline-none focus:border-yellow-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="text-slate-700 dark:text-slate-300">Email Address</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-950 p-4 text-slate-900 dark:text-white outline-none focus:border-yellow-500"
          />
        </div>

        <div className="mt-6">
          <label className="text-slate-700 dark:text-slate-300">BVN</label>

          <input
            type="text"
            name="bvn"
            value={formData.bvn}
            onChange={handleChange}
            maxLength={11}
            required
            className="mt-2 w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-950 p-4 text-slate-900 dark:text-white outline-none focus:border-yellow-500"
          />
        </div>

        <div className="mt-6">
          <label className="text-slate-700 dark:text-slate-300">Password</label>

          <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="mt-2 w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-950 p-4 text-slate-900 dark:text-white outline-none focus:border-yellow-500"
/>
        </div>

        <div className="mt-6">
          <label className="text-slate-700 dark:text-slate-300">Confirm Password</label>

          <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="mt-2 w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-950 p-4 text-slate-900 dark:text-white outline-none focus:border-yellow-500"
/>
        </div>

        <button
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-yellow-500 py-4 font-semibold text-slate-900 transition hover:bg-yellow-400"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="mt-8 text-center text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-yellow-500"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
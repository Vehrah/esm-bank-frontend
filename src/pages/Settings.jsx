import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";

function Settings() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully.");
  };

  const changePassword = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    toast.success("Password updated.");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-4xl font-bold text-slate-900 dark:text-white">
          Settings
        </h1>

        {/* Profile */}

        <div className="rounded-3xl bg-gray-100 p-8 shadow-xl dark:bg-slate-800">

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Profile Information
          </h2>

          <form
            onSubmit={updateProfile}
            className="mt-6 grid gap-5 md:grid-cols-2"
          >
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="rounded-xl bg-white dark:bg-slate-800 p-4 text-slate-900 dark:text-white"
            />

            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="rounded-xl bg-white dark:bg-slate-800 p-4 text-slate-900 dark:text-white"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-xl bg-white dark:bg-slate-800 p-4 text-slate-900 dark:text-white md:col-span-2"
            />

            <button className="rounded-xl bg-yellow-500 py-3 font-bold text-slate-900 dark:text-white">
              Save Changes
            </button>
          </form>

        </div>

        {/* Security */}

        <div className="mt-8 rounded-3xl bg-gray-100 p-8 shadow-xl dark:bg-slate-800">

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Security
          </h2>

          <form
            onSubmit={changePassword}
            className="mt-6 space-y-5"
          >
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full rounded-xl bg-white dark:bg-slate-800 p-4 text-slate-900 dark:text-white"
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full rounded-xl bg-white dark:bg-slate-800 p-4 text-slate-900 dark:text-white"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-xl bg-white dark:bg-slate-800 p-4 text-slate-900 dark:text-white"
            />

            <button className="rounded-xl bg-yellow-500 px-8 py-3 font-bold text-slate-900 dark:text-white">
              Change Password
            </button>
          </form>

        </div>

        {/* Preferences */}

        <div className="mt-8 rounded-3xl bg-gray-100 p-8 shadow-xl dark:bg-slate-800">

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Preferences
          </h2>

          <div className="mt-6 space-y-6">

            <label className="flex items-center justify-between">
              <span>Email Notifications</span>
              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex items-center justify-between">
              <span>SMS Notifications</span>
              <input type="checkbox" />
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <span>Theme</span>

              <button
                onClick={toggleTheme}
                type="button"
                className="rounded-xl bg-yellow-500 px-6 py-3 font-bold text-slate-900"
              >
                {theme === "dark"
                  ? "☀️ Light Mode"
                  : "🌙 Dark Mode"}
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Settings;
import { FaCog, FaBell, FaShieldAlt, FaUserShield } from "react-icons/fa";

export default function Settings() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Configure your bank administration settings.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <div className="mb-4 flex items-center gap-3">
            <FaUserShield className="text-2xl text-blue-600" />
            <h2 className="text-xl font-semibold">Security</h2>
          </div>

          <button className="mb-3 w-full rounded-2xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">Change Admin Password</button>
          <button className="w-full rounded-2xl border border-blue-600 py-3 font-semibold text-blue-600 transition hover:bg-blue-50 dark:hover:bg-blue-500/10">Enable Two-Factor Authentication</button>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <div className="mb-4 flex items-center gap-3">
            <FaBell className="text-2xl text-amber-500" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>

          <label className="mb-3 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <span>Email Notifications</span>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300" />
          </label>

          <label className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <span>Transaction Alerts</span>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300" />
          </label>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <div className="mb-4 flex items-center gap-3">
            <FaShieldAlt className="text-2xl text-emerald-600" />
            <h2 className="text-xl font-semibold">System</h2>
          </div>

          <button className="mb-3 w-full rounded-2xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700">Backup Database</button>
          <button className="w-full rounded-2xl border border-emerald-600 py-3 font-semibold text-emerald-600 transition hover:bg-emerald-50 dark:hover:bg-emerald-500/10">Clear Cache</button>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <div className="mb-4 flex items-center gap-3">
            <FaCog className="text-2xl text-slate-700 dark:text-slate-300" />
            <h2 className="text-xl font-semibold">Application</h2>
          </div>

          <p className="mb-2 text-slate-600 dark:text-slate-400">Version</p>
          <p className="mb-4 font-semibold">Esm Bank v1.0.0</p>
          <button className="w-full rounded-2xl bg-slate-800 py-3 font-semibold text-white transition hover:bg-black dark:bg-slate-700 dark:hover:bg-slate-600">Save Settings</button>
        </div>
      </div>
    </div>
  );
}
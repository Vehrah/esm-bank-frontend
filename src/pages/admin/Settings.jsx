import { FaCog, FaBell, FaShieldAlt, FaUserShield } from "react-icons/fa";

export default function Settings() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-slate-500">
          Configure your bank administration settings.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-4 flex items-center gap-3">
            <FaUserShield className="text-2xl text-blue-600" />
            <h2 className="text-xl font-semibold">
              Security
            </h2>
          </div>

          <button className="mb-3 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
            Change Admin Password
          </button>

          <button className="w-full rounded-lg border border-blue-600 py-3 font-semibold text-blue-600 hover:bg-blue-50">
            Enable Two-Factor Authentication
          </button>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-4 flex items-center gap-3">
            <FaBell className="text-2xl text-yellow-500" />
            <h2 className="text-xl font-semibold">
              Notifications
            </h2>
          </div>

          <label className="mb-3 flex items-center justify-between">
            <span>Email Notifications</span>
            <input type="checkbox" defaultChecked />
          </label>

          <label className="flex items-center justify-between">
            <span>Transaction Alerts</span>
            <input type="checkbox" defaultChecked />
          </label>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-4 flex items-center gap-3">
            <FaShieldAlt className="text-2xl text-green-600" />
            <h2 className="text-xl font-semibold">
              System
            </h2>
          </div>

          <button className="mb-3 w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700">
            Backup Database
          </button>

          <button className="w-full rounded-lg border border-green-600 py-3 font-semibold text-green-600 hover:bg-green-50">
            Clear Cache
          </button>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-4 flex items-center gap-3">
            <FaCog className="text-2xl text-slate-700" />
            <h2 className="text-xl font-semibold">
              Application
            </h2>
          </div>

          <p className="mb-2 text-slate-600">
            Version
          </p>

          <p className="mb-4 font-semibold">
            Ria Bank v1.0.0
          </p>

          <button className="w-full rounded-lg bg-slate-800 py-3 font-semibold text-white hover:bg-black">
            Save Settings
          </button>
        </div>

      </div>

    </div>
  );
}
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaLock,
  FaLockOpen,
  FaSyncAlt,
} from "react-icons/fa";

export default function Accounts() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const freezeAccount = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `/api/admin/freeze/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const unfreezeAccount = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `/api/admin/unfreeze/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Account Management</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Freeze or unfreeze customer accounts.</p>
        </div>

        <button
          onClick={fetchUsers}
          className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <FaSyncAlt />
          Refresh
        </button>
      </div>

      <div className="w-full overflow-x-auto rounded-[24px] border border-slate-200 bg-white shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        {loading ? (
          <div className="p-10 text-center text-slate-500 dark:text-slate-400">Loading accounts...</div>
        ) : (
          <table className="min-w-[1100px] w-full">
            <thead className="bg-slate-100 dark:bg-slate-800/90">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Account Number</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Balance</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t border-slate-200/70 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/70">
                  <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">{user.firstName} {user.lastName}</td>
                  <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">{user.accountNumber}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-200">${user.balance.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {user.isFrozen ? (
                      <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-500/15 dark:text-rose-400">Frozen</span>
                    ) : (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">Active</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.isFrozen ? (
                      <button onClick={() => unfreezeAccount(user._id)} className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700">
                        <FaLockOpen />
                        Unfreeze
                      </button>
                    ) : (
                      <button onClick={() => freezeAccount(user._id)} className="flex items-center gap-2 rounded-2xl bg-rose-600 px-4 py-2 text-white transition hover:bg-rose-700">
                        <FaLock />
                        Freeze
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
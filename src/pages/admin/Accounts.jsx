import { useEffect, useState } from "react";
import API from "../../services/authService";
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
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const freezeAccount = async (id) => {
    try {
      await API.patch(`/admin/freeze/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const unfreezeAccount = async (id) => {
    try {
      await API.patch(`/admin/unfreeze/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Account Management
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Freeze or unfreeze customer accounts.
          </p>
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
          <div className="p-10 text-center text-slate-500 dark:text-slate-400">
            Loading accounts...
          </div>
        ) : (
          <table className="min-w-[1100px] w-full">
            <thead className="bg-slate-100 dark:bg-slate-800/90">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Account Number
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Balance
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-slate-200 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                >
                  <td className="px-6 py-4">
                    {user.firstName} {user.lastName}
                  </td>

                  <td className="px-6 py-4">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    {user.accountNumber}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    $
                    {(user.balance || 0).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    {user.isFrozen ? (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        Frozen
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Active
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {user.isFrozen ? (
                      <button
                        onClick={() => unfreezeAccount(user._id)}
                        className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                      >
                        <FaLockOpen />
                        Unfreeze
                      </button>
                    ) : (
                      <button
                        onClick={() => freezeAccount(user._id)}
                        className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                      >
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
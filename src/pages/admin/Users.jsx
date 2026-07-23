import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-8 text-slate-900 dark:text-slate-100">
      <h1 className="mb-6 text-3xl font-semibold">Users</h1>

      <div className="relative mb-6">
        <FaSearch className="pointer-events-none absolute left-4 top-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-yellow-500 dark:focus:ring-yellow-500/20"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="w-full overflow-x-auto rounded-[24px] border border-slate-200 bg-white shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <table className="min-w-[1100px] w-full">
          <thead className="bg-slate-100 dark:bg-slate-800/90">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Account No</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Balance</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">Role</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-t border-slate-200/70 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/70">
                <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">{user.firstName} {user.lastName}</td>
                <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">{user.email}</td>
                <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">{user.accountNumber}</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-200">${user.balance.toLocaleString()}</td>
                <td className="px-6 py-4">
                  {user.isVerified ? (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                      Verified
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-200">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
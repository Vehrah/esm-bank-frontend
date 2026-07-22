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
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Account Management
          </h1>

          <p className="mt-2 text-slate-500">
            Freeze or unfreeze customer accounts.
          </p>
        </div>

        <button
          onClick={fetchUsers}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <FaSyncAlt />
          Refresh
        </button>

      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">

        {loading ? (

          <div className="p-10 text-center">
            Loading accounts...
          </div>

        ) : (

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>
                <th className="px-6 py-4 text-left">
                  Name
                </th>

                <th className="px-6 py-4 text-left">
                  Email
                </th>

                <th className="px-6 py-4 text-left">
                  Account Number
                </th>

                <th className="px-6 py-4 text-left">
                  Balance
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>

                <th className="px-6 py-4 text-left">
                  Action
                </th>
              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr
                  key={user._id}
                  className="border-t hover:bg-slate-50"
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

                  <td className="px-6 py-4">
                    ${user.balance.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">

                    {user.isFrozen ? (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-red-700">
                        Frozen
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                        Active
                      </span>
                    )}

                  </td>

                  <td className="px-6 py-4">

                    {user.isFrozen ? (

                      <button
                        onClick={() =>
                          unfreezeAccount(user._id)
                        }
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                      >
                        <FaLockOpen />
                        Unfreeze
                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          freezeAccount(user._id)
                        }
                        className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
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
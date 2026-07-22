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
    <div className="p-8">

      <h1 className="mb-6 text-3xl font-bold">
        Users
      </h1>

      <div className="mb-6 relative">
        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search users..."
          className="w-full rounded-lg border pl-11 pr-4 py-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow">

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
                Account No
              </th>

              <th className="px-6 py-4 text-left">
                Balance
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Role
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr
                key={user._id}
                className="border-t"
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
                  {user.isVerified ? (
                    <span className="rounded bg-green-100 px-3 py-1 text-green-700">
                      Verified
                    </span>
                  ) : (
                    <span className="rounded bg-yellow-100 px-3 py-1 text-yellow-700">
                      Pending
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  {user.role}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
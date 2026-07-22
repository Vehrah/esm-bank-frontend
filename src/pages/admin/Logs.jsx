import { useEffect, useState } from "react";
import axios from "axios";
import { FaSyncAlt } from "react-icons/fa";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get("/api/admin/logs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLogs(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Audit Logs
          </h1>

          <p className="mt-2 text-slate-500">
            View recent banking activities.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <FaSyncAlt />
          Refresh
        </button>

      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">

        {loading ? (

          <div className="p-10 text-center">
            Loading logs...
          </div>

        ) : (

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>
                <th className="px-6 py-4 text-left">
                  Date
                </th>

                <th className="px-6 py-4 text-left">
                  Sender
                </th>

                <th className="px-6 py-4 text-left">
                  Receiver
                </th>

                <th className="px-6 py-4 text-left">
                  Type
                </th>

                <th className="px-6 py-4 text-left">
                  Amount
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>
              </tr>

            </thead>

            <tbody>

              {logs.map((log) => (

                <tr
                  key={log._id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-6 py-4">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    {log.sender
                      ? `${log.sender.firstName} ${log.sender.lastName}`
                      : "-"}
                  </td>

                  <td className="px-6 py-4">
                    {log.receiver
                      ? `${log.receiver.firstName} ${log.receiver.lastName}`
                      : "-"}
                  </td>

                  <td className="px-6 py-4 capitalize">
                    {log.type}
                  </td>

                  <td className="px-6 py-4">
                    ${log.amount.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    {log.status}
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
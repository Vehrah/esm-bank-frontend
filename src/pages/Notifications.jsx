import { useEffect, useState } from "react";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../services/authService";
import toast from "react-hot-toast";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await getNotifications();
      setNotifications(res.data);
    } catch {
      toast.error("Unable to load notifications.");
    }
  };

  const markRead = async (id) => {
    await markNotificationAsRead(id);
    loadNotifications();
  };

  const markAll = async () => {
    await markAllNotificationsAsRead();
    loadNotifications();
  };

  const removeNotification = async (id) => {
    await deleteNotification(id);
    loadNotifications();
  };

  return (
    <div className="mx-auto max-w-4xl p-6">

      <div className="mb-6 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Notifications
        </h1>

        <button
          onClick={markAll}
          className="rounded-xl bg-yellow-500 px-4 py-2 font-semibold"
        >
          Mark All Read
        </button>

      </div>

      {notifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        notifications.map((item) => (
          <div
            key={item._id}
            className={`mb-4 rounded-2xl border p-5 ${
              item.isRead
                ? "bg-white dark:bg-slate-900"
                : "bg-yellow-50 dark:bg-slate-800"
            }`}
          >
            <h3 className="font-bold">
              {item.title}
            </h3>

            <p className="mt-2">
              {item.message}
            </p>

            <div className="mt-4 flex gap-3">

              {!item.isRead && (
                <button
                  onClick={() => markRead(item._id)}
                  className="rounded-lg bg-green-500 px-4 py-2 text-white"
                >
                  Mark Read
                </button>
              )}

              <button
                onClick={() =>
                  removeNotification(item._id)
                }
                className="rounded-lg bg-red-500 px-4 py-2 text-white"
              >
                Delete
              </button>

            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default Notifications;
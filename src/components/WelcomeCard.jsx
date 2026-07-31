import { useAuth } from "../context/AuthContext";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNotifications } from "../services/authService";

function WelcomeCard() {
  const { user } = useAuth();

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
  loadNotifications();

  const interval = setInterval(() => {
    loadNotifications();
  }, 5000); // every 5 seconds

  return () => clearInterval(interval);
}, []);

  const loadNotifications = async () => {
  try {
    const res = await getNotifications();

    setUnreadCount(
      res.data.filter((item) => !item.isRead).length
    );
  } catch (err) {
    console.error("Notification Error:", err);
  }
};

  return (
    <div className="flex items-center justify-between rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900">

      {/* Left Side */}
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Good Morning 👋
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
          {user?.firstName} {user?.lastName}
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Welcome back to ESM Bank.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        {/* Notification Bell */}
        <Link
          to="/notifications"
          className="relative rounded-full bg-slate-100 p-3 transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          <FaBell className="text-xl text-slate-700 dark:text-white" />

          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* Profile Picture */}
        <img
          src={
            user?.profilePicture ||
            `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user?.firstName}+${user?.lastName}`
          }
          alt="Profile"
          className="h-16 w-16 rounded-full border-2 border-yellow-500 object-cover shadow-md"
        />

      </div>

    </div>
  );
}

export default WelcomeCard;
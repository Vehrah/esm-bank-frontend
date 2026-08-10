import { useAuth } from "../context/AuthContext";
import { FaBell, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getNotifications,
  upgradeAccountTier,
} from "../services/authService";
import toast from "react-hot-toast";

function WelcomeCard() {
  const { user } = useAuth();

  const [unreadCount, setUnreadCount] = useState(0);
  const [upgrading, setUpgrading] = useState(false);

  const [accountTier, setAccountTier] = useState(
    user?.accountTier || "Basic"
  );

  const [balance, setBalance] = useState(
    user?.balance || 0
  );

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (user) {
      setAccountTier(user.accountTier || "Basic");
      setBalance(user.balance || 0);
    }
  }, [user]);

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

  const handleUpgrade = async () => {
    const nextTier =
      accountTier === "Basic"
        ? "Gold"
        : accountTier === "Gold"
        ? "Platinum"
        : null;

    if (!nextTier) {
      return;
    }

    const upgradeFee =
      nextTier === "Gold" ? 10 : 25;

    if (balance < upgradeFee) {
      toast.error(
        `You need $${upgradeFee} to upgrade to ${nextTier}.`
      );
      return;
    }

    const confirmed = window.confirm(
      `Upgrade to ${nextTier} for $${upgradeFee}?\n\n` +
      `Available balance: $${Number(balance).toLocaleString()}\n` +
      `Balance after upgrade: $${Number(
        balance - upgradeFee
      ).toLocaleString()}`
    );

    if (!confirmed) return;

    try {
      setUpgrading(true);

      const res = await upgradeAccountTier({
        tier: nextTier,
      });

      setAccountTier(res.data.accountTier);
      setBalance(res.data.balance);

      toast.success(
        `Your account has been upgraded to ${nextTier}.`
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to upgrade account."
      );
    } finally {
      setUpgrading(false);
    }
  };

  const nextTier =
    accountTier === "Basic"
      ? "Gold"
      : accountTier === "Gold"
      ? "Platinum"
      : null;

  const upgradeFee =
    nextTier === "Gold"
      ? 10
      : nextTier === "Platinum"
      ? 25
      : null;

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

        {/* Account Tier */}
        <div className="mt-4 flex items-center gap-3">

          <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-sm font-semibold text-yellow-600 dark:text-yellow-400">
            {accountTier} Tier
          </span>

          {nextTier && (
            <button
              onClick={handleUpgrade}
              disabled={upgrading}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-yellow-500 dark:text-slate-300 dark:hover:text-yellow-400"
            >
              {upgrading
                ? "Upgrading..."
                : `Upgrade to ${nextTier} · $${upgradeFee}`}

              {!upgrading && (
                <FaChevronRight className="text-xs" />
              )}
            </button>
          )}

          {!nextTier && (
            <span className="text-sm text-slate-400">
              Highest tier
            </span>
          )}

        </div>
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
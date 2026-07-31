import { useAuth } from "../context/AuthContext";

function WelcomeCard() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between rounded-3xl bg-white p-6 shadow-xl dark:bg-slate-900">

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

      <img
        src={
          user?.profilePicture ||
          `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user?.firstName}+${user?.lastName}`
        }
        alt="Profile"
        className="h-16 w-16 rounded-full border-2 border-yellow-500 object-cover"
      />

    </div>
  );
}

export default WelcomeCard;
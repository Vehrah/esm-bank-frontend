import { useAuth } from "../context/AuthContext";

function WelcomeCard() {
  const { user } = useAuth();

  return (
    <div className="rounded-3xl bg-gradient-to-r from-yellow-500 to-yellow-400 p-8 text-slate-900 shadow-xl">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">

        <div className="flex items-center gap-5">
          <img
            src={
              user?.profilePicture ||
              `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user?.firstName}+${user?.lastName}`
            }
            alt="Profile"
            className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
          />

          <div>
            <h2 className="text-3xl font-bold">
              Welcome back,
            </h2>

            <p className="mt-1 text-2xl font-semibold">
              {user?.firstName} {user?.lastName} 👋
            </p>

            <p className="mt-2 text-sm opacity-80">
              {user?.email}
            </p>

            <span className="mt-4 inline-block rounded-full bg-white/30 px-4 py-1 text-sm font-semibold backdrop-blur">
              {user?.accountTier || "Basic"} Account
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-white/20 px-6 py-4 text-center backdrop-blur">
          <p className="text-sm font-medium">
            Current Balance
          </p>

          <h3 className="mt-1 text-3xl font-bold">
            $
            {user?.balance?.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            ) || "0.00"}
          </h3>
        </div>

      </div>

      <p className="mt-8 text-base opacity-90">
        Manage your money securely with ESM Bank.
      </p>
    </div>
  );
}

export default WelcomeCard;
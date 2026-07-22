import { useAuth } from "../context/AuthContext";

function WelcomeCard() {
  const { user } = useAuth();

  return (
    <div className="rounded-3xl bg-gradient-to-r from-yellow-500 to-yellow-400 p-8 text-slate-900 shadow-xl">
      <h2 className="text-3xl font-bold">
        Welcome back,
      </h2>

      <p className="mt-2 text-xl font-semibold">
        {user?.firstName} {user?.lastName} 👋
      </p>

      <p className="mt-4">
        Manage your money securely with ESM Bank.
      </p>
    </div>
  );
}

export default WelcomeCard;
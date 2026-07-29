import WelcomeCard from "../components/WelcomeCard";
import BalanceCard from "../components/BalanceCard";
import QuickActions from "../components/QuickActions";
import RecentTransactions from "../components/RecentTransactions";
import LogoutButton from "../components/LogoutButton";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <div className="mx-auto max-w-7xl space-y-8">

        <WelcomeCard />

        <BalanceCard />

        <QuickActions />

        <RecentTransactions />

        <LogoutButton />

      </div>
    </div>
  );
}

export default Dashboard;
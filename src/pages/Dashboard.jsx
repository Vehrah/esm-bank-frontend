import WelcomeCard from "../components/WelcomeCard";
import BalanceCard from "../components/BalanceCard";
import QuickActions from "../components/QuickActions";
import RecentTransactions from "../components/RecentTransactions";
import ProfileShortcut from "../components/ProfileShortcut";
import LogoutButton from "../components/LogoutButton";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl space-y-8">

        <ProfileShortcut />

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
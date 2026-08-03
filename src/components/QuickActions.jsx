import { Link } from "react-router-dom";
import {
  FaExchangeAlt,
  FaMoneyBillWave,
  FaWallet,
  FaHistory,
  FaCog,
  FaUserCircle,
  FaCreditCard,
} from "react-icons/fa";

function QuickActions() {
 const actions = [
  {
    title: "Transfer",
    link: "/transfer",
    icon: <FaExchangeAlt />,
  },
  {
    title: "Deposit",
    link: "/deposit",
    icon: <FaMoneyBillWave />,
  },
  {
    title: "Withdraw",
    link: "/withdraw",
    icon: <FaWallet />,
  },
  {
    title: "History",
    link: "/transactions",
    icon: <FaHistory />,
  },
  {
    title: "Profile",
    link: "/profile",
    icon: <FaUserCircle />,
  },
  {
    title: "Settings",
    link: "/settings",
    icon: <FaCog />,
  },
  {
  title: "Cards",
  link: "/cards",
  icon: <FaCreditCard />,
},
];

  return (
    <section>
      <div className="mb-5 flex items-center justify-between">

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Access your banking tools instantly
        </p>
      </div>

      <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.link}
            className="group rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-900"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-3xl text-yellow-600 transition-all duration-300 group-hover:bg-yellow-500 group-hover:text-white dark:bg-yellow-500/10 dark:text-yellow-400 dark:group-hover:bg-yellow-500">
              {action.icon}
            </div>

            <h3 className="mt-6 text-lg font-semibold text-slate-900 dark:text-white">
              {action.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Open {action.title.toLowerCase()}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;
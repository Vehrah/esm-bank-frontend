import { Link } from "react-router-dom";

function QuickActions() {
  const actions = [
    {
      title: "Transfer",
      link: "/transfer",
      icon: "💸",
    },
    {
      title: "Deposit",
      link: "/deposit",
      icon: "💰",
    },
    {
      title: "Withdraw",
      link: "/withdraw",
      icon: "🏧",
    },
    {
      title: "History",
      link: "/transactions",
      icon: "📄",
    },

    {
        title: "Settings",
        link: "/settings",
        icon: "⚙️",
      },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => (
        <Link
          key={action.title}
          to={action.link}
          className="flex flex-col items-center justify-center rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-gray-100 dark:hover:bg-slate-800"
        >
          <div className="text-5xl">
            {action.icon}
          </div>

          <p className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
            {action.title}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default QuickActions;
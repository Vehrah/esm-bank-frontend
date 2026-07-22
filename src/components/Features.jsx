import {
  FaLock,
  FaGlobe,
  FaBolt,
  FaChartLine,
} from "react-icons/fa";

const features = [
  {
    icon: <FaLock size={28} />,
    title: "Bank-Level Security",
    text: "Your funds and personal information are protected using advanced encryption and security standards.",
  },
  {
    icon: <FaBolt size={28} />,
    title: "Instant Transfers",
    text: "Move money quickly with fast, reliable domestic and international transfers.",
  },
  {
    icon: <FaGlobe size={28} />,
    title: "Global Banking",
    text: "Access your accounts securely from anywhere in the world.",
  },
  {
    icon: <FaChartLine size={28} />,
    title: "Smart Insights",
    text: "Track spending, monitor balances, and understand your finances in real time.",
  },
];

function Features() {
  return (
    <section id="features" className="bg-gray-50 dark:bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <p className="text-yellow-500 font-semibold uppercase">
            Features
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
            Everything You Need.
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Banking designed for speed,
            security and simplicity.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition hover:-translate-y-2 hover:border-yellow-500"
            >

              <div className="text-yellow-500">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                {feature.text}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;
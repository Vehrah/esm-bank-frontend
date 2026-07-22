import {
  FaCreditCard,
  FaMoneyCheckAlt,
  FaPiggyBank,
  FaGlobe,
} from "react-icons/fa";

const services = [
  {
    icon: <FaCreditCard size={30} />,
    title: "Premium Cards",
    description:
      "Virtual and physical cards designed for secure payments worldwide.",
  },
  {
    icon: <FaMoneyCheckAlt size={30} />,
    title: "Instant Transfers",
    description:
      "Transfer funds between accounts quickly with real-time processing.",
  },
  {
    icon: <FaPiggyBank size={30} />,
    title: "Savings",
    description:
      "Grow your money with secure savings plans and smart financial tools.",
  },
  {
    icon: <FaGlobe size={30} />,
    title: "Global Payments",
    description:
      "Send and receive money internationally with ease.",
  },
];

function Services() {
  return (
    <section id="services" className="bg-gray-50 dark:bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <p className="font-semibold uppercase tracking-widest text-yellow-500">
            Services
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">Premium Banking Services</h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
            Everything you need to manage your finances securely from one
            elegant digital banking platform.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {services.map((service) => (
            <div key={service.title} className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500">
              <div className="text-yellow-500">
                {service.icon}
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white">
                {service.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                {service.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Services;
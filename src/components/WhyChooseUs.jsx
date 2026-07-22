import { FaShieldAlt, FaClock, FaGlobe, FaHeadset } from "react-icons/fa";

const reasons = [
  {
    icon: <FaShieldAlt size={28} />,
    title: "Advanced Security",
    description:
      "Multi-layer protection and encrypted transactions keep your account secure.",
  },
  {
    icon: <FaClock size={28} />,
    title: "24/7 Access",
    description:
      "Manage your finances anytime from anywhere with uninterrupted access.",
  },
  {
    icon: <FaGlobe size={28} />,
    title: "Global Reach",
    description:
      "Bank confidently whether you're at home or traveling internationally.",
  },
  {
    icon: <FaHeadset size={28} />,
    title: "Dedicated Support",
    description:
      "Our support team is ready to assist whenever you need help.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-gray-50 dark:bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <p className="text-yellow-500 font-semibold uppercase">
            Why Choose Esm Bank
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">Banking Built Around Trust</h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            We combine security, speed, and simplicity to deliver a premium
            digital banking experience.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition hover:border-yellow-500">
              <div className="text-yellow-500">
                {reason.icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                {reason.title}
              </h3>

              <p className="mt-4 text-slate-400 leading-7">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;
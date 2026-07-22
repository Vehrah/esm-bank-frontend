import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function Hero() {
  return (
    <section className="bg-gray-50 dark:bg-slate-950">
      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-16 lg:flex-row">

        {/* Left Side */}
        <div className="max-w-2xl">

          <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400">
            Premium Digital Banking
          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight text-slate-900 dark:text-white lg:text-7xl">
            Banking
            <span className="block text-yellow-500">
              Beyond Expectations
            </span>
          </h1>

          <p className="mt-8 text-lg leading-8 text-slate-900 dark:text-white">
            Experience secure banking designed for individuals and
            businesses. Send money instantly, manage your finances
            anywhere, and enjoy world-class security.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              to="/register"
              className="rounded-xl bg-yellow-500 px-7 py-4 font-semibold text-slate-900 transition hover:scale-105 hover:bg-yellow-400"
            >
              Open Account
            </Link>

            <Link
              to="/login"
              className="flex items-center gap-2 rounded-xl border border-yellow-500 px-7 py-4 text-yellow-400 transition hover:bg-yellow-500 hover:text-slate-900"
            >
              Login
              <FaArrowRight />
            </Link>

          </div>

        </div>

        {/* Right Side */}

          <div className="relative">

          <div className="w-[380px] rounded-3xl border border-yellow-500/20 bg-white dark:bg-slate-900 p-8 shadow-2xl">

            <div className="flex items-center justify-between">
              <h2 className="text-slate-900 dark:text-white font-bold">
                Esm Bank
              </h2>

              <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-400">
                PREMIUM
              </span>
            </div>

            <p className="mt-10 text-slate-900 dark:text-slate-400">
              Available Balance
            </p>

            <h1 className="mt-2 text-5xl font-bold text-yellow-500">
              $245,000.00
            </h1>

            <div className="mt-10 rounded-xl bg-gray-100 dark:bg-slate-800 p-5">

              <p className="text-sm text-slate-900 dark:text-slate-400">
                Card Number
              </p>

              <h2 className="mt-2 text-xl tracking-[6px] text-slate-900 dark:text-white">
                •••• •••• •••• 4829
              </h2>

            </div>

            <div className="mt-6 flex justify-between">

              <div>
                <p className="text-sm text-slate-900 dark:text-slate-400">
                  Status
                </p>

                <p className="text-green-400">
                  Active
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  Currency
                </p>

                <p className="text-slate-900 dark:text-white">
                  USD
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function Hero() {
  return (
    <section className="bg-slate-950">
      <div className="mx-auto grid max-w-7xl items-center px-6 py-20 lg:grid-cols-1">
        
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

      </div>
    </section>
  );
}

export default Hero;
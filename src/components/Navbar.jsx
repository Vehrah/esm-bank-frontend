import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-yellow-600/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500 font-bold text-slate-900">
            E
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-wide text-slate-900 dark:text-white">
              Esm Bank
            </h1>

            <p className="text-xs text-yellow-500">
              Banking Beyond Expectations
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-slate-700 dark:text-slate-300 transition hover:text-yellow-400">
            Home
          </Link>

          <a href="#features" className="text-slate-700 dark:text-slate-300 transition hover:text-yellow-400">
            Features
          </a>

          <a href="#services" className="text-slate-700 dark:text-slate-300 transition hover:text-yellow-400">
            Services
          </a>

          <Link to="/login" className="text-slate-700 dark:text-slate-300 transition hover:text-yellow-400">
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-slate-900 transition hover:bg-yellow-400"
          >
            Open Account
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button className="text-3xl text-slate-900 dark:text-white md:hidden">
          <HiOutlineMenuAlt3 />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
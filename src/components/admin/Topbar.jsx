import { FaBell, FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { useAdminTheme } from "../../context/AdminThemeContext";

export default function Topbar({
  title = "Dashboard",
  subtitle = "Welcome back, Admin.",
}) {
  const { darkMode, setDarkMode } = useAdminTheme();

  return (
    <header className="mb-8 flex flex-col gap-5 rounded-[28px] border border-slate-200/70 bg-white/80 p-6 shadow-lg shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/20 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          {title}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-56 rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-yellow-500 dark:focus:ring-yellow-500/20"
          />
        </div>

        <button className="relative rounded-2xl bg-slate-900 p-3 text-white transition hover:-translate-y-0.5 dark:bg-slate-700">
          <FaBell />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
            3
          </span>
        </button>

        <button
          onClick={() => setDarkMode((value) => !value)}
          className="rounded-2xl border border-slate-200 bg-slate-100 p-3 text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400 font-bold text-slate-900">
            E
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Admin</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Operations</p>
          </div>
        </div>
      </div>
    </header>
  );
}
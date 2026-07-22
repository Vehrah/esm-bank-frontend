import { Link } from "react-router-dom";

function Button({
  to,
  children,
  variant = "primary",
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition-all duration-300";

  const styles = {
    primary:
      "bg-yellow-500 text-slate-950 hover:bg-yellow-400 hover:scale-105",

    secondary:
      "border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-slate-950",

    dark:
      "bg-gray-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700",
  };

  return (
    <Link
      to={to}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export default Button;
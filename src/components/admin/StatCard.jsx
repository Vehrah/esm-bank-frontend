function StatCard({
  title,
  value,
  icon,
  color = "bg-yellow-400",
}) {
  return (
    <div className="rounded-[24px] border border-slate-200/70 bg-white/90 p-6 shadow-lg shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-slate-900 ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
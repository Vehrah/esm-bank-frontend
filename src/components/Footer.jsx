function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center md:flex-row">

        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Esm Bank
          </h2>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Banking Beyond Expectations.
          </p>
        </div>

        <p className="text-slate-600 dark:text-slate-400">
          © {new Date().getFullYear()} Esm Bank. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;
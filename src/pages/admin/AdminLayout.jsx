import { Outlet } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

import AdminSidebar from "../../components/AdminSidebar";
import Topbar from "../../components/admin/Topbar";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <AdminSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 lg:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-xl bg-slate-900 p-3 text-white transition hover:scale-105 dark:bg-slate-700"
          >
            <FaBars />
          </button>

          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
            ESM Bank
          </h1>
        </header>

        <Topbar />

        <main className="flex-1 overflow-y-auto overflow-x-auto bg-slate-50/70 dark:bg-slate-950/70">
          <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
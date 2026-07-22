import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="bg-gray-50 dark:bg-slate-950 py-24">
      <div className="mx-auto max-w-5xl rounded-3xl border border-yellow-500/20 bg-white dark:bg-slate-900 px-8 py-16 text-center">

        <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
          Ready to Experience Premium Banking?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Open your Esm Bank account today and enjoy secure digital banking,
          global payments, and a modern financial experience.
        </p>

        <Link
          to="/register"
          className="mt-10 inline-block rounded-xl bg-yellow-500 px-8 py-4 font-semibold text-slate-900 transition hover:bg-yellow-400"
        >
          Open an Account
        </Link>

      </div>
    </section>
  );
}

export default CTA;
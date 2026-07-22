import { FaFilePdf, FaFileExcel, FaUsers, FaExchangeAlt } from "react-icons/fa";

export default function Reports() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Reports
        </h1>

        <p className="mt-2 text-slate-500">
          Export banking reports and customer data.
        </p>

      </div>
    <div className="grid gap-6 md:grid-cols-2">

  <div className="rounded-xl bg-white p-6 shadow">

    <div className="mb-4 flex items-center gap-3">

      <FaExchangeAlt className="text-3xl text-blue-600" />

      <h2 className="text-xl font-bold">
        Transactions Report
      </h2>

    </div>

    <p className="mb-6 text-slate-500">
      Export every bank transaction.
    </p>

    <div className="flex gap-4">

      <button className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700">

        <FaFilePdf />

        PDF

      </button>

      <button className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700">

        <FaFileExcel />

        Excel

      </button>

    </div>

  </div>

  <div className="rounded-xl bg-white p-6 shadow">

    <div className="mb-4 flex items-center gap-3">

      <FaUsers className="text-3xl text-blue-600" />

      <h2 className="text-xl font-bold">
        Customers Report
      </h2>

    </div>

    <p className="mb-6 text-slate-500">
      Export every registered customer.
    </p>

    <div className="flex gap-4">

      <button className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700">

        <FaFilePdf />

        PDF

      </button>

      <button className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700">

        <FaFileExcel />

        Excel

      </button>

    </div>

  </div>
</div>
    </div>
  );
}
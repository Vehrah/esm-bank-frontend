import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function AnalyticsCharts({ analytics }) {
  // Line Chart (Last 7 Days)
  const lineData = {
    labels:
      analytics.last7Days?.map((day) => day._id.day) || [],

    datasets: [
      {
        label: "Deposits",
        data:
          analytics.last7Days?.map((day) => day.deposits) || [],
        borderColor: "#22c55e",
        backgroundColor: "#22c55e",
        tension: 0.4,
      },
      {
        label: "Withdrawals",
        data:
          analytics.last7Days?.map((day) => day.withdrawals) || [],
        borderColor: "#ef4444",
        backgroundColor: "#ef4444",
        tension: 0.4,
      },
      {
        label: "Transfers",
        data:
          analytics.last7Days?.map((day) => day.transfers) || [],
        borderColor: "#2563eb",
        backgroundColor: "#2563eb",
        tension: 0.4,
      },
    ],
  };

  // Doughnut Chart Percentages
  const total =
    (analytics.totalDeposits || 0) +
    (analytics.totalWithdrawals || 0) +
    (analytics.totalTransfers || 0);

  const depositPercent =
    total > 0
      ? ((analytics.totalDeposits || 0) / total) * 100
      : 0;

  const withdrawalPercent =
    total > 0
      ? ((analytics.totalWithdrawals || 0) / total) * 100
      : 0;

  const transferPercent =
    total > 0
      ? ((analytics.totalTransfers || 0) / total) * 100
      : 0;

  const doughnutData = {
    labels: [
      "Deposits",
      "Withdrawals",
      "Transfers",
    ],

    datasets: [
      {
        data: [
          depositPercent,
          withdrawalPercent,
          transferPercent,
        ],

        backgroundColor: [
          "#22c55e",
          "#ef4444",
          "#2563eb",
        ],

        borderWidth: 1,
      },
    ],
  };

  const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthlyData = {
  labels:
    analytics.monthlyTrend?.map(
      (item) => months[item._id.month - 1]
    ) || [],

  datasets: [
    {
      label: "Deposits",

      data:
        analytics.monthlyTrend?.map(
          (item) => item.deposits
        ) || [],

      borderColor: "#22c55e",

      backgroundColor: "#22c55e",

      tension: 0.4,
    },

    {
      label: "Withdrawals",

      data:
        analytics.monthlyTrend?.map(
          (item) => item.withdrawals
        ) || [],

      borderColor: "#ef4444",

      backgroundColor: "#ef4444",

      tension: 0.4,
    },

    {
      label: "Transfers",

      data:
        analytics.monthlyTrend?.map(
          (item) => item.transfers
        ) || [],

      borderColor: "#2563eb",

      backgroundColor: "#2563eb",

      tension: 0.4,
    },
  ],
};

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
      <div className="min-h-[420px] rounded-[24px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
          Last 7 Days Transaction Trend
        </h2>

        <div className="h-80">
          <Line data={lineData} options={chartOptions} />
        </div>
      </div>

      <div className="min-h-[420px] rounded-[24px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
          Transaction Distribution (%)
        </h2>

        <div className="h-80">
          <Doughnut
            data={doughnutData}
            options={{
              responsive: true,
              maintainAspectRatio: false,

              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    color: "#94a3b8",
                  },
                },

                tooltip: {
                  callbacks: {
                    label: (context) => `${context.label}: ${context.raw.toFixed(1)}%`,
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="mt-2 rounded-[24px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 xl:col-span-2">
        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
          Monthly Transaction Trend
        </h2>

        <div className="h-96">
          <Line data={monthlyData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
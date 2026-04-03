import { formatCurrency } from "../../utils/formatCurrency";

const icons = {
  balance: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
  income: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
    </svg>
  ),
  expense: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
    </svg>
  ),
};

const colorMap = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    icon: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
    value: "text-blue-600 dark:text-blue-400",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-900/20",
    icon: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400",
    value: "text-green-600 dark:text-green-400",
  },
  red: {
    bg: "bg-red-50 dark:bg-red-900/20",
    icon: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
    value: "text-red-600 dark:text-red-400",
  },
};

export default function SummaryCard({ title, value, variant = "blue" }) {
  const iconKey = variant === "blue" ? "balance" : variant === "green" ? "income" : "expense";
  const colors = colorMap[variant] || colorMap.blue;

  return (
    <div className={`rounded-2xl ${colors.bg} p-5 border border-slate-200/60 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-default group`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className={`mt-2 text-2xl font-bold ${colors.value}`}>{formatCurrency(value)}</h3>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors.icon}`}>
          {icons[iconKey]}
        </div>
      </div>
    </div>
  );
}
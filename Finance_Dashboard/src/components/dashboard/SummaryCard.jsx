import { formatCurrency } from "../../utils/formatCurrency";

export default function SummaryCard({ title, value, color }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
      <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <h3 className={`mt-3 text-2xl font-bold ${color}`}>{formatCurrency(value)}</h3>
    </div>
  );
}
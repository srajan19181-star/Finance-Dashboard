import { useSelector } from "react-redux";
import { getFinanceSummary, getHighestSpendingCategory } from "../utils/insightHelpers";
import { formatCurrency } from "../utils/formatCurrency";

export default function InsightsPage() {
  const transactions = useSelector((state) => state.transactions.items);
  const summary = getFinanceSummary(transactions);
  const highest = getHighestSpendingCategory(transactions);

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <h3 className="text-lg font-semibold">Highest Spending Category</h3>
        <p className="mt-3 text-2xl font-bold">{highest.category}</p>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Spent {formatCurrency(highest.amount)}</p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <h3 className="text-lg font-semibold">Net Balance</h3>
        <p className="mt-3 text-2xl font-bold">{formatCurrency(summary.balance)}</p>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Income minus expenses</p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <h3 className="text-lg font-semibold">Simple Observation</h3>
        <p className="mt-3 text-2xl font-bold">
          {summary.balance > 0 ? "You are saving money" : "Expenses need attention"}
        </p>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          A quick financial health overview based on current data.
        </p>
      </div>
    </div>
  );
}
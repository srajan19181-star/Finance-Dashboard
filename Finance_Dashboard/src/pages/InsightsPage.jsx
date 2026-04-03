import { useSelector } from "react-redux";
import {
  getFinanceSummary,
  getHighestSpendingCategory,
  getCategoryBreakdown,
} from "../utils/insightHelpers";
import { formatCurrency } from "../utils/formatCurrency";
import CategoryChart from "../components/dashboard/CategoryChart";

export default function InsightsPage() {
  const transactions = useSelector((state) => state.transactions.items);
  const summary = getFinanceSummary(transactions);
  const highest = getHighestSpendingCategory(transactions);
  const categoryData = getCategoryBreakdown(transactions);

  const savingsRate =
    summary.income > 0
      ? Math.round(((summary.income - summary.expenses) / summary.income) * 100)
      : 0;

  const expenseRatio =
    summary.income > 0 ? Math.round((summary.expenses / summary.income) * 100) : 0;

  const cards = [
    {
      title: "Highest Spending Category",
      value: highest.category || "None",
      detail: highest.amount > 0
        ? `₹${highest.amount.toLocaleString("en-IN")} total spent`
        : "No expenses recorded",
      accent: "#dc2626",
      bg: "bg-red-50 dark:bg-red-900/10",
      border: "border-red-200 dark:border-red-800/50",
    },
    {
      title: "Total Income",
      value: formatCurrency(summary.income),
      detail: `${transactions.filter((t) => t.type === "income").length} income transactions`,
      accent: "#16a34a",
      bg: "bg-green-50 dark:bg-green-900/10",
      border: "border-green-200 dark:border-green-800/50",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(summary.expenses),
      detail: `${transactions.filter((t) => t.type === "expense").length} expense transactions`,
      accent: "#dc2626",
      bg: "bg-red-50 dark:bg-red-900/10",
      border: "border-red-200 dark:border-red-800/50",
    },
    {
      title: "Net Balance",
      value: formatCurrency(summary.balance),
      detail: summary.balance >= 0 ? "You are in surplus" : "Expenses exceed income",
      accent: summary.balance >= 0 ? "#2563eb" : "#dc2626",
      bg: summary.balance >= 0 ? "bg-blue-50 dark:bg-blue-900/10" : "bg-red-50 dark:bg-red-900/10",
      border: summary.balance >= 0 ? "border-blue-200 dark:border-blue-800/50" : "border-red-200 dark:border-red-800/50",
    },
    {
      title: "Savings Rate",
      value: `${savingsRate}%`,
      detail: `${expenseRatio}% of income used on expenses`,
      accent: savingsRate >= 20 ? "#16a34a" : "#f59e0b",
      bg: savingsRate >= 20 ? "bg-green-50 dark:bg-green-900/10" : "bg-amber-50 dark:bg-amber-900/10",
      border: savingsRate >= 20 ? "border-green-200 dark:border-green-800/50" : "border-amber-200 dark:border-amber-800/50",
    },
    {
      title: "Financial Observation",
      value: summary.balance >= 0 ? "Healthy ✓" : "Needs Attention ⚠",
      detail:
        summary.balance >= 0
          ? "Your income comfortably covers your expenses."
          : "Consider reviewing your high-spend categories.",
      accent: summary.balance >= 0 ? "#16a34a" : "#f59e0b",
      bg: summary.balance >= 0 ? "bg-green-50 dark:bg-green-900/10" : "bg-amber-50 dark:bg-amber-900/10",
      border: summary.balance >= 0 ? "border-green-200 dark:border-green-800/50" : "border-amber-200 dark:border-amber-800/50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Insight Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`rounded-2xl border ${card.bg} ${card.border} p-5 shadow-sm hover:shadow-md transition-shadow duration-200`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {card.title}
            </p>
            <p
              className="mt-2 text-2xl font-bold"
              style={{ color: card.accent }}
            >
              {card.value}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{card.detail}</p>
          </div>
        ))}
      </div>

      {/* Spending Breakdown Chart */}
      {categoryData.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Spending by Category
          </h3>
          <CategoryChart data={categoryData} />
        </div>
      )}

      {/* Income vs Expenses Bar */}
      {summary.income > 0 && (
        <div className="rounded-2xl bg-white border border-slate-200/60 dark:border-slate-700/50 dark:bg-slate-900 p-5 shadow-sm">
          <h3 className="mb-4 font-semibold text-slate-800 dark:text-slate-100">Income vs Expenses</h3>
          <div className="space-y-3">
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium text-green-700 dark:text-green-400">Income</span>
                <span className="text-slate-600 dark:text-slate-300">{formatCurrency(summary.income)}</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div className="h-full rounded-full bg-green-500" style={{ width: "100%" }} />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium text-red-600 dark:text-red-400">Expenses</span>
                <span className="text-slate-600 dark:text-slate-300">{formatCurrency(summary.expenses)}</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div
                  className="h-full rounded-full bg-red-500 transition-all duration-700"
                  style={{ width: `${Math.min(expenseRatio, 100)}%` }}
                />
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
            Expenses are {expenseRatio}% of income
          </p>
        </div>
      )}
    </div>
  );
}
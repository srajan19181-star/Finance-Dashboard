import { useSelector } from "react-redux";
import SummaryCard from "../components/dashboard/SummaryCard";
import BalanceChart from "../components/dashboard/BalanceChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import InsightsCard from "../components/dashboard/InsightsCard";
import { SummaryCardSkeleton } from "../components/common/SkeletonLoader";
import {
  getCategoryBreakdown,
  getFinanceSummary,
  getHighestSpendingCategory,
  getTrendData,
} from "../utils/insightHelpers";
import { formatCurrency } from "../utils/formatCurrency";

export default function DashboardPage() {
  const transactions = useSelector((state) => state.transactions.items);
  const isLoading    = useSelector((state) => state.transactions.isLoading);

  const summary         = getFinanceSummary(transactions);
  const highestCategory = getHighestSpendingCategory(transactions);
  const trendData       = getTrendData(transactions);
  const categoryData    = getCategoryBreakdown(transactions);

  const savingsRate =
    summary.income > 0
      ? Math.round(((summary.income - summary.expenses) / summary.income) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* ── Summary Cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <>
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
          </>
        ) : (
          <>
            <SummaryCard title="Total Balance"  value={summary.balance}  variant="blue"  />
            <SummaryCard title="Total Income"   value={summary.income}   variant="green" />
            <SummaryCard title="Total Expenses" value={summary.expenses} variant="red"   />
          </>
        )}
      </div>

      {/* ── Charts ── */}
      <div className="grid gap-6 xl:grid-cols-2">
        <BalanceChart  data={trendData}    />
        <CategoryChart data={categoryData} />
      </div>

      {/* ── Quick Insights ── */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Quick Insights
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InsightsCard
            title="Top Spending Category"
            value={isLoading ? "—" : (highestCategory.category || "N/A")}
            subtitle={
              isLoading
                ? "Loading…"
                : highestCategory.amount > 0
                ? `You spent ${formatCurrency(highestCategory.amount)} here`
                : "No expenses recorded yet"
            }
            accent="blue"
          />
          <InsightsCard
            title="Savings Rate"
            value={isLoading ? "—" : `${savingsRate}%`}
            subtitle={
              isLoading
                ? "Loading…"
                : savingsRate >= 0
                ? "Of income saved after expenses"
                : "Expenses exceeded income this period"
            }
            accent={savingsRate >= 20 ? "green" : "amber"}
          />
          <InsightsCard
            title="Financial Health"
            value={
              isLoading
                ? "—"
                : summary.balance >= 0
                ? "✓ Healthy"
                : "⚠ Attention Needed"
            }
            subtitle={
              isLoading
                ? "Loading…"
                : summary.balance >= 0
                ? `You have ${formatCurrency(summary.balance)} in surplus`
                : `Expenses exceed income by ${formatCurrency(Math.abs(summary.balance))}`
            }
            accent={summary.balance >= 0 ? "green" : "red"}
          />
        </div>
      </div>
    </div>
  );
}
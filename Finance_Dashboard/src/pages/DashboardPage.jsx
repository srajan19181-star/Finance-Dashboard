import { useSelector } from "react-redux";
import SummaryCard from "../components/dashboard/SummaryCard";
import BalanceChart from "../components/dashboard/BalanceChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import InsightsCard from "../components/dashboard/InsightsCard";
import {
  getCategoryBreakdown,
  getFinanceSummary,
  getHighestSpendingCategory,
  getTrendData,
} from "../utils/insightHelpers";
import { formatCurrency } from "../utils/formatCurrency";

export default function DashboardPage() {
  const transactions = useSelector((state) => state.transactions.items);
  const summary = getFinanceSummary(transactions);
  const highestCategory = getHighestSpendingCategory(transactions);
  const trendData = getTrendData(transactions);
  const categoryData = getCategoryBreakdown(transactions);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard title="Total Balance" value={summary.balance} color="text-blue-600" />
        <SummaryCard title="Income" value={summary.income} color="text-green-600" />
        <SummaryCard title="Expenses" value={summary.expenses} color="text-red-600" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <BalanceChart data={trendData} />
        <CategoryChart data={categoryData} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <InsightsCard
          title="Highest Spending Category"
          value={highestCategory.category}
          subtitle={`Spent ${formatCurrency(highestCategory.amount)}`}
        />
        <InsightsCard
          title="Income Coverage"
          value={summary.expenses === 0 ? "N/A" : `${(summary.income / summary.expenses).toFixed(1)}x`}
          subtitle="How many times income covers expenses"
        />
        <InsightsCard
          title="Observation"
          value={summary.balance >= 0 ? "Healthy cash flow" : "Spending exceeds income"}
          subtitle="Quick overall financial insight"
        />
      </div>
    </div>
  );
}
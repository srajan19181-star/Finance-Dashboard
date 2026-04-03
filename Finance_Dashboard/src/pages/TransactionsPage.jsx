import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionFormModal from "../components/transactions/TransactionFormModal";
import EmptyState from "../components/common/EmptyState";
import SkeletonLoader from "../components/common/SkeletonLoader";
import ExportButton from "../components/common/ExportButton";
import { openModal } from "../features/ui/uiSlice";

// ─── Grouping helper ──────────────────────────────────────────────────────────
function buildGroups(transactions, groupBy) {
  const map = new Map();

  transactions.forEach((t) => {
    let key;
    if (groupBy === "month") {
      const d = new Date(t.date + "T00:00:00"); // avoid timezone shift
      key = d.toLocaleString("en-IN", { month: "long", year: "numeric" });
    } else {
      key = t.category;
    }
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(t);
  });

  // Each group: { label, items, income, expenses }
  return [...map.entries()].map(([label, items]) => ({
    label,
    items,
    income:   items.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
    expenses: items.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0),
  }));
}

// ─── Group header ─────────────────────────────────────────────────────────────
function GroupHeader({ label, count, income, expenses }) {
  const net = income - expenses;
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-100/80 px-4 py-2.5 dark:bg-slate-800/70">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</span>
        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-700 dark:text-slate-400">
          {count} item{count !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="flex items-center gap-3 text-xs font-medium">
        {income > 0 && (
          <span className="text-green-600 dark:text-green-400">
            +₹{income.toLocaleString("en-IN")}
          </span>
        )}
        {expenses > 0 && (
          <span className="text-red-500 dark:text-red-400">
            −₹{expenses.toLocaleString("en-IN")}
          </span>
        )}
        <span className={`font-semibold ${net >= 0 ? "text-blue-600 dark:text-blue-400" : "text-red-500 dark:text-red-400"}`}>
          Net: {net >= 0 ? "+" : "−"}₹{Math.abs(net).toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TransactionsPage() {
  const dispatch = useDispatch();
  const { items, isLoading, searchTerm, categoryFilter, typeFilter, sortBy, dateFrom, dateTo, groupBy } =
    useSelector((state) => state.transactions);
  const currentRole = useSelector((state) => state.role.currentRole);

  // Unique sorted categories from all items (not from filtered list)
  const categories = useMemo(
    () => [...new Set(items.map((t) => t.category))].sort(),
    [items]
  );

  // ── Filter + sort pipeline ─────────────────────────────────────────────────
  const filteredTransactions = useMemo(() => {
    // 1. Start from all items
    let result = [...items];

    // 2. Search (title or category)
    const term = searchTerm.trim().toLowerCase();
    if (term) {
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(term) ||
          t.category.toLowerCase().includes(term)
      );
    }

    // 3. Category filter (exact match)
    if (categoryFilter !== "All") {
      result = result.filter((t) => t.category === categoryFilter);
    }

    // 4. Type filter
    if (typeFilter !== "All") {
      result = result.filter((t) => t.type === typeFilter);
    }

    // 5. Date-range filter (YYYY-MM-DD string comparison is safe)
    if (dateFrom) result = result.filter((t) => t.date >= dateFrom);
    if (dateTo)   result = result.filter((t) => t.date <= dateTo);

    // 6. Sort
    switch (sortBy) {
      case "oldest":    result.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
      case "highToLow": result.sort((a, b) => b.amount - a.amount);                 break;
      case "lowToHigh": result.sort((a, b) => a.amount - b.amount);                 break;
      case "newest":
      default:          result.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
    }

    return result;
  }, [items, searchTerm, categoryFilter, typeFilter, sortBy, dateFrom, dateTo]);

  // Build grouped structure (null when groupBy === "none")
  const groups = useMemo(
    () => (groupBy !== "none" ? buildGroups(filteredTransactions, groupBy) : null),
    [filteredTransactions, groupBy]
  );

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Transactions</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isLoading
              ? "Loading from API…"
              : `${filteredTransactions.length} of ${items.length} entries`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Export button — shows count of filtered rows */}
          {!isLoading && filteredTransactions.length > 0 && (
            <ExportButton transactions={filteredTransactions} />
          )}

          {/* Add transaction (admin only) */}
          {currentRole === "admin" && (
            <button
              onClick={() => dispatch(openModal())}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters categories={categories} />

      {/* Content */}
      {isLoading ? (
        /* Loading skeleton — mock API in progress */
        <SkeletonLoader rows={6} />
      ) : filteredTransactions.length === 0 ? (
        /* Empty state */
        <EmptyState
          title="No transactions found"
          message={
            searchTerm || categoryFilter !== "All" || typeFilter !== "All" || dateFrom || dateTo
              ? "Try adjusting your search, filters, or date range."
              : "No transactions yet. Add your first one to get started!"
          }
        />
      ) : groups ? (
        /* Grouped view */
        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group.label} className="space-y-2">
              <GroupHeader
                label={group.label}
                count={group.items.length}
                income={group.income}
                expenses={group.expenses}
              />
              <TransactionTable transactions={group.items} />
            </div>
          ))}
        </div>
      ) : (
        /* Flat view */
        <TransactionTable transactions={filteredTransactions} />
      )}

      <TransactionFormModal />
    </div>
  );
}
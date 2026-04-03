import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  setCategoryFilter,
  setTypeFilter,
  setSortBy,
  setDateFrom,
  setDateTo,
  setGroupBy,
  resetFilters,
} from "../../features/transactions/transactionsSlice";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700/60 dark:bg-slate-950/40 dark:text-slate-100 dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:ring-blue-900/40 dark:placeholder-slate-500";

export default function TransactionFilters({ categories }) {
  const dispatch = useDispatch();
  const { searchTerm, categoryFilter, typeFilter, sortBy, dateFrom, dateTo, groupBy } =
    useSelector((state) => state.transactions);

  // Highlight the reset button only when at least one filter is active
  const hasActiveFilters =
    searchTerm ||
    categoryFilter !== "All" ||
    typeFilter !== "All" ||
    dateFrom ||
    dateTo;

  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white p-4 shadow-sm dark:border-slate-700/50 dark:bg-slate-900 space-y-3">
      {/* ── Row 1: Search | Category | Type | Sort ── */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by title or category…"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className={`${inputClass} pl-9`}
          />
        </div>

        {/* Category filter */}
        <select
          value={categoryFilter}
          onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
          className={inputClass}
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Type filter */}
        <select
          value={typeFilter}
          onChange={(e) => dispatch(setTypeFilter(e.target.value))}
          className={inputClass}
        >
          <option value="All">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className={inputClass}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highToLow">Amount: High → Low</option>
          <option value="lowToHigh">Amount: Low → High</option>
        </select>
      </div>

      {/* ── Row 2: Date From | Date To | Group By | Reset ── */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Date from */}
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400 dark:text-slate-500">From date</label>
          <input
            type="date"
            value={dateFrom}
            max={dateTo || undefined}
            onChange={(e) => dispatch(setDateFrom(e.target.value))}
            className={inputClass}
          />
        </div>

        {/* Date to */}
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400 dark:text-slate-500">To date</label>
          <input
            type="date"
            value={dateTo}
            min={dateFrom || undefined}
            onChange={(e) => dispatch(setDateTo(e.target.value))}
            className={inputClass}
          />
        </div>

        {/* Group by */}
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400 dark:text-slate-500">Group by</label>
          <select
            value={groupBy}
            onChange={(e) => dispatch(setGroupBy(e.target.value))}
            className={inputClass}
          >
            <option value="none">No Grouping</option>
            <option value="month">Group by Month</option>
            <option value="category">Group by Category</option>
          </select>
        </div>

        {/* Reset button */}
        <div className="flex items-end">
          <button
            onClick={() => dispatch(resetFilters())}
            disabled={!hasActiveFilters}
            className={`w-full rounded-xl border py-2.5 text-sm font-medium transition-colors duration-150 ${
              hasActiveFilters
                ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:border-red-700/50 dark:bg-red-900/15 dark:text-red-400 dark:hover:bg-red-900/30"
                : "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-600"
            }`}
          >
            ✕ Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
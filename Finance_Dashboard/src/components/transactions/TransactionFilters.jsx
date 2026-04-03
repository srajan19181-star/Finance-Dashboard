import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  setCategoryFilter,
  setTypeFilter,
  setSortBy,
} from "../../features/transactions/transactionsSlice";

export default function TransactionFilters({ categories }) {
  const dispatch = useDispatch();
  const { searchTerm, categoryFilter, typeFilter, sortBy } = useSelector(
    (state) => state.transactions
  );

  return (
    <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900 md:grid-cols-4">
      <input
        type="text"
        placeholder="Search transactions"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        className="rounded-xl border border-slate-300 px-3 py-2 outline-none dark:border-slate-700 dark:bg-slate-800"
      />

      <select
        value={categoryFilter}
        onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
        className="rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
      >
        <option value="All">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={typeFilter}
        onChange={(e) => dispatch(setTypeFilter(e.target.value))}
        className="rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
      >
        <option value="All">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value))}
        className="rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="highToLow">Amount: High to Low</option>
        <option value="lowToHigh">Amount: Low to High</option>
      </select>
    </div>
  );
}
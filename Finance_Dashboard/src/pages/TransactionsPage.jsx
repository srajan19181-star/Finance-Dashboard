import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionFormModal from "../components/transactions/TransactionFormModal";
import EmptyState from "../components/common/EmptyState";
import { openModal } from "../features/ui/uiSlice";

export default function TransactionsPage() {
  const dispatch = useDispatch();
  const { items, searchTerm, categoryFilter, typeFilter, sortBy } = useSelector(
    (state) => state.transactions
  );
  const currentRole = useSelector((state) => state.role.currentRole);

  const categories = [...new Set(items.map((item) => item.category))];

  const filteredTransactions = useMemo(() => {
    let filtered = [...items];

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "All") {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }

    if (typeFilter !== "All") {
      filtered = filtered.filter((item) => item.type === typeFilter);
    }

    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "highToLow") {
      filtered.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === "lowToHigh") {
      filtered.sort((a, b) => a.amount - b.amount);
    }

    return filtered;
  }, [items, searchTerm, categoryFilter, typeFilter, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold">Transactions</h2>
        {currentRole === "admin" && (
          <button
            onClick={() => dispatch(openModal())}
            className="rounded-xl bg-blue-600 px-4 py-3 text-white"
          >
            Add Transaction
          </button>
        )}
      </div>

      <TransactionFilters categories={categories} />

      {filteredTransactions.length > 0 ? (
        <TransactionTable transactions={filteredTransactions} />
      ) : (
        <EmptyState
          title="No transactions found"
          message="Try changing your search, filters, or add a new transaction."
        />
      )}

      <TransactionFormModal />
    </div>
  );
}
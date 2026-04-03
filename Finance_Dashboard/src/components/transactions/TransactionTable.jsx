import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../features/transactions/transactionsSlice";
import { openModal } from "../../features/ui/uiSlice";
import { formatCurrency } from "../../utils/formatCurrency";

function TypeBadge({ type }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        type === "income"
          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      }`}
    >
      {type === "income" ? "↑ Income" : "↓ Expense"}
    </span>
  );
}

export default function TransactionTable({ transactions }) {
  const dispatch = useDispatch();
  const currentRole = useSelector((state) => state.role.currentRole);

  return (
    <div className="rounded-2xl bg-white shadow-sm border border-slate-200/60 dark:border-slate-700/50 dark:bg-slate-900 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50">
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date</th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Title</th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Category</th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Type</th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Amount</th>
              {currentRole === "admin" && (
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {transactions.map((item) => (
              <tr
                key={item.id}
                className="group hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors duration-100"
              >
                <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{item.date}</td>
                <td className="px-5 py-4 font-medium text-slate-800 dark:text-slate-200">{item.title}</td>
                <td className="px-5 py-4">
                  <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                    {item.category}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <TypeBadge type={item.type} />
                </td>
                <td className={`px-5 py-4 font-semibold ${item.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                  {item.type === "expense" ? "−" : "+"}{formatCurrency(item.amount)}
                </td>
                {currentRole === "admin" && (
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => dispatch(openModal(item))}
                        className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:border-blue-700/50 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => dispatch(deleteTransaction(item.id))}
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 dark:border-red-700/50 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
        {transactions.map((item) => (
          <div key={item.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 dark:text-slate-200 truncate">{item.title}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">{item.date}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <p className={`font-bold ${item.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                  {item.type === "expense" ? "−" : "+"}{formatCurrency(item.amount)}
                </p>
                <TypeBadge type={item.type} />
              </div>
            </div>
            {currentRole === "admin" && (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => dispatch(openModal(item))}
                  className="flex-1 rounded-lg border border-blue-200 bg-blue-50 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:border-blue-700/50 dark:bg-blue-900/20 dark:text-blue-400 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteTransaction(item.id))}
                  className="flex-1 rounded-lg border border-red-200 bg-red-50 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 dark:border-red-700/50 dark:bg-red-900/20 dark:text-red-400 transition"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
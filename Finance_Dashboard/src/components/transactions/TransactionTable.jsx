import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../features/transactions/transactionsSlice";
import { openModal } from "../../features/ui/uiSlice";
import { formatCurrency } from "../../utils/formatCurrency";

export default function TransactionTable({ transactions }) {
  const dispatch = useDispatch();
  const currentRole = useSelector((state) => state.role.currentRole);

  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-sm dark:bg-slate-900">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th className="px-4 py-4">Date</th>
            <th className="px-4 py-4">Title</th>
            <th className="px-4 py-4">Category</th>
            <th className="px-4 py-4">Type</th>
            <th className="px-4 py-4">Amount</th>
            {currentRole === "admin" && <th className="px-4 py-4">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => (
            <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800">
              <td className="px-4 py-4">{item.date}</td>
              <td className="px-4 py-4">{item.title}</td>
              <td className="px-4 py-4">{item.category}</td>
              <td className="px-4 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    item.type === "income"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.type}
                </span>
              </td>
              <td className="px-4 py-4">{formatCurrency(item.amount)}</td>
              {currentRole === "admin" && (
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => dispatch(openModal(item))}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-xs text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(deleteTransaction(item.id))}
                      className="rounded-lg bg-red-600 px-3 py-2 text-xs text-white"
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
  );
}
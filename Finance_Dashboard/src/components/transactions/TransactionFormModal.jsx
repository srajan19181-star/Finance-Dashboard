import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction, editTransaction } from "../../features/transactions/transactionsSlice";
import { closeModal } from "../../features/ui/uiSlice";

export default function TransactionFormModal() {
  const dispatch = useDispatch();
  const { isModalOpen, editingTransaction } = useSelector((state) => state.ui);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
    date: "",
  });

  useEffect(() => {
    if (editingTransaction) {
      setFormData(editingTransaction);
    } else {
      setFormData({
        title: "",
        amount: "",
        category: "",
        type: "expense",
        date: "",
      });
    }
  }, [editingTransaction]);

  if (!isModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.amount || !formData.category || !formData.date) {
      return;
    }

    const payload = {
      ...formData,
      id: editingTransaction ? editingTransaction.id : Date.now(),
      amount: Number(formData.amount),
    };

    if (editingTransaction) {
      dispatch(editTransaction(payload));
    } else {
      dispatch(addTransaction(payload));
    }

    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 dark:bg-slate-900">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {editingTransaction ? "Edit Transaction" : "Add Transaction"}
          </h3>
          <button onClick={() => dispatch(closeModal())}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full rounded-xl border border-slate-300 px-3 py-3 dark:border-slate-700 dark:bg-slate-800"
          />

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="w-full rounded-xl border border-slate-300 px-3 py-3 dark:border-slate-700 dark:bg-slate-800"
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full rounded-xl border border-slate-300 px-3 py-3 dark:border-slate-700 dark:bg-slate-800"
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-3 dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-3 dark:border-slate-700 dark:bg-slate-800"
          />

          <button className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white">
            {editingTransaction ? "Update Transaction" : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
}
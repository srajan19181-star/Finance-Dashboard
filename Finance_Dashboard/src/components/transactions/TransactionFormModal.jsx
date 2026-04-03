import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction, editTransaction } from "../../features/transactions/transactionsSlice";
import { closeModal } from "../../features/ui/uiSlice";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700/60 dark:bg-slate-950/40 dark:text-slate-100 dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:ring-blue-900/40 dark:placeholder-slate-500";

const EMPTY_FORM = {
  title: "",
  amount: "",
  category: "",
  type: "expense",
  date: new Date().toISOString().slice(0, 10),
};

export default function TransactionFormModal() {
  const dispatch = useDispatch();
  const { isModalOpen, editingTransaction } = useSelector((state) => state.ui);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTransaction) {
      setFormData({ ...editingTransaction, amount: String(editingTransaction.amount) });
    } else {
      setFormData(EMPTY_FORM);
    }
    setErrors({});
  }, [editingTransaction, isModalOpen]);

  if (!isModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = "Title is required";
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0)
      errs.amount = "Enter a valid positive amount";
    if (!formData.category.trim()) errs.category = "Category is required";
    if (!formData.date) errs.date = "Date is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200/50 dark:border-slate-700/50">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {editingTransaction ? "Edit Transaction" : "Add Transaction"}
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              {editingTransaction ? "Update the details below" : "Fill in the details below"}
            </p>
          </div>
          <button
            onClick={() => dispatch(closeModal())}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
            aria-label="Close modal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Grocery shopping"
              className={inputClass}
            />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
          </div>

          {/* Amount + Type row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">Amount (₹)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0"
                min="1"
                className={inputClass}
              />
              {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className={inputClass}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Food, Bills, Salary"
              className={inputClass}
            />
            {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 active:scale-[0.98] transition-all duration-150"
          >
            {editingTransaction ? "Update Transaction" : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
}
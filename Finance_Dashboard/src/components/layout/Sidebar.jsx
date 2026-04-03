import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `block rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800"
    }`;

  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 md:block">
      <h1 className="mb-8 text-2xl font-bold">FinanceDash</h1>
      <nav className="space-y-3">
        <NavLink to="/" className={linkClass} end>
          Dashboard
        </NavLink>
        <NavLink to="/transactions" className={linkClass}>
          Transactions
        </NavLink>
        <NavLink to="/insights" className={linkClass}>
          Insights
        </NavLink>
      </nav>
    </aside>
  );
}
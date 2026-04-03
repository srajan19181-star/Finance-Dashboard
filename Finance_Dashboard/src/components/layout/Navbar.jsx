import RoleSwitcher from "../common/RoleSwitcher";
import ThemeToggle from "../common/ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 md:px-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Finance Dashboard</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track your balance, expenses, and insights.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <RoleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
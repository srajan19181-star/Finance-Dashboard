import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../features/ui/uiSlice";
import RoleSwitcher from "../common/RoleSwitcher";
import ThemeToggle from "../common/ThemeToggle";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/": { title: "Dashboard", subtitle: "Overview of your finances" },
  "/transactions": { title: "Transactions", subtitle: "Manage and track your entries" },
  "/insights": { title: "Insights", subtitle: "Understand your financial patterns" },
};

export default function Navbar() {
  const dispatch = useDispatch();
  const currentRole = useSelector((state) => state.role.currentRole);
  const location = useLocation();
  const page = pageTitles[location.pathname] || { title: "Finance Dashboard", subtitle: "" };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900 px-4 py-3 dark:md:px-6">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Hamburger + Page Title */}
        <div className="flex items-center gap-3">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden transition"
            onClick={() => dispatch(toggleSidebar())}
            aria-label="Toggle sidebar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div>
            <h2 className="text-base font-semibold leading-tight md:text-lg">{page.title}</h2>
            <p className="hidden text-xs text-slate-500 dark:text-slate-400 md:block">{page.subtitle}</p>
          </div>
        </div>

        {/* Right: Role Badge + Switcher + Theme */}
        <div className="flex items-center gap-2 md:gap-3">
          {currentRole === "admin" && (
            <span className="hidden sm:inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
              ⚡ Admin Mode
            </span>
          )}
          <RoleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
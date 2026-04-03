import { useState, useRef, useEffect } from "react";
import { exportAsCSV, exportAsJSON } from "../../utils/exportData";

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CsvIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <line x1="9" y1="9" x2="9" y2="21" />
  </svg>
);

const JsonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="12" y2="17" />
  </svg>
);

export default function ExportButton({ transactions }) {
  const [open, setOpen] = useState(false);
  const [exported, setExported] = useState(null); // "csv" | "json" — brief feedback
  const ref = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Clear "exported" success label after 2s
  useEffect(() => {
    if (!exported) return;
    const t = setTimeout(() => setExported(null), 2000);
    return () => clearTimeout(t);
  }, [exported]);

  const handleExportCSV = () => {
    exportAsCSV(transactions, "finance-transactions");
    setExported("csv");
    setOpen(false);
  };

  const handleExportJSON = () => {
    exportAsJSON(transactions, "finance-transactions");
    setExported("json");
    setOpen(false);
  };

  const btnBase =
    "flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors duration-100";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors duration-150 ${
          exported
            ? "border-green-300 bg-green-50 text-green-700 dark:border-green-700/50 dark:bg-green-900/20 dark:text-green-400"
            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        }`}
      >
        <DownloadIcon />
        {exported ? `Exported as .${exported}!` : "Export"}
        <ChevronIcon />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-30 mt-1.5 min-w-[160px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <div className="border-b border-slate-100 px-4 py-2 dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
              {transactions.length} record{transactions.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button onClick={handleExportCSV} className={`${btnBase} rounded-none`}>
            <CsvIcon />
            Export as CSV
          </button>
          <button onClick={handleExportJSON} className={`${btnBase} rounded-none`}>
            <JsonIcon />
            Export as JSON
          </button>
        </div>
      )}
    </div>
  );
}

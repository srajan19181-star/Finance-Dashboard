export default function InsightsCard({ title, value, subtitle, accent = "blue" }) {
  const accentMap = {
    blue: "border-l-blue-500",
    green: "border-l-green-500",
    amber: "border-l-amber-500",
    purple: "border-l-purple-500",
  };

  return (
    <div className={`rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm border border-slate-200/60 dark:border-slate-700/50 border-l-4 ${accentMap[accent] || accentMap.blue} hover:shadow-md transition-shadow duration-200`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{title}</p>
      <h3 className="mt-2 text-xl font-bold text-slate-800 dark:text-slate-100">{value}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
    </div>
  );
}
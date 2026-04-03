import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { formatCurrency } from "../../utils/formatCurrency";

const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#f59e0b", "#7c3aed", "#0891b2", "#db2777"];

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800">
        <p className="font-medium text-slate-700 dark:text-slate-200">{payload[0].name}</p>
        <p className="mt-0.5 text-sm font-semibold" style={{ color: payload[0].payload.fill }}>
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
}

export default function CategoryChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-72 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200/60 dark:border-slate-700/50">
        <p className="text-sm text-slate-400">No expense data to display</p>
      </div>
    );
  }

  // attach fill color to payload so tooltip can access it
  const coloredData = data.map((entry, i) => ({ ...entry, fill: COLORS[i % COLORS.length] }));

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm border border-slate-200/60 dark:border-slate-700/50 hover:shadow-md transition-shadow duration-200">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">Spending Breakdown</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">Expense categories</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" />
          </svg>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={coloredData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              innerRadius={40}
              paddingAngle={3}
            >
              {coloredData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
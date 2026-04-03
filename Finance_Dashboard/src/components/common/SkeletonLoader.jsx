/** Skeleton row for the desktop table view */
function TableSkeletonRow() {
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
      <div className="h-3.5 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      <div className="h-3.5 flex-1 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      <div className="h-3.5 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      <div className="h-5 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="h-3.5 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
    </div>
  );
}

/** Skeleton card for the mobile card view */
function CardSkeletonRow() {
  return (
    <div className="border-b border-slate-100 p-4 dark:border-slate-800">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-36 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="h-3.5 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-14 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
}

/** Full skeleton table/card container matching the real TransactionTable */
export default function SkeletonLoader({ rows = 6 }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-700/50 dark:bg-slate-900">
      {/* Desktop table skeleton */}
      <div className="hidden md:block">
        {/* Table header */}
        <div className="flex gap-6 border-b border-slate-100 bg-slate-50/70 px-5 py-3.5 dark:border-slate-800 dark:bg-slate-800/50">
          {["DATE", "TITLE", "CATEGORY", "TYPE", "AMOUNT"].map((h) => (
            <div
              key={h}
              className="h-2.5 w-14 animate-pulse rounded bg-slate-200 dark:bg-slate-700"
            />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <TableSkeletonRow key={i} />
        ))}
      </div>

      {/* Mobile card skeleton */}
      <div className="md:hidden">
        {Array.from({ length: rows }).map((_, i) => (
          <CardSkeletonRow key={i} />
        ))}
      </div>
    </div>
  );
}

/** Skeleton for the 3 Summary Cards on the Dashboard */
export function SummaryCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm dark:border-slate-700/50 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-7 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="h-11 w-11 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}

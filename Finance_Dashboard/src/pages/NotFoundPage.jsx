import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-3 text-slate-500 dark:text-slate-400">Page not found.</p>
      <Link to="/" className="mt-5 rounded-xl bg-blue-600 px-4 py-3 text-white">
        Back to Dashboard
      </Link>
    </div>
  );
}
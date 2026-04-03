import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../features/role/roleSlice";

export default function RoleSwitcher() {
  const dispatch = useDispatch();
  const currentRole = useSelector((state) => state.role.currentRole);

  return (
    <select
      value={currentRole}
      onChange={(e) => dispatch(setRole(e.target.value))}
      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-blue-500 dark:focus:ring-blue-900/30"
    >
      <option value="viewer">👁 Viewer</option>
      <option value="admin">⚡ Admin</option>
    </select>
  );
}
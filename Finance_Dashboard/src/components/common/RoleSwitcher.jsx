import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../features/role/roleSlice";

export default function RoleSwitcher() {
  const dispatch = useDispatch();
  const currentRole = useSelector((state) => state.role.currentRole);

  return (
    <select
      value={currentRole}
      onChange={(e) => dispatch(setRole(e.target.value))}
      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
    >
      <option value="viewer">Viewer</option>
      <option value="admin">Admin</option>
    </select>
  );
}
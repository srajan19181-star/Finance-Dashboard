import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../features/ui/uiSlice";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="rounded-xl border border-slate-300 px-4 py-2 text-sm dark:border-slate-700"
    >
      {darkMode ? "Light" : "Dark"}
    </button>
  );
}
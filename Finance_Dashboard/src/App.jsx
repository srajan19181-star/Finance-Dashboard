import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "./features/transactions/transactionsSlice";
import AppRoutes from "./routes/AppRoutes";

/**
 * App root — dispatches the mock-API fetch on first mount so the
 * rest of the app sees a realistic loading → data-ready transition.
 */
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;

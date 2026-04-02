import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/transactionsSlice";
import roleReducer from "../features/role/roleSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    role: roleReducer,
    ui: uiReducer,
  },
});
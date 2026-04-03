import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockApi } from "../../services/mockApi";

// ─── Async Thunk (Mock API Integration) ──────────────────────────────────────
/**
 * Loads transactions from the mock API on app start.
 * The mock API reads from localStorage (with a simulated delay),
 * falling back to seed data when localStorage is empty.
 */
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const data = await mockApi.fetchTransactions();
    return data;
  }
);

// ─── Initial State ────────────────────────────────────────────────────────────
const initialState = {
  items: [],          // populated by fetchTransactions on mount
  isLoading: true,    // true until the mock API responds

  // Filter & sort state
  searchTerm: "",
  categoryFilter: "All",
  typeFilter: "All",
  sortBy: "newest",

  // Advanced filters
  dateFrom: "",
  dateTo: "",
  groupBy: "none",    // "none" | "month" | "category"
};

// ─── Slice ────────────────────────────────────────────────────────────────────
const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    // CRUD — each action also writes to localStorage for persistence
    addTransaction: (state, action) => {
      state.items.unshift(action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.items));
    },
    editTransaction: (state, action) => {
      const idx = state.items.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = action.payload;
        localStorage.setItem("transactions", JSON.stringify(state.items));
      }
    },
    deleteTransaction: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.items));
    },

    // Basic filters
    setSearchTerm:     (state, action) => { state.searchTerm     = action.payload; },
    setCategoryFilter: (state, action) => { state.categoryFilter = action.payload; },
    setTypeFilter:     (state, action) => { state.typeFilter     = action.payload; },
    setSortBy:         (state, action) => { state.sortBy         = action.payload; },

    // Advanced filters
    setDateFrom: (state, action) => { state.dateFrom = action.payload; },
    setDateTo:   (state, action) => { state.dateTo   = action.payload; },
    setGroupBy:  (state, action) => { state.groupBy  = action.payload; },

    // Reset all filters to defaults
    resetFilters: (state) => {
      state.searchTerm     = "";
      state.categoryFilter = "All";
      state.typeFilter     = "All";
      state.sortBy         = "newest";
      state.dateFrom       = "";
      state.dateTo         = "";
      state.groupBy        = "none";
    },
  },

  // Handle the async thunk lifecycle
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.items     = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.isLoading = false; // still show UI even if API fails
      });
  },
});

// ─── Exports ──────────────────────────────────────────────────────────────────
export const {
  addTransaction,
  editTransaction,
  deleteTransaction,
  setSearchTerm,
  setCategoryFilter,
  setTypeFilter,
  setSortBy,
  setDateFrom,
  setDateTo,
  setGroupBy,
  resetFilters,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
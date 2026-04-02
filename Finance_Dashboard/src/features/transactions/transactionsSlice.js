import { createSlice } from "@reduxjs/toolkit";
import { mockTransactions } from "../../data/mockData";

const savedTransactions = localStorage.getItem("transactions");

const initialState = {
  items: savedTransactions ? JSON.parse(savedTransactions) : mockTransactions,
  searchTerm: "",
  categoryFilter: "All",
  typeFilter: "All",
  sortBy: "newest",
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.items.unshift(action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.items));
    },
    editTransaction: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem("transactions", JSON.stringify(state.items));
      }
    },
    deleteTransaction: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.items));
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;_
    },
    setTypeFilter: (state, action) => {
      state.typeFilter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  addTransaction,
  editTransaction,
  deleteTransaction,
  setSearchTerm,
  setCategoryFilter,
  setTypeFilter,
  setSortBy,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
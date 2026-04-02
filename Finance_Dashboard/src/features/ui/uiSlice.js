import { createSlice } from "@reduxjs/toolkit";

const savedTheme = localStorage.getItem("theme");

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    darkMode: savedTheme === "dark",
    isModalOpen: false,
    editingTransaction: null,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("theme", state.darkMode ? "dark" : "light");
    },
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.editingTransaction = action.payload || null;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.editingTransaction = null;
    },
  },
});

export const { toggleTheme, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
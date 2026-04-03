import { createSlice } from "@reduxjs/toolkit";

const savedTheme = localStorage.getItem("theme");

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    darkMode: savedTheme === "dark",
    isModalOpen: false,
    editingTransaction: null,
    isSidebarOpen: false,
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
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const { toggleTheme, openModal, closeModal, toggleSidebar, closeSidebar } = uiSlice.actions;
export default uiSlice.reducer;
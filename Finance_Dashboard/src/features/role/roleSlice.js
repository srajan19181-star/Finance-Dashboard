import { createSlice } from "@reduxjs/toolkit";

const savedRole = localStorage.getItem("role");

const roleSlice = createSlice({
  name: "role",
  initialState: {
    currentRole: savedRole || "viewer",
  },
  reducers: {
    setRole: (state, action) => {
      state.currentRole = action.payload;
      localStorage.setItem("role", action.payload);
    },
  },
});

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;
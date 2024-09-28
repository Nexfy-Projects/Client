import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "bool",
  initialState: { value: false }, // 初期値
  reducers: {
    toggle(state) {
      state.value = !state.value; // 真偽値を反転
    },
  },
});

export const { toggle } = slice.actions;

export default slice.reducer;

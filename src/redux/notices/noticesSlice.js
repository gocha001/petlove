import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notices: null,
  isLoading: false,
  error: null,
};

const noticesSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {},
});

export const noticesReducer = noticesSlice.reducer;

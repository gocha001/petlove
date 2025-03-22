import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: null,
  isLoading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
});

export const newsReducer = newsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchNews } from "./newsOperations";

const initialState = {
  news: [],
  search: "",
  page: 1,
  limit: 6,
  totalPages: 1,
  isLoading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    resetNews: (state) => {
      state.news = [];
      state.page = 1;
    },
    searchNews: (state, action) => {
      state.search = action.payload;
    },
    changePageNews: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = action.payload.results;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const newsReducer = newsSlice.reducer;
export const { resetNews } = newsSlice.actions;
export const { searchNews } = newsSlice.actions;
export const { changePageNews } = newsSlice.actions;

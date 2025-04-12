import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../auth/authOperations.js";

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, { getState, thunkAPI }) => {
    try {
      const state = getState();
      const keyword = state.news.search;
      const page = state.news.page;
      const limit = state.news.limit;

      const response = await Api.get(`/news`, {
        params: { keyword, page, limit },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

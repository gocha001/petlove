import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

export const Api = axios.create({
  baseURL: "https://petlove.b.goit.study/api",
});

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, { getState, rejectedWithValue }) => {
    try {
      const state = getState();
      const keyword = state.news.search;
      const page = state.news.page;
      const limit = state.news.limit;

      const response = await Api.get(`/news`, {
        params: { keyword: keyword, page: page, limit: limit },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response?.data);
    }
  }
);

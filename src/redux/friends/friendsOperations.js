import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../news/newsOperations";

export const fetchFriends = createAsyncThunk(
  "friends/fetchFriends",
  async (_, rejectedWithValue) => {
    try {
      const response = await Api.get(`/friends`);
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response?.data);
    }
  }
);

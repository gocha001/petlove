import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../auth/authOperations.js";

export const fetchFriends = createAsyncThunk(
  "friends/fetchFriends",
  async (_, thunkAPI) => {
    try {
      const response = await Api.get(`/friends`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

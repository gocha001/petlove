import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: null,
  isLoading: false,
  error: null,
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
});

export const friendsReducer = friendsSlice.reducer;

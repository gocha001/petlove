import { createSlice } from "@reduxjs/toolkit";
import { fetchFriends } from "./friendsOperations";

const initialState = {
  friends: [],
  isLoading: false,
  error: null,
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    resetFriends: (state) => {
      state.friends = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.isLoading = false;
        state.friends = action.payload;
        console.log(state.friends);
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const friendsReducer = friendsSlice.reducer;
export const { resetFriends } = friendsSlice.actions;

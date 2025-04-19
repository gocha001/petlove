import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { registration, login, logout } from "./authOperations";
import { toast } from "react-toastify";

const initialState = {
  user: {
    name: null,
    email: null,
    avatar: null,
    phone: null,
  },
  token: null,
  noticesViewed: [],
  noticesFavorites: [],
  pets: [],
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        };
        state.token = action.payload.token;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        };
        state.token = action.payload.token;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = {
          name: null,
          email: null,
        };
        state.token = null;
        console.log(state.user);
        console.log(state.token);
      })
      .addMatcher(
        isAnyOf(registration.pending, login.pending, logout.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(registration.rejected, login.rejected, logout.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          toast.error(
            typeof state.error === "string"
              ? state.error
              : state.error?.message || "Something went wrong"
          );
        }
      );
  },
});

export const authReducer = authSlice.reducer;

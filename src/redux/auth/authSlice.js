import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  registration,
  login,
  logout,
  fullUser,
  editUser,
  addPets,
  deletePets,
} from "./authOperations";
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
  reducers: {
    deleteNotice: (state, action) => {
      state.noticesFavorites = state.noticesFavorites.filter(
        (item) => item._id != action.payload
      );
    },
    addNotice: (state, action) => {
      state.noticesFavorites.push(action.payload);
    },
  },
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
      })
      .addCase(fullUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone !== "" ? action.payload.phone : "+380",
          avatar: action.payload.avatar,
        };
        state.token = action.payload.token;
        state.pets = action.payload.pets;
        state.noticesFavorites = action.payload.noticesFavorites;
        state.noticesViewed = action.payload.noticesViewed;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone !== "" ? action.payload.phone : "+380",
          avatar: action.payload.avatar,
        };
        state.token = action.payload.token;
        state.pets = action.payload.pets;
        state.noticesFavorites = action.payload.noticesFavorites;
        state.noticesViewed = action.payload.noticesViewed;
      })
      .addCase(addPets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pets = action.payload.pets;
      })
      .addCase(deletePets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pets = action.payload.pets;
      })
      .addMatcher(
        isAnyOf(
          registration.pending,
          login.pending,
          logout.pending,
          fullUser.pending,
          editUser.pending,
          addPets.pending,
          deletePets.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          registration.rejected,
          login.rejected,
          logout.rejected,
          fullUser.rejected,
          editUser.rejected,
          addPets.rejected,
          deletePets.rejected
        ),
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
export const { deleteNotice } = authSlice.actions;
export const { addNotice } = authSlice.actions;

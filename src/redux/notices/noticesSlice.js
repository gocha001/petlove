import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchCategories,
  fetchCities,
  fetchNotices,
  fetchSex,
  fetchSpecies,
  fetchNoticesId,
  favoritesAdd,
  favoritesDelete,
} from "./noticesOperations";
import { currentUser } from "../auth/authOperations";

const initialState = {
  notices: [],
  search: "",
  category: "",
  species: "",
  sex: "",
  location: "",
  byPrice: null,
  byPopularity: null,
  categoryList: [],
  speciesList: [],
  sexList: [],
  locationList: [],
  noticeId: {},
  favoritesId: [],
  page: 1,
  totalPages: 1,
  limit: 6,
  isLoading: false,
  error: null,
};

const noticesSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {
    resetNotices: (state) => {
      state.notices = [];
      state.page = 1;
    },

    searchNotices: (state, action) => {
      state.search = action.payload;
    },

    filterNotices: (state, action) => {
      state.category = action.payload.category;
      state.species = action.payload.species;
      state.sex = action.payload.sex;
      state.location = action.payload.location;
      state.byPrice = action.payload.price;
      state.byPopularity = action.payload.popularity;
      state.page = 1;
    },

    changePageNotices: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notices = action.payload.results;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload;
      })
      .addCase(fetchSex.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sexList = action.payload;
      })
      .addCase(fetchSpecies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.speciesList = action.payload;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.locationList = action.payload;
      })
      .addCase(fetchNoticesId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.noticeId = action.payload;
      })
      .addCase(favoritesAdd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoritesId = action.payload;
      })
      .addCase(favoritesDelete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoritesId = action.payload;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoritesId = action.payload.noticesFavorites.map(
          (item) => item._id
        );
      })
      .addMatcher(
        isAnyOf(
          fetchNotices.pending,
          fetchCategories.pending,
          fetchSex.pending,
          fetchSpecies.pending,
          fetchCities.pending,
          fetchNoticesId.pending,
          favoritesAdd.pending,
          favoritesDelete.pending,
          currentUser.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchNotices.rejected,
          fetchCategories.rejected,
          fetchSex.rejected,
          fetchSpecies.rejected,
          fetchCities.rejected,
          fetchNoticesId.rejected,
          favoritesAdd.rejected,
          favoritesDelete.rejected,
          currentUser.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const noticesReducer = noticesSlice.reducer;
export const { resetNotices } = noticesSlice.actions;
export const { searchNotices } = noticesSlice.actions;
export const { filterNotices } = noticesSlice.actions;
export const { changePageNotices } = noticesSlice.actions;

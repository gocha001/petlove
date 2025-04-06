import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchCategories,
  fetchCities,
  fetchNotices,
  fetchSex,
  fetchSpecies,
} from "./noticesOperations";

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
      .addMatcher(
        isAnyOf(
          fetchNotices.pending,
          fetchCategories.pending,
          fetchSex.pending,
          fetchSpecies.pending,
          fetchCities.pending
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
          fetchCities.rejected
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

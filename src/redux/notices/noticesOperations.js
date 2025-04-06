import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../news/newsOperations";

export const fetchNotices = createAsyncThunk(
  "notices/fetchNotices",
  async (_, { getState, rejectedWithValue }) => {
    try {
      const state = getState();
      const keyword = state.notices.search;
      const category = state.notices.category;
      const species = state.notices.species;
      const sex = state.notices.sex;
      const locationId = state.notices.location;
      const byPrice = state.notices.byPrice;
      const byPopularity = state.notices.byPopularity;
      const page = state.notices.page;
      const limit = state.notices.limit;

      const response = await Api.get(`/notices`, {
        params: {
          keyword,
          category,
          species,
          sex,
          locationId,
          byPrice,
          byPopularity,
          page,
          limit,
        },
      });

      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response?.data);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, rejectedWithValue) => {
    try {
      const response = await Api.get(`/notices/categories`);

      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response?.data);
    }
  }
);

export const fetchSex = createAsyncThunk(
  "sex/fetchSex",
  async (_, rejectedWithValue) => {
    try {
      const response = await Api.get(`/notices/sex`);

      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response?.data);
    }
  }
);

export const fetchSpecies = createAsyncThunk(
  "species/fetchSpecies",
  async (_, rejectedWithValue) => {
    try {
      const response = await Api.get(`/notices/species`);

      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response?.data);
    }
  }
);

export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async (_, { getState, rejectedWithValue }) => {
    try {
      const state = getState();
      const keyword = state.notices.location;

      const response = await Api.get(`/cities/locations`, {
        params: {
          keyword,
        },
      });

      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response?.data);
    }
  }
);

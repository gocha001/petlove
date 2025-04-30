import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../auth/authOperations.js";

export const fetchNotices = createAsyncThunk(
  "notices/fetchNotices",
  async (_, { getState, thunkAPI }) => {
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
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await Api.get(`/notices/categories`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const fetchSex = createAsyncThunk(
  "sex/fetchSex",
  async (_, thunkAPI) => {
    try {
      const response = await Api.get(`/notices/sex`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const fetchSpecies = createAsyncThunk(
  "species/fetchSpecies",
  async (_, thunkAPI) => {
    try {
      const response = await Api.get(`/notices/species`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async (_, { getState, thunkAPI }) => {
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
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const fetchNoticesId = createAsyncThunk(
  "noticesId/fetchNoticesId",
  async (id, thunkAPI) => {
    try {
      const response = await Api.get(`/notices/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const favoritesAdd = createAsyncThunk(
  "add/favoritesAdd",
  async (id, thunkAPI) => {
    try {
      const response = await Api.post(`notices/favorites/add/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const favoritesDelete = createAsyncThunk(
  "delete/favoritesDelete",
  async (id, thunkAPI) => {
    try {
      const response = await Api.delete(`notices/favorites/remove/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

export const Api = axios.create({
  baseURL: "https://petlove.b.goit.study/api",
});

const setAuthHeader = (token) => {
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const registration = createAsyncThunk(
  "auth/registration",
  async (credentials, thunkAPI) => {
    try {
      const response = await Api.post("users/signup", credentials);
      console.log(response.data);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await Api.post("users/signin", credentials);

      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await Api.post("users/signout");
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

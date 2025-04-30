import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

export const Api = axios.create({
  baseURL: "https://petlove.b.goit.study/api",
});

export const setAuthHeader = (token) => {
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const registration = createAsyncThunk(
  "auth/registration",
  async (credentials, thunkAPI) => {
    try {
      const response = await Api.post("users/signup", credentials);

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
    await Api.post("users/signout");
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const currentUser = createAsyncThunk(
  "auth/currentUser",
  async (_, thunkAPI) => {
    try {
      const response = await Api.get(`users/current`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const fullUser = createAsyncThunk(
  "auth/fullUser",
  async (_, thunkAPI) => {
    try {
      const response = await Api.get(`users/current/full`);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editUser = createAsyncThunk(
  "auth/editUser",
  async (userData, thunkAPI) => {
    try {
      const { data } = await Api.patch(`users/current/edit`, userData);

      return data;
    } catch (error) {
      const message = error.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uploadImageToCloudinary = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary config missing");
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const { data } = await axios.post(url, formData);

  return data.secure_url;
};

export const addPets = createAsyncThunk(
  "auth/addPets",
  async (data, thunkAPI) => {
    try {
      const response = await Api.post(`users/current/pets/add`, data);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletePets = createAsyncThunk(
  "auth/deletePets",
  async (id, thunkAPI) => {
    try {
      const response = await Api.delete(`users/current/pets/remove/${id}`);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

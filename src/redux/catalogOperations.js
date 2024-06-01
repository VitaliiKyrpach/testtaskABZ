import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "https://frontend-test-assignment-api.abz.agency/api/v1";

export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/users`, {
        params: { count: 6, page: page },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/users`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, createUser } from "./catalogOperations";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    page: 1,
    totalPages: null,
    isLoading: false,
    error: null,
    success: false,
  },
  reducers: {
    handleSuccess(state, action) {
      state.success = action.payload;
    },
    handlePage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.totalPages = action.payload.total_pages;
        const page = action.payload.page;
        if (page == 1) {
          state.items = action.payload.users;
        } else {
          state.items = [...state.items, ...action.payload.users];
        }
        state.page = action.payload.page;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.success = true;
        state.page = 1;
      }),
});

export const { handleSuccess, handlePage } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

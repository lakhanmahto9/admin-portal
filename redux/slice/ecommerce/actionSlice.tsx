import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "@/baseUrl";
import { blockOrUnblockEcommerceBuyerApi, editUserApi, viewUserApi } from "@/redux/api/ecommerce/actionApi";

// Async thunk for blocking/unblocking buyers
export const blockOrUnblockEcommerceBuyerThunk = createAsyncThunk(
  "buyers/blockOrUnblock",
  async (buyerId: string, { rejectWithValue }) => {
    try {
      const response = await blockOrUnblockEcommerceBuyerApi(buyerId);
      return response.data; // Returning the response data on success
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to block/unblock buyer"
      );
    }
  }
);

// Async thunk for editing user details
export const editUserThunk = createAsyncThunk(
  "buyers/editUser",
  async (userData: { userId: string; updates: any }, { rejectWithValue }) => {
    try {
      const response = await editUserApi(userData.userId, userData.updates);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to edit user"
      );
    }
  }
);

// Async thunk for viewing user details
export const viewUserThunk = createAsyncThunk(
  "buyers/viewUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await viewUserApi(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user details"
      );
    }
  }
);

// Define the initial state and its types explicitly
interface UserActionState {
  loading: boolean;
  success: boolean;
  error: string | null;
  userDetails: any | null;  // To store user data
}

const initialState: UserActionState = {
  loading: false,
  success: false,
  error: null,
  userDetails: null, // This will store the details of a user when viewing/editing
};

// Slice
const actionSlice = createSlice({
  name: "userActions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Block or Unblock Buyers
    builder
      .addCase(blockOrUnblockEcommerceBuyerThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(blockOrUnblockEcommerceBuyerThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(blockOrUnblockEcommerceBuyerThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string || "An error occurred";
      });

    // Edit User
    builder
      .addCase(editUserThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(editUserThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(editUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string || "An error occurred";
      });

    // View User Details
    builder
      .addCase(viewUserThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(viewUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userDetails = action.payload; // Store user details here
        state.error = null;
      })
      .addCase(viewUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.userDetails = null;
        state.error = action.payload as string || "An error occurred";
      });
  },
});

export default actionSlice.reducer;

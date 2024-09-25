import { fetchAllPartnersApi } from "../api/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state interface
interface FranchiseState {
  franchises: any[];
  loading: boolean;
  error: string | null; // Error can be a string or null
}

// Define the initial state with proper types
const initialState: FranchiseState = {
  franchises: [],
  loading: false,
  error: null,
};

// Create an async thunk for fetching franchise data
export const fetchAllPartners = createAsyncThunk(
  "fetchAllPartners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllPartnersApi();
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response?.data?.message || "An error occurred");
      return rejectWithValue(error.response?.data?.message || "An error occurred");
    }
  }
);

// Create a slice with necessary reducers and extra reducers to handle thunk actions
const fetchAllPartnersSlice = createSlice({
  name: "fetchAllPartners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPartners.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset errors on a new request
      })
      .addCase(fetchAllPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.franchises = action.payload; // Update state with fetched data
      })
      .addCase(fetchAllPartners.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload; // Set error from rejected thunk
      });
  },
});

// Export the reducer to be used in the store
export default fetchAllPartnersSlice.reducer;

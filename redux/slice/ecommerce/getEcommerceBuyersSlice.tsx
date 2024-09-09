import { getEcommerceBuyersApi } from "@/redux/api/ecommerce/getEcommerceBuyersApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch ecommerce buyers
export const getEcommerceBuyersThunk = createAsyncThunk("buyers/getEcommerceBuyers", async () => {
  try {
    const result = await getEcommerceBuyersApi();
    return result.data;  // Assuming result.data contains the necessary buyer data
  } catch (error) {
    console.error(error);
    throw error;  // Ensure error is propagated to the rejected case
  }
});

// Initial state
const initialState = {
  status: "idle",
  error: null as string | null,
  data: null as any,
};

// Slice to handle buyers data
const getEcommerceBuyersSlice = createSlice({
  name: "buyers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEcommerceBuyersThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getEcommerceBuyersThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getEcommerceBuyersThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch buyers";
      });
  },
});

// Export the correct reducer
export default getEcommerceBuyersSlice.reducer;

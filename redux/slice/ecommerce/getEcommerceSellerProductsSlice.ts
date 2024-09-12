import { getEcommerceSellersApi } from "@/redux/api/ecommerce/getEcommerceSellersApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch ecommerce sellers
export const getEcommerceSellersThunk = createAsyncThunk("sellers/getEcommerceSellers", async () => {
  try {
    const result = await getEcommerceSellersApi();
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
const getEcommerceSellersSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEcommerceSellersThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getEcommerceSellersThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getEcommerceSellersThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch buyers";
      });
  },
});

// Export the correct reducer
export default getEcommerceSellersSlice.reducer;

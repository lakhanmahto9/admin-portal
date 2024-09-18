import { getOrderDetailsApi } from "@/redux/api/ecommerce/orderApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk for fetching order details
export const getOrderDetailsThunk = createAsyncThunk(
  "orders/getOrderDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrderDetailsApi(); // API call
      return response.data; // Returning the order details
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order details"
      );
    }
  }
);

// Initial state for orders
interface OrderState {
  orders: any[]; // Replace with your order type/interface
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

// Order slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {}, // You can add reducers if needed
  extraReducers: (builder) => {
    builder
      // Handle fetch order details
      .addCase(getOrderDetailsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetailsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders; // Store fetched orders
      })
      .addCase(getOrderDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "An error occurred"; // Assign error message
      });
  },
});

export default orderSlice.reducer;

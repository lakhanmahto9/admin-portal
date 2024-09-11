import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  blockOrUnblockEcommerceSellerApi,
  editUserApi,
  verifyESellerApi,
  viewSellerApi,
} from "@/redux/api/ecommerce/sellerActionApi";

// Async thunk for blocking/unblocking sellers
export const blockOrUnblockEcommerceSellerThunk = createAsyncThunk(
  "sellers/blockOrUnblock",
  async (sellerId: string, { rejectWithValue }) => {
    try {
      const response = await blockOrUnblockEcommerceSellerApi(sellerId);
      return response.data; // Returning the response data on success
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to block/unblock seller"
      );
    }
  }
);

// Async thunk for editing seller details
export const editSellerThunk = createAsyncThunk(
  "sellers/editSeller",
  async (sellerData: { sellerId: string; updates: any }, { rejectWithValue }) => {
    try {
      const response = await editUserApi(sellerData.sellerId, sellerData.updates); // Using the editUserApi for both buyers and sellers
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to edit seller"
      );
    }
  }
);

// Async thunk for viewing seller details
export const viewSellerThunk = createAsyncThunk(
  "sellers/viewSeller",
  async (sellerId: string, { rejectWithValue }) => {
    try {
      const response = await viewSellerApi(sellerId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller details"
      );
    }
  }
);

// Async thunk for verifying sellers
export const verifyESellerThunk = createAsyncThunk(
  "sellers/verify",
  async (sellerId: string, { rejectWithValue }) => {
    try {
      const response = await verifyESellerApi(sellerId);
      return response.data; // Returning the response data on success
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to verify seller"
      );
    }
  }
);

// Define the initial state and its types explicitly
interface SellerActionState {
  loading: boolean;
  success: boolean;
  error: string | null;
  sellerDetails: any | null;  // To store seller data
}

const initialState: SellerActionState = {
  loading: false,
  success: false,
  error: null,
  sellerDetails: null, // This will store the details of a seller when viewing/editing
};

// Slice
const sellerActionSlice = createSlice({
  name: "sellerActions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Block or Unblock Sellers
    builder
      .addCase(blockOrUnblockEcommerceSellerThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(blockOrUnblockEcommerceSellerThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(blockOrUnblockEcommerceSellerThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string || "An error occurred";
      });

    // Edit Seller
    builder
      .addCase(editSellerThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(editSellerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.sellerDetails = action.payload; // Update seller details here
        state.error = null;
      })
      .addCase(editSellerThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string || "An error occurred";
      });

    // View Seller Details
    builder
      .addCase(viewSellerThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(viewSellerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.sellerDetails = action.payload; // Store seller details here
        state.error = null;
      })
      .addCase(viewSellerThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.sellerDetails = null;
        state.error = action.payload as string || "An error occurred";
      });

    // Verify Seller
    builder
      .addCase(verifyESellerThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(verifyESellerThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(verifyESellerThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string || "An error occurred";
      });
  },
});

export default sellerActionSlice.reducer;

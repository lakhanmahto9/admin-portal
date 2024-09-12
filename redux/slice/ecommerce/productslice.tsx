import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductsApi, getProductByIdApi } from "@/redux/api/ecommerce/productApi";
import {  ProductState } from "@/components/nft-ecommerce/products/productType";


// Async thunk for fetching all products
export const getProductsThunk = createAsyncThunk(
  "products/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllProductsApi(); // Calling the API function from productApi.ts
      return response.data; // Returning the product data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// Async thunk for fetching a single product by ID
export const getProductByIdThunk = createAsyncThunk(
  "products/getById",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await getProductByIdApi(productId); // Calling the API function from productApi.ts
      return response.data; // Returning the product data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

// Initial state

const initialState: ProductState = {
    products: [],
    singleProduct: null,
    loading: false,
    error: null,
  };

// Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {}, // Add reducers if needed
  extraReducers: (builder) => {
    builder
      // Handle fetch all products
      .addCase(getProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Store fetched products
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "An error occurred"; // Assign the error message
      })
      
      // Handle fetch single product
      .addCase(getProductByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload.data; // Store fetched single product
      })
      .addCase(getProductByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.singleProduct = null;
        state.error = action.payload as string || "An error occurred"; // Assign the error message
      });
  },
});

export default productSlice.reducer;

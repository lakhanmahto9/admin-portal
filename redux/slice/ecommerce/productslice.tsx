import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductsApi, getProductByIdApi, getSellerProductsApi } from "@/redux/api/ecommerce/productApi";
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


// Async thunk for fetching seller products by seller ID
export const fetchSellerProductsThunk = createAsyncThunk(
  "products/fetchSellerProducts",
  async (sellerId: string, { rejectWithValue }) => {
    try {
      const response = await getSellerProductsApi(sellerId); // API call
      return response.data; // Return fetched seller products
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller products"
      );
    }
  }
);


// Initial state

const initialState: ProductState = {
    products: [],
    singleProduct: null,
    sellerProducts: [],

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
      builder
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
      builder

        // Handle fetch seller products
    builder
    .addCase(fetchSellerProductsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchSellerProductsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.sellerProducts = action.payload.data; // Store seller products
    })
    .addCase(fetchSellerProductsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || "Failed to fetch seller products";
    });
  },
});

export default productSlice.reducer;

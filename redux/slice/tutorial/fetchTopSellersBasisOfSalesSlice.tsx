import { fetchTopSellersOnBasisOfSalesApi } from "@/redux/api/tutorial/tutorialApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTopSellersOnBasisOfSales = createAsyncThunk(
  "fetchtopsellersonbasisofsales",
  async () => {
    try {
      const response = await fetchTopSellersOnBasisOfSalesApi();
      // console.log(response.data)
      return response.data;
    } catch (error:any) {
      console.log(error.response.data.message)
      // toast.error(error.response.data.message)
    }
  }
);

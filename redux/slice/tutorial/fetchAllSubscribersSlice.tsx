import { fetchAllSubscribersApi } from "@/redux/api/tutorial/tutorialApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllSubscribers = createAsyncThunk(
  "fetchallsubscribers",
  async () => {
    try {
      const response = await fetchAllSubscribersApi();
    //   console.log(response.data)
      return response.data;
    } catch (error:any) {
      console.log(error.response.data.message)
      // toast.error(error.response.data.message)
    }
  }
);

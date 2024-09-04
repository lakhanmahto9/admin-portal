import { fetchAllCreatersApi } from "@/redux/api/tutorial/tutorialApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllCreaters = createAsyncThunk(
  "fetchallcreaters",
  async () => {
    try {
      const response = await fetchAllCreatersApi();
    //   console.log(response.data)
      return response.data;
    } catch (error:any) {
      console.log(error.response.data.message)
      // toast.error(error.response.data.message)
    }
  }
);

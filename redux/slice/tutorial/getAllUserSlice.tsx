import { fetchAllUsersApi } from "@/redux/api/tutorial/tutorialApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllUsers = createAsyncThunk(
  "fetchallusers",
  async () => {
    try {
      const response = await fetchAllUsersApi();
      // console.log(response.data)
      return response.data;
    } catch (error:any) {
      console.log(error.response.data.message)
      // toast.error(error.response.data.message)
    }
  }
);

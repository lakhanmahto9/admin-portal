import {FetchTotalUserPlaylistCreatorCount} from "../api/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchTotalUserPlaylistCreatorCount = createAsyncThunk(
  "fetchtotaluserplaylistcreatorcoun",
  async () => {
    try {
      const response = await FetchTotalUserPlaylistCreatorCount();
      console.log(response.data, "total seller buyer")
      return response.data;
    } catch (error:any) {
      console.log(error.response.data.message)
      // toast.error(error.response.data.message)
    }
  }
);

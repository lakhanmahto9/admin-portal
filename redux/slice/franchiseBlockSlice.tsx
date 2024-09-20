import { franchiseBlockApi } from "../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const franchiseBlock = createAsyncThunk(
  "franchiseblock",
  async (payload: any) => {
    try {
      const result = await franchiseBlockApi(payload);
      return result.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
);

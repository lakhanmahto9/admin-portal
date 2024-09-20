// import { phbuyerverifyapi } from "@/redux/api/photography/photographyapi";
import { franchiseProfileVerifyApi } from "../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const franchiseProfileVerify = createAsyncThunk(
  "franchiseprofileverify",
  async (payload: any) => {
    try {
      const result = await franchiseProfileVerifyApi(payload);
      return result.data;
    } catch (error: any) {
      toast.warn(error.response.data.message);
      console.log(error);
    }
  }
);

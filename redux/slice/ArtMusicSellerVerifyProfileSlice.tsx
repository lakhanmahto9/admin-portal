// import { phbuyerverifyapi } from "@/redux/api/photography/photographyapi";
import { artMusicSellerVerifyApi } from "../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const artMusicSellerVerifyProile = createAsyncThunk(
  "artmusicsellerprofileverify",
  async (payload: any) => {
    try {
      const result = await artMusicSellerVerifyApi(payload);
      return result.data;
    } catch (error: any) {
      toast.warn(error.response.data.message);
      console.log(error);
    }
  }
);

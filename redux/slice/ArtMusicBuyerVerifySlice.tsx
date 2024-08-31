// import { phbuyerverifyapi } from "@/redux/api/photography/photographyapi";
import { artMusicBuyerVerifyApi } from "../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const artMusicBuyerVerifyProile = createAsyncThunk("artmusicprofileverify", async (payload:any) => {
  try {
    const result = await artMusicBuyerVerifyApi(payload);
    return result.data;
  } catch (error:any) {
    toast.warn(error.response.data.message)
    console.log(error);
  }
});
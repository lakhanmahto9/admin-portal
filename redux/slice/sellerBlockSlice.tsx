import { sellerBlockApi } from "../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const sellerBlockProile = createAsyncThunk("sellerblock", async (payload:any) => {
  try {
    const result = await sellerBlockApi(payload);
    return result.data;
  } catch (error:any) {
    toast.error(error.response.data.message)
    console.log(error);
  }
});
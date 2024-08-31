import { buyerblockapi } from "../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const buyerBlockProile = createAsyncThunk("buyerblock", async (payload:any) => {
  try {
    const result = await buyerblockapi(payload);
    return result.data;
  } catch (error:any) {
    toast.error(error.response.data.message)
    console.log(error);
  }
});
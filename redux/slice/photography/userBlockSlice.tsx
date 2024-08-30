import { phbuyerblockapi } from "@/redux/api/photography/photographyapi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const phbuyerBlockProile = createAsyncThunk("phprofile", async (payload:any) => {
  try {
    const result = await phbuyerblockapi(payload);
    return result.data;
  } catch (error:any) {
    toast.error(error.response.data.message)
    console.log(error);
  }
});
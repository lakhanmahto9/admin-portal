import { phsellerblockapi } from "@/redux/api/photography/photographyapi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const phsellerBlockProile = createAsyncThunk("phprofile", async (payload:any) => {
  try {
    const result = await phsellerblockapi(payload);
    return result.data;
  } catch (error:any) {
    toast.error(error.response.data.message)
    console.log(error);
  }
});
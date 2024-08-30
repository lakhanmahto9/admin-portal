import { phbuyerverifyapi } from "@/redux/api/photography/photographyapi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const phbuyerVerifyProile = createAsyncThunk("phprofile", async (payload:any) => {
  try {
    const result = await phbuyerverifyapi(payload);
    return result.data;
  } catch (error:any) {
    toast.warn(error.response.data.message)
    console.log(error);
  }
});
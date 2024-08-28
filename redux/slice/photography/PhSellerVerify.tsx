import { phsellerverifyapi } from "@/redux/api/photography/photographyapi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const phsellerVerifyProile = createAsyncThunk("phprofile", async (payload:any) => {
  try {
    const result = await phsellerverifyapi(payload);
    return result.data;
  } catch (error) {
    console.log(error);
  }
});
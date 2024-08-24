import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminloginapi } from "../api/adminlogin";
import { toast } from "react-toastify";

export const adminLogin = createAsyncThunk(
  "auth",
  async (payload: any) => {
    try {
      const result = await adminloginapi(payload);
      return result.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
);

const initialState = {
  status: "idle",
  error: null as string | any,
  data: null as any,
};

const adminLoginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userSignout: (state) => {
      state.status = "idle";
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        console.log("pending");
        state.status = "loading";
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        console.log("success", action.payload);
        state.status = "success";
        state.data = action.payload;
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        localStorage.setItem("access_token", action.payload.data.token);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        console.log("failed");
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export default adminLoginSlice.reducer;
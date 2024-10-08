import { disabledAdminNotificationApi } from "../api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const disabledAdminNotification = createAsyncThunk(
  "disabledadminnotification",
  async () => {
    try {
      const response = await disabledAdminNotificationApi();
      return response.data;
    } catch (error:any) {
      toast.error(error.response.data.message)
    }
  }
);
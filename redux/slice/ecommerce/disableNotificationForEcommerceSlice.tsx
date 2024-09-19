// import { disabledAdminNotificationForVideoApi } from "../api/api";
import { disabledAdminNotificationForEcommerceApi } from "@/redux/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const disabledAdminNotificationForEcommerce = createAsyncThunk(
  "disabledadminnotificationforecommerce",
  async () => {
    try {
      const response = await disabledAdminNotificationForEcommerceApi();
      return response.data;
    } catch (error:any) {
      toast.error(error.response.data.message)
    }
  }
);
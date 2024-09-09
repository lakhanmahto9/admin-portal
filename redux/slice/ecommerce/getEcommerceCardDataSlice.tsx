import {getEcommerCardDataApi} from "../../api/ecommerce/getEcommerceCardDataApi"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getEcommerceCardDataThunk = createAsyncThunk(
  "fetchtotaluserplaylistcreatorcoun",
  async () => {
    try {
      const response = await getEcommerCardDataApi();
      return response.data;
    } catch (error:any) {
      console.log(error.response.data.message)
      // toast.error(error.response.data.message)
    }
  }
);

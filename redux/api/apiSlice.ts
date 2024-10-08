import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import  {BASE_URL}  from "../constant";

console.log(BASE_URL)

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Admin", "User", "Creator", "Video"],
  endpoints: () => ({}),
});

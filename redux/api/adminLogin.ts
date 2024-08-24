import BASE_URL from "@/baseUrl";
import axios from "axios";

export const adminloginapi = (payload:any) => {
    return axios.post(`${BASE_URL}/admin/login`, payload,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
};
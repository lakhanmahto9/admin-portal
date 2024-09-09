import BASE_URL from "@/baseUrl";
import axios from "axios";

export const getEcommerceBuyersApi = () => {
    return axios.get(`${BASE_URL}/admin/get-ecommerce-buyers`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
};

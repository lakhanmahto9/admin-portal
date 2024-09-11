import BASE_URL from "@/baseUrl";
import axios from "axios";

export const getEcommerceSellersApi = () => {
    return axios.get(`${BASE_URL}/admin/get-ecommerce-sellers`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
};

import BASE_URL from "@/baseUrl";
import axios from "axios";

export const getEcommerCardDataApi = () => {
    return axios.get(`${BASE_URL}/admin/get-ecommerce-card-data`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
};

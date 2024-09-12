import BASE_URL from "@/baseUrl";
import axios from "axios";

export const getEcommerceSellerProductsApi = () => {
    return axios.get(`${BASE_URL}/admin/get-ecommerce-seller-products`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
};

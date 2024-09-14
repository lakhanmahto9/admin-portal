import BASE_URL from "@/baseUrl";
import axios from "axios";

// API for fetching all products
export const getAllProductsApi = () => {
  return axios.get(`${BASE_URL}/eproduct/get-all-products/`);
};

// API for fetching a single product by its ID
export const getProductByIdApi = (productId: string) => {
  return axios.get(`${BASE_URL}/eproduct/${productId}`);
};

// API for fetching seller products by sellerId
export const getSellerProductsApi = (sellerId: string) => {
  return axios.get(`${BASE_URL}/eproduct/fetch-seller-products/${sellerId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};


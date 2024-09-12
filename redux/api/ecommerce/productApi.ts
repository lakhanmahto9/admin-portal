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

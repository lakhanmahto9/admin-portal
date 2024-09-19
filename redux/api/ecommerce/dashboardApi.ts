import BASE_URL from "@/baseUrl";
import axios from "axios";

// API for blocking or unblocking an eCommerce buyer
export const getEcommerceMonthlySalesData = (selectedYear: number) => {
  return axios.get(
    `${BASE_URL}/admin/get-ecommerce-monthly-sales-data?year=${selectedYear}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
};

// API for blocking or unblocking an eCommerce buyer
export const getEcommerceSalesDetails = () => {
  return axios.get(`${BASE_URL}/admin/get-ecommerce-sales-details`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

// API for blocking or unblocking an eCommerce buyer
export const getEcommerceTransactions = () => {
  return axios.get(`${BASE_URL}/admin/get-transactions`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

// API for specific transaction
export const getEcommerceTransaction = (itemId:string) => {
    return axios.get(`${BASE_URL}/admin/get-transaction/${itemId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  };

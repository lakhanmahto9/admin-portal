import axios from 'axios';

import BASE_URL from "@/baseUrl";


// API for fetching order details
export const getOrderDetailsApi = () => {
  return axios.get(`${BASE_URL}/admin/get-order-details/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  }).catch(error => {
    console.error('Error fetching order details:', error);
    throw error; // Re-throw the error to handle it in the calling function
  });
};

// API for fetching order product details
export const getOrderProductDetailsApi = (orderId: string) => {
  return axios.get(`${BASE_URL}/admin/get-order-product-details/${orderId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  }).catch(error => {
    console.error(`Error fetching order product details for orderId ${orderId}:`, error);
    throw error; // Re-throw the error to handle it in the calling function
  });
};

// API for fetching order address details
export const getOrderAddressDetailsApi = (orderId: string) => {
  return axios.get(`${BASE_URL}/admin/get-order-address-details/${orderId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  }).catch(error => {
    console.error(`Error fetching order address details for orderId ${orderId}:`, error);
    throw error; // Re-throw the error to handle it in the calling function
  });
};

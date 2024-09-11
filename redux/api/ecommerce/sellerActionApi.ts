import BASE_URL from "@/baseUrl";
import axios from "axios";

// API for editing a user
export const editUserApi = (userId: string, updates: any) => {
  return axios.put(
    `${BASE_URL}/admin/edit-user/${userId}`,
    updates, // Pass the updates object which contains the data to be modified
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
};

// API for viewing seller details
export const viewSellerApi = (sellerId: string) => {
    return axios.get(
      `${BASE_URL}/admin/view-ecommerce-seller/${sellerId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
  };
  
  // API for verifying e seller 
  export const verifyESellerApi = (sellerId: string) => {
    return axios.patch(
      `${BASE_URL}/admin/verify-eseller/${sellerId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
  };
  
  // API for blocking or unblocking an eCommerce buyer
  export const blockOrUnblockEcommerceSellerApi = (sellerId: string) => {
    return axios.patch(
      `${BASE_URL}/admin/block-or-unblock-ecommerce-seller/${sellerId}`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
  };
  
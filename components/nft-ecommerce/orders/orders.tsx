import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import moment from 'moment'; // Import moment.js
import { AppDispatch } from '@/redux/store/store';
import { getOrderDetailsThunk } from '@/redux/slice/ecommerce/orderSlice';
import { LeftIcon, SearchIcon } from '@/public/icons/icons'; // Adjust import paths as necessary
import { useThemeColors } from '@/components/utils/useThemeColor';

const Orders: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  const orders = useSelector((state: any) => state.orders.orders);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getOrderDetailsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (orders.length > 0) {
      const filtered = orders.filter((order: any) =>
        order.orderId.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  }, [orders, search]);

  const handleAddressDetails = (orderId: string) => {
    router.push(`/admin-dashboard/nft-ecommerce/order-address-details/${orderId}`);
  };

  const handleProductDetails = (orderId: string) => {
    router.push(`/admin-dashboard/nft-ecommerce/order-product-details/${orderId}`);
  };

  const back = () => {
    router.push("/admin-dashboard/nft-ecommerce/ecommerce-dashboard");
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div
        className={`w-full h-[83vh]  rounded-xl`}
        style={{background:colors.cardBg}}
      >
        <div
          className={`h-[12%] ${isDarkEnabled ? "bg-[#0e1a49]" : "bg-[#dae2ff]"} rounded-t-xl flex justify-between`}
        >
          <div className="flex items-center gap-4 px-2">
            <div
              onClick={back}
              className={`w-10 h-10 ${isDarkEnabled ? "bg-[#040836]" : "bg-[#025f92]"} flex items-center justify-center rounded-full cursor-pointer`}
            >
              <LeftIcon color="#fff" width="20" height="20" />
            </div>
            <p
              className={`text-lg font-semibold ${isDarkEnabled ? "text-[#fff]" : "text-[#192555]"}`}
            >
              All Orders
            </p>
          </div>
          <div className="flex px-2 gap-2 items-center">
            <div className="relative">
              <input
                type="text"
                onChange={handleSearch}
                placeholder="Search by Order ID..."
                className="w-80 h-10 rounded-full pl-10 focus:outline-none"
              />
              <div className="absolute top-3 left-2">
                <SearchIcon color="#2e10dc" width="20" height="20" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[88%] overflow-y-scroll flex flex-wrap justify-between p-2 gap-2">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order: any) => (
              <div className="relative w-full md:w-[32%] h-72" key={order.orderId}>
                <div
                  className={`h-2/3 rounded-t-2xl ${isDarkEnabled ? "bg-[#051139] shadow-sm shadow-gray-500" : "bg-[#025f92]"} p-4`}
                >
                  <p className="text-[#fff]">Order ID: {order.orderId}</p>
                  <p className="text-[#fff]">
                    Order Date: {moment(order.orderDate).format("MMMM Do YYYY, h:mm:ss a")} {/* Use moment.js */}
                  </p>
                  <p className="text-[#fff]">Total Quantity: {order.totalQuantity}</p>
                  <p className="text-[#fff]">Payment Method: {order.paymentMethod}</p>
                  <p className="text-[#fff]">Payment Status: {order.paymentStatus}</p>
                  <p className="text-[#fff]">Total Amount: ${order.totalAmount.toFixed(2)}</p>
                </div>
                <div
                  className={`h-1/3 ${isDarkEnabled ? "bg-[#0e1a49] shadow-sm shadow-gray-500" : "bg-[#084363]"} rounded-b-2xl py-5`}
                >
                  <div className="flex gap-2 h-14 px-2">
                    <div
                      onClick={() => handleAddressDetails(order.orderId)}
                      className={`w-1/2 ${isDarkEnabled ? "bg-[#051139]" : "bg-[#025f92]"} cursor-pointer rounded-lg flex justify-center items-center`}
                    >
                      <p className="text-[#fff]">Address Details</p>
                    </div>
                    <div
                      onClick={() => handleProductDetails(order.orderId)}
                      className={`w-1/2 ${isDarkEnabled ? "bg-[#051139]" : "bg-[#025f92]"} cursor-pointer rounded-lg flex justify-center items-center`}
                    >
                      <p className="text-[#fff]">Product Details</p>
                    </div>
                  </div>
                </div>
                <div
                  className={`flex justify-center items-center gap-1 absolute w-[30%] h-8 bottom-[29%] left-[35%] px-2 ${isDarkEnabled ? "bg-[#051139] shadow-sm shadow-gray-600" : "bg-[#2c8993]"} rounded-full`}
                >
                  <p className="text-[#fff]">
                    {order.orderStatus}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-96 h-96 p-4 flex flex-col justify-center items-center">
                <p className="text-lg font-semibold text-[#fff]">No Orders found</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;

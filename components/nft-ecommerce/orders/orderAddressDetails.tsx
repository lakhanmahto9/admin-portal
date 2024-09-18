import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getOrderAddressDetailsApi } from '@/redux/api/ecommerce/orderApi';
import { DownloadIcon, LeftIcon } from "@/public/icons/icons"; // Assuming you have a download icon
import { useSelector } from 'react-redux';

interface OrderAddress {
  name: string;
  phone: string;
  buildingOrBlockNo: string;
  flatOrHouseNo: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  landmark?: string;
  addressLabel: string;
}

const OrderAddressDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orderAddress, setOrderAddress] = useState<OrderAddress | null>(null);
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);

  const back = () => {
    router.push("/admin-dashboard/nft-ecommerce/orders");
  };

  useEffect(() => {
    if (!id) return;

    const fetchAddressDetails = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response = await getOrderAddressDetailsApi(id as string);
        setOrderAddress(response.data.data); // Adjust API response structure if necessary
      } catch (err: any) {
        console.error('Failed to fetch order address details:', err);
        setError('Failed to fetch order address details.');
      } finally {
        setLoading(false);
      }
    };

    fetchAddressDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={`w-full h-[83vh] ${isDarkEnabled ? "bg-[#101c44]" : "bg-[#fff]"} rounded-xl`}>
      <div className={`h-[12%] ${isDarkEnabled ? "bg-[#101c44]" : "bg-[#dae2ff]"} rounded-t-xl flex justify-between`}>
        <div onClick={back} className="flex items-center gap-4 px-2">
          <div className={`w-10 h-10 ${isDarkEnabled ? "bg-[#040836]" : "bg-[#025f92]"} flex items-center justify-center rounded-full cursor-pointer`}>
            <LeftIcon color="#fff" width="20" height="20" />
          </div>
          <p className={`text-lg font-semibold ${isDarkEnabled ? "text-[#fff]" : "text-[#192555]"}`}>
            Order Address Details
          </p>
        </div>
      </div>
      <div className="w-full h-[88%] overflow-y-scroll flex flex-col p-2 md:p-7 gap-4">
        {/* Address Details Section */}
        <div className={`w-full h-auto border rounded-lg p-4 ${isDarkEnabled ? "bg-[#040836]" : "bg-[#ebf6fd]"} flex flex-col gap-4`}>
          {orderAddress && (
            <div className="flex flex-col gap-4 ml-5 mt-5">
              <p className={`text-xl font-bold ${isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"}`}>
                {orderAddress.name}
              </p>
              <p className={`text-lg ${isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"}`}>
                <strong>Phone:</strong> {orderAddress.phone}
              </p>
              <p className={`text-lg ${isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"}`}>
                <strong>Building/Block No:</strong> {orderAddress.buildingOrBlockNo}
              </p>
              <p className={`text-lg ${isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"}`}>
                <strong>Flat/House No:</strong> {orderAddress.flatOrHouseNo}
              </p>
              <p className={`text-lg ${isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"}`}>
                <strong>Address:</strong> {orderAddress.address}
              </p>
              <p className={`text-lg ${isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"}`}>
                <strong>City:</strong> {orderAddress.city}
              </p>
              <p className={`text-lg ${isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"}`}>
                <strong>State:</strong> {orderAddress.state}
              </p>
              <p className={`text-lg ${isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"}`}>
                <strong>Postal Code:</strong> {orderAddress.postalCode}
              </p>
              <p className={`text-lg ${isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"}`}>
                <strong>Country:</strong> {orderAddress.country}
              </p>
              {orderAddress.landmark && (
                <p className={`text-lg ${isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"}`}>
                  <strong>Landmark:</strong> {orderAddress.landmark}
                </p>
              )}
              <p className={`text-lg ${isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"}`}>
                <strong>Address Label:</strong> {orderAddress.addressLabel}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderAddressDetails;

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getOrderProductDetailsApi } from '@/redux/api/ecommerce/orderApi'; // Adjust import path if necessary
import { DownloadIcon, LeftIcon } from "@/public/icons/icons"; // Assuming you have these icons
import { useSelector } from 'react-redux';

interface ProductDetails {
  productId: string;
  productName: string;
  sellerId: string;
  size: string;
  color: string;
  colorImageUrl: string;
  quantity: number;
  price: number;
}

const OrderProductDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Order ID from route params
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [productDetails, setProductDetails] = useState<ProductDetails[]>([]);
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);

  const back = () => {
    router.push("/admin-dashboard/nft-ecommerce/orders");
  };

  useEffect(() => {
    if (!id) return;

    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null); // Reset error before new request
      try {
        const response = await getOrderProductDetailsApi(id as string);
        setProductDetails(response.data.data); // Assuming the API response has a `data` property
      } catch (err: any) {
        console.error('Failed to fetch order product details:', err);
        setError('Failed to fetch order product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
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
            Order Product Details
          </p>
        </div>
      </div>
      <div className="w-full h-[88%] overflow-y-scroll flex flex-col p-2 md:p-7 gap-6">
        {productDetails.map((product) => (
          <div key={product.productId} className={`w-full h-auto border rounded-lg p-6 ${isDarkEnabled ? "bg-[#040836]" : "bg-[#ebf6fd]"} flex items-start gap-6 shadow-md`}>
            {/* Product Image Section */}
            <div className="w-24 h-24 md:w-36 md:h-36 rounded-lg overflow-hidden flex-shrink-0 shadow-lg">
              {product.colorImageUrl ? (
                <img
                  src={product.colorImageUrl}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <p>No Image</p>
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="flex flex-col justify-center w-full">
              <p className={`text-xl md:text-2xl font-semibold ${isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"}`}>
                {product.productName}
              </p>
              <p className={`text-lg md:text-xl ${isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"}`}>
                <strong>Size:</strong> {product.size}
              </p>
              <p className={`text-lg md:text-xl ${isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"}`}>
                <strong>Color:</strong> {product.color}
              </p>
              <p className={`text-lg md:text-xl ${isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"}`}>
                <strong>Quantity:</strong> {product.quantity}
              </p>
              <p className={`text-lg md:text-xl font-bold ${isDarkEnabled ? "text-[#ffdf5d]" : "text-[#2b4348]"}`}>
                <strong>Price:</strong> ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderProductDetails;

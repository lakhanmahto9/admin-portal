import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch } from "@/redux/store/store";
import { getBuyerPurchasedProductsThunk } from "@/redux/slice/ecommerce/productslice";
import { LeftIcon } from "@/public/icons/icons";
import { useThemeColors } from "@/components/utils/useThemeColor";

const BuyerPurchasedProducts: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = router.query;
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  // State for products and dark mode
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState<
    number | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [noProductsMessage, setNoProductsMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (typeof id === "string") {
      const fetchProducts = async () => {
        try {
          const response = await dispatch(getBuyerPurchasedProductsThunk(id));
          if (
            response.payload === "No purchased products found for this buyer"
          ) {
            setNoProductsMessage("No purchased products found for this buyer");
            setProducts([]);
          } else {
            setProducts(response.payload.data);
            setNoProductsMessage(null);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [dispatch, id]);

  const back = () => {
    router.push("/admin-dashboard/nft-ecommerce/ecommerce-buyers");
  };

  const handleProductClick = (index: number) => {
    setSelectedProductIndex(index);
  };

  return (
    <div
      className={`w-full min-h-screen rounded-xl shadow-lg`}
      style={{background:colors.cardBg,color:colors.text}}
    >
      {/* Header */}
      <div
        className={`h-16 rounded-t-xl flex items-center p-4 shadow-md border-b border-gray-300`}
        style={{background:colors.sidebarBg}}
      >
        <div
          onClick={back}
          className="flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform"
        >
          <div
            className={`w-12 h-12 ${
              isDarkEnabled ? "bg-[#051139]" : "bg-[#025F92]"
            } flex items-center justify-center rounded-full shadow-md`}
          >
            <LeftIcon color="#fff" width="24" height="24" />
          </div>
          <p
            className={`text-xl font-semibold `}
            style={{color:colors.text}}
          >
            Buyer Purchased Products
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full h-[calc(100vh-4rem)] overflow-y-auto p-6 flex flex-col md:flex-row gap-6">
        {/* Left: Product List */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : noProductsMessage ? (
            <p className="text-center text-lg font-medium text-gray-500">
              {noProductsMessage}
            </p>
          ) : products?.length > 0 ? (
            products.map((product, productIndex) => (
              <div
                key={product._id}
                className={`cursor-pointer p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
                  isDarkEnabled
                    ? "bg-[#051139] border border-gray-700"
                    : "bg-[#025F92] border border-gray-300"
                }`}
                onClick={() => handleProductClick(productIndex)}
              >
                <p
                  className={`text-lg font-semibold `}
                  style={{color:colors.text}}
                >
                  {product.orderId}
                </p>
                <p
                  className={`text-md font-normal `}
                  style={{color:colors.text}}
                >
                  Orde Date: {new Date(product.orderDate).toLocaleDateString()}
                </p>
                <p
                  className={`text-md font-normal`}
                  style={{color:colors.text}}
                >
                  Total Quantity: {product.totalQuantity}
                </p>
                <p
                  className={`text-md font-normal`}
                  style={{color:colors.text}}
                >
                  Total Amount: ${product.totalAmount.toFixed(2)}
                </p>
                {product.items.length > 0 && (
                  <div className="w-full flex justify-center items-center h-64 mt-4 rounded-md overflow-hidden shadow-sm">
                    <img
                      src={
                        product.items[0].colorImageUrl ||
                        "/image/product-placeholder.png"
                      }
                      alt={`Product color ${product.items[0].color}`}
                      className=" object-contain"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-lg font-medium text-gray-500">
              No Products Available
            </p>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="w-full md:w-2/3">
          {products?.length > 0 ? (
            selectedProductIndex !== null ? (
              <div
                className={`p-6 rounded-lg shadow-lg ${
                  isDarkEnabled
                    ? "bg-[#040836] border border-gray-700"
                    : "bg-[#025F92] border border-gray-300"
                }`}
              >
                <h2
                  className={`text-2xl font-bold mb-6 `}
                >
                  Order Details
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <p
                      className={`font-semibold `}
                      style={{color:colors.text}}
                    >
                      Order ID
                    </p>
                    <p
                      className={``}
                      style={{color:colors.text}}
                    >
                      {products[selectedProductIndex].orderId}
                    </p>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <p
                      className={`font-semibold `}
                      style={{color:colors.text}}
                    >
                      Order Date
                    </p>
                    <p
                      className={``}
                      style={{color:colors.text}}
                    >
                      {new Date(
                        products[selectedProductIndex].orderDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <p
                      className={`font-semibold `}
                      style={{color:colors.text}}
                    >
                      Total Quantity
                    </p>
                    <p
                      className={``}
                      style={{color:colors.text}}
                    >
                      {products[selectedProductIndex].totalQuantity}
                    </p>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <p
                      className={`font-semibold`}
                      style={{color:colors.text}}
                    >
                      Total Amount
                    </p>
                    <p
                      className={`text-green-400 ${
                        isDarkEnabled ? "text-gray-300" : "text-slate-200"
                      }`}
                    >
                      ${products[selectedProductIndex].totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <p
                      className={`font-semibold ${
                        isDarkEnabled ? "text-gray-100" : "text-slate-200"
                      }`}
                    >
                      Order Status
                    </p>
                    <p
                      className={`${
                        isDarkEnabled ? "text-gray-300" : "text-slate-200"
                      }`}
                    >
                      {products[selectedProductIndex].orderStatus}
                    </p>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <p
                      className={`font-semibold ${
                        isDarkEnabled ? "text-gray-100" : "text-slate-200"
                      }`}
                    >
                      Payment Status
                    </p>
                    <p
                      className={`${
                        isDarkEnabled ? "text-gray-300" : "text-slate-200"
                      }`}
                    >
                      {products[selectedProductIndex].paymentStatus}
                    </p>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <p
                      className={`font-semibold ${
                        isDarkEnabled ? "text-gray-100" : "text-slate-200"
                      }`}
                    >
                      Payment Method
                    </p>
                    <p
                      className={`${
                        isDarkEnabled ? "text-gray-300" : "text-slate-200"
                      }`}
                    >
                      {products[selectedProductIndex].paymentMethod}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                Select a product to see details
              </div>
            )
          ) : (
            <div className="text-center text-gray-500">
              No products available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerPurchasedProducts;

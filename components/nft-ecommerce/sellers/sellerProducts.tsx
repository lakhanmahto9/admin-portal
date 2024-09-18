import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "@/redux/store/store";
import { fetchSellerProductsThunk } from "@/redux/slice/ecommerce/productslice";
import { LeftIcon } from "@/public/icons/icons";
import { useThemeColors } from "@/components/utils/useThemeColor";

const SellerProducts: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = router.query;

  const sellerProducts = useSelector(
    (state: RootState) => state.products.sellerProducts
  );
  const isDarkEnabled = useSelector((state: RootState) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);

  const [selectedProductIndex, setSelectedProductIndex] = useState<
    number | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof id === "string") {
      const fetchProduct = async () => {
        try {
          await dispatch(fetchSellerProductsThunk(id));
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [dispatch, id]);

  const back = () => {
    router.push("/admin-dashboard/nft-ecommerce/ecommerce-sellers");
  };

  const handleProductClick = (index: number) => {
    setSelectedProductIndex(index);
  };

  return (
    <div
      className={`w-full min-h-screen rounded-xl shadow-lg`}
      style={{ background: colors.cardBg }}
    >
      {/* Header */}
      <div
        className={`h-16 rounded-t-xl flex items-center p-4 shadow-md border-b border-gray-300`}
        style={{ background: colors.sidebarBg }}
      >
        <div
          onClick={back}
          className="flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform"
        >
          <div
            className={`w-12 h-12 ${
              isDarkEnabled ? "bg-[#051139]" : "bg-[#025f92]"
            } flex items-center justify-center rounded-full shadow-md`}
          >
            <LeftIcon color="#fff" width="24" height="24" />
          </div>
          <p
            className={`text-xl font-semibold ${
              isDarkEnabled ? "text-white" : "text-[#192555]"
            }`}
          >
            Seller Products
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full h-[calc(100vh-4rem)] overflow-y-auto p-6 flex flex-col md:flex-row gap-6">
        {/* Left: Product List */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : sellerProducts.length > 0 ? (
            sellerProducts.map((product, productIndex) => (
              <div
                key={productIndex}
                className={`cursor-pointer p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 ${
                  isDarkEnabled ? "bg-[#051139]" : "bg-[#025f92] border"
                }`}
                onClick={() => handleProductClick(productIndex)}
              >
                <p
                  className={`text-lg font-semibold ${
                    isDarkEnabled ? "text-white" : "text-white"
                  }`}
                >
                  {product.category}
                </p>
                <p
                  className={`text-sm font-light ${
                    isDarkEnabled ? "text-gray-300" : "text-white"
                  }`}
                >
                  {product.fabric}
                </p>
                {product.items.length > 0 && (
                  <div className="flex w-full justify-center items-center h-64 mt-4 rounded-md overflow-hidden shadow-sm">
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
          {selectedProductIndex !== null && sellerProducts.length > 0 ? (
            <div
              className={`p-6 rounded-lg shadow-lg ${
                isDarkEnabled ? "bg-[#051139]" : "bg-[#025f92] border"
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-6 ${
                  isDarkEnabled ? "text-white" : "text-white"
                }`}
              >
                Product Information
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <p
                    className={`font-semibold ${
                      isDarkEnabled ? "text-white" : "text-white"
                    }`}
                  >
                    Name
                  </p>
                  <p className="text-[#f2f2f2]">
                    {sellerProducts[selectedProductIndex].category}
                  </p>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <p
                    className={`font-semibold ${
                      isDarkEnabled ? "text-white" : "text-white"
                    }`}
                  >
                    Category
                  </p>
                  <p className="text-[#f2f2f2]">
                    {sellerProducts[selectedProductIndex].fabric}
                  </p>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <p
                    className={`font-semibold ${
                      isDarkEnabled ? "text-white" : "text-white"
                    }`}
                  >
                    Price
                  </p>
                  <p className="text-[#6af109]">
                    ${sellerProducts[selectedProductIndex].price}
                  </p>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <p
                    className={`font-semibold ${
                      isDarkEnabled ? "text-white" : "text-white"
                    }`}
                  >
                    Total Stock
                  </p>
                  <p className="text-[#f2f2f2]">
                    {sellerProducts[selectedProductIndex].totalStock}
                  </p>
                </div>

                <div className="border-t pt-4">
                  {sellerProducts[selectedProductIndex].items.length > 0 ? (
                    sellerProducts[selectedProductIndex].items.map(
                      (item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="w-full p-4 rounded-md shadow-sm  mb-4 flex gap-6"
                        >
                          {/* Product Image */}
                          <div className="w-56 h-80 rounded-md overflow-hidden shadow-md">
                            <img
                              src={
                                item.colorImageUrl ||
                                "/image/product-placeholder.png"
                              }
                              alt={`Product color ${item.color}`}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Product Details: Color and Size */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <p
                                className={`text-lg font-semibold ${
                                  isDarkEnabled ? "text-white" : "text-white"
                                }`}
                              >
                                Color
                              </p>
                              <p className="text-[#f2f2f2]">{item.color}</p>
                            </div>

                            <div className="mt-4">
                              <h3
                                className={`font-semibold ${
                                  isDarkEnabled ? "text-white" : "text-white"
                                }`}
                              >
                                Available Sizes
                              </h3>
                              <div className="grid grid-cols-2 gap-4 mt-2">
                                {item.sizes.map((sizeAndStock, idx) => (
                                  <div
                                    key={idx}
                                    className="flex justify-between items-center"
                                  >
                                    <p
                                      className={`text-lg ${
                                        isDarkEnabled
                                          ? "text-white"
                                          : "text-white"
                                      }`}
                                    >
                                      Size:{" "}
                                      <span className="font-normal">
                                        {sizeAndStock.size}
                                      </span>
                                    </p>
                                    <p
                                      className={`text-lg ${
                                        sizeAndStock.stock > 0
                                          ? "text-green-500"
                                          : "text-red-500"
                                      } font-semibold`}
                                    >
                                      {sizeAndStock.stock > 0
                                        ? `${sizeAndStock.stock} in stock`
                                        : "Out of stock"}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-center text-lg font-medium text-gray-500">
                      No Items Available
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-lg font-medium text-gray-500">
              Select a product to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;

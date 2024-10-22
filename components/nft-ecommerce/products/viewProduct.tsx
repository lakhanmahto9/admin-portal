import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getProductByIdThunk } from "@/redux/slice/ecommerce/productslice";
import { LeftIcon } from "@/public/icons/icons";
import { useThemeColors } from "@/components/utils/useThemeColor";

const ViewProduct: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = router.query;
  const product = useSelector(
    (state: RootState) => state.products.singleProduct
  );
  console.log(product, "product");
  const isDarkEnabled = useSelector((state: RootState) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);

  useEffect(() => {
    if (typeof id === "string") {
      const fetchProduct = async () => {
        try {
          const res = await dispatch(getProductByIdThunk(id));
          console.log(res, "res product");
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchProduct();
    }
  }, [dispatch, id]);

  const back = () => {
    router.push("/admin-dashboard/nft-ecommerce/products");
  };

  return (
    <div
      className={`w-full h-[83vh] rounded-xl shadow-lg`}
      style={{ background: colors.cardBg }}
    >
      {/* Header */}
      <div
        className={`h-[12%] rounded-t-xl flex justify-between items-center p-4 shadow-md`}
        style={{ background: colors.sidebarBg }}
      >
        <div onClick={back} className="flex items-center gap-4 cursor-pointer">
          <div
            className={`w-10 h-10 ${
              isDarkEnabled ? "bg-[#051139]" : "bg-[#025f92]"
            } flex items-center justify-center rounded-full shadow-md`}
          >
            <LeftIcon color="#fff" width="20" height="20" />
          </div>
          <p
            className={`text-lg font-semibold ${
              isDarkEnabled ? "text-white" : "text-[#192555]"
            }`}
          >
            Product Details
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full h-[88%] overflow-y-scroll flex flex-col md:flex-row p-6 gap-6">
        {/* Left: Product Images */}
        <div className="w-full md:w-[40%] flex flex-col gap-6">
          {product?.items && product.items.length > 0 ? (
            product.items.map((item, index) => (
              <div
                key={index}
                className={`w-full h-auto rounded-lg p-6 ${
                  isDarkEnabled ? "bg-[#051139]" : "bg-white border"
                } shadow-lg flex flex-col items-center text-center`}
              >
                <div className="w-40 h-40 border-2 border-gray-300 rounded-full overflow-hidden shadow-sm">
                  <img
                    src={item.colorImageUrl || "/image/product-placeholder.png"}
                    alt={`Product color ${item.color}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className={`mt-4 text-xl font-bold `}
                  style={{ color: colors.text }}
                >
                  {item.color}
                </p>

                <p
                  className={`text-lg ${
                    isDarkEnabled ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {product?.category}
                </p>
                <div className="w-full mt-4">
                  {item.sizes.map((sizeAndStock, idx) => (
                    <div
                      key={idx}
                      className={`flex justify-between items-center w-full p-2 border-b ${
                        isDarkEnabled ? "border-gray-600" : "border-gray-200"
                      }`}
                    >
                      <p
                        className={`text-lg font-semibold ${
                          isDarkEnabled ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Size:{" "}
                        <span className="font-normal">{sizeAndStock.size}</span>
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
            ))
          ) : (
            <p className="text-xl font-bold">No Images Available</p>
          )}
        </div>

        {/* Right: Product Information */}
        <div
          className={`w-full md:w-[60%] ${
            isDarkEnabled ? "bg-[#051139]" : "bg-white"
          } rounded-lg shadow-lg p-8 space-y-6`}
        >
          <h2
            className={`text-xl font-bold ${
              isDarkEnabled ? "text-white" : "text-gray-800"
            }`}
          >
            Product Information
          </h2>
          <div className="w-full border border-[#025f92] rounded-md p-4 bg-[#025f92]">
            <p className="text-white">
              Price: <span className="text-[#6af109]">${product?.price}</span>
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p className={`font-semibold `} style={{ color: colors.text }}>
                Name
              </p>
              <p className="" style={{color:colors.text}}>{product?.name}</p>
            </div>
            <div className="flex justify-between">
              <p className={`font-semibold `} style={{ color: colors.text }}>
                Description
              </p>
              <p className="" style={{color:colors.text}}>{product?.description}</p>
            </div>
            <div className="flex justify-between">
              <p className={`font-semibold `} style={{ color: colors.text }}>
                Fabric
              </p>
              <p className="" style={{color:colors.text}}>{product?.fabric}</p>
            </div>
            <div className="flex justify-between">
              <p className={`font-semibold `} style={{ color: colors.text }}>
                Pattern
              </p>
              <p className="" style={{color:colors.text}}>{product?.pattern}</p>
            </div>
            <div className="flex justify-between">
              <p className={`font-semibold `} style={{ color: colors.text }}>
                Total Stock
              </p>
              <p className="" style={{color:colors.text}}>{product?.totalStock}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;

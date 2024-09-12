import React, { useEffect, useState } from "react";
import { getProductsThunk } from "@/redux/slice/ecommerce/productslice";
import { AppDispatch } from "@/redux/store/store"; // Adjust according to your store setup
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store"; // Adjust according to your store setup
import { useRouter } from "next/router";

const Products = () => {
  const router = useRouter();
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const [search, setSearch] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const [fetchedProducts, setFetchedProducts] = useState([]);

  console.log(fetchedProducts, "fetched products");

  useEffect(() => {
    // Fetch all products on component mount
    dispatch(getProductsThunk())
      .unwrap()
      .then((data) => {
        console.log("Fetched products:", data?.data);
        setFetchedProducts(data?.data || []);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, [dispatch]);

  const filteredProducts = fetchedProducts.filter((product) =>
    // console.log(product, "filter product")
    product?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleProductClick = (product: any) => {
    router.push(`/admin-dashboard/nft-ecommerce/view-product/${product?._id}`);
  };

  return (
    <>
      <div
        className={`w-full h-[83vh] ${
          isDarkEnabled ? "bg-[#101c44]" : "bg-[#fff]"
        } rounded-xl`}
      >
        <div
          className={`h-[12%] ${
            isDarkEnabled ? "bg-[#101c44]" : "bg-[#dae2ff]"
          } rounded-t-xl flex justify-between`}
        >
          <div className="flex items-center gap-4 px-2">
            <div
              onClick={() => alert("Back")}
              className={`w-10 h-10 ${
                isDarkEnabled ? "bg-[#040836]" : "bg-[#025f92]"
              } flex items-center justify-center rounded-full cursor-pointer`}
            >
              <p style={{ color: "#fff" }}>{"<"}</p>
            </div>
            <p
              className={`text-lg font-semibold ${
                isDarkEnabled ? "text-[#fff]" : "text-[#192555]"
              }`}
            >
              All Products
            </p>
          </div>
          <div className="flex px-2 gap-2 items-center">
            <div className="relative">
              <input
                type="text"
                onChange={handleSearch}
                placeholder="Search..."
                className="w-40 h-10 rounded-full pl-10 focus:outline-none"
              />
              <div className="absolute top-3 left-2">
                <p style={{ color: "#2e10dc" }}>🔍</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[88%] overflow-y-scroll flex flex-wrap justify-between p-2 gap-2">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item: any, index: number) => (
              <div className="relative w-full md:w-[32%] h-72" key={index}>
                <div
                  className={`h-2/3 rounded-t-2xl ${
                    isDarkEnabled ? "bg-[#040836]" : "bg-[#025F92]"
                  } flex justify-center items-center`}
                >
                  <div className="relative w-28 h-28">
                    <img
                      src={item.items[0]?.colorImageUrl} // Assuming you're displaying the first item's colorImageUrl
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute  mt-1 ml-6">
                      <p
                        style={{
                          color: item.totalStock > 0 ? "#00ff00" : "#ff0000",
                        }}
                      >
                        {item.totalStock > 0 ? "Available" : "Out of Stock"}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`h-1/3 ${
                    isDarkEnabled ? "bg-[#010844]" : "bg-[#084363]"
                  } rounded-b-2xl py-5`}
                >
                  <div className="flex gap-2 h-14 px-2">
                    <div
                      onClick={() => handleProductClick(item)}
                      className={`w-full ${
                        isDarkEnabled ? "bg-[#040836]" : "bg-[#025f92]"
                      } cursor-pointer rounded-lg flex justify-center items-center`}
                    >
                      <p className="text-[#fff]">View Product</p>
                    </div>
                  </div>
                </div>
                <div
                  className={`absolute top-1 left-1 px-2 py-1 ${
                    item.isDiscounted ? "bg-red-500" : "bg-transparent"
                  } text-white rounded-full`}
                >
                  {item.isDiscounted ? "Discount" : ""}
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-96 h-96 p-4 flex flex-col justify-center items-center">
                <img src="/image/not-found.png" alt="Not Found" />
                <p className="text-lg font-semibold">No Products found</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;

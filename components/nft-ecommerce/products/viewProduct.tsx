import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AppDispatch, RootState } from '@/redux/store/store'; // Import your AppDispatch and RootState types
import { getProductByIdThunk } from "@/redux/slice/ecommerce/productslice";
import { LeftIcon } from "@/public/icons/icons";

const ViewProduct: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>(); // Use the typed dispatch
    const { id } = router.query; // Accessing the query parameters
    const product = useSelector((state: RootState) => state.products.singleProduct); 
    // const product1 = product?.data
    console.log(product, "product");

    // Update with the correct path
    const isDarkEnabled = useSelector((state: RootState) => state.darkmode.dark);

    useEffect(() => {
        if (typeof id === 'string') { // Ensure id is a string
            const fetchProduct = async () => {
                try {
                    await dispatch(getProductByIdThunk(id));
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            };

            fetchProduct();
        }
    }, [dispatch, id]); // Dependency array includes dispatch and id

    const back = () => {
        router.push("/admin-dashboard/nft-ecommerce/products");
    };

    return (
        <div className={`w-full h-[83vh] ${isDarkEnabled ? "bg-[#101c44]" : "bg-[#fff]"} rounded-xl`}>
            <div className={`h-[12%] ${isDarkEnabled ? "bg-[#101c44]" : "bg-[#dae2ff]"} rounded-t-xl flex justify-between items-center p-2`}>
                <div onClick={back} className="flex items-center gap-4 cursor-pointer">
                    <div className={`w-10 h-10 ${isDarkEnabled ? "bg-[#040836]" : "bg-[#025f92]"} flex items-center justify-center rounded-full`}>
                        <LeftIcon color="#fff" width="20" height="20" />
                    </div>
                    <p className={`text-lg font-semibold ${isDarkEnabled ? "text-[#fff]" : "text-[#192555]"}`}>
                        Product Details
                    </p>
                </div>
            </div>
            <div className="w-full h-[88%] overflow-y-scroll flex flex-col md:flex-row p-2 md:p-7 gap-4">
                <div className="w-full md:w-[40%] flex flex-col gap-4">
                    {product?.items && product.items.length > 0 ? (
                        product.items.map((item, index) => (
                            <div key={index} className={`w-full h-auto md:h-1/2 border rounded-lg p-2 ${isDarkEnabled ? "bg-[#040836]" : "bg-[#ebf6fd]"} flex flex-col gap-2 justify-center items-center`}>
                                <div className="w-40 h-40 border rounded-full">
                                    <img
                                        src={item.colorImageUrl || "/image/product-placeholder.png"}
                                        alt={`Product color ${item.color}`}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                                <p className={`text-xl font-bold ${isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"}`}>
                                    {product?.name}
                                </p>
                                <p className={`text-lg ${isDarkEnabled ? "text-[#fff]" : "text-[#2b4348]"}`}>
                                    {product?.category}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-xl font-bold">No Images Available</p>
                    )}
                </div>
                <div className={`w-full md:w-[60%] ${isDarkEnabled ? "bg-[#040836] border" : "bg-[#ebf6fd]"} rounded-lg px-8 py-4`}>
                    <p className={`text-lg font-bold ${isDarkEnabled ? "text-[#fff]" : ""}`}>
                        Information
                    </p>
                    <div className="w-full h-auto md:h-16 border bg-[#025f92] rounded-md p-2 mb-4">
                        <p className="text-white">
                            Price: <span className="text-[#6af109]">${product?.price}</span>
                        </p>
                    </div>
                    <div className="flex gap-4 justify-between md:justify-start">
                        <p className={`text-lg font-semibold ${isDarkEnabled ? "text-[#fff]" : ""}`}>
                            Name
                        </p>
                        <p className="text-lg text-[#6a6a6b]">{product?.name}</p>
                    </div>
                    <div className="flex gap-4 justify-between md:justify-start">
                        <p className={`text-lg font-semibold ${isDarkEnabled ? "text-[#fff]" : ""}`}>
                            Description
                        </p>
                        <p className="text-lg text-[#6a6a6b]">{product?.description}</p>
                    </div>
                    <div className="flex gap-4 justify-between md:justify-start">
                        <p className={`text-lg font-semibold ${isDarkEnabled ? "text-[#fff]" : ""}`}>
                            Fabric
                        </p>
                        <p className="text-lg text-[#6a6a6b]">{product?.fabric}</p>
                    </div>
                    <div className="flex gap-4 justify-between md:justify-start">
                        <p className={`text-lg font-semibold ${isDarkEnabled ? "text-[#fff]" : ""}`}>
                            Pattern
                        </p>
                        <p className="text-lg text-[#6a6a6b]">{product?.pattern}</p>
                    </div>
                    <div className="flex gap-4 justify-between md:justify-start">
                        <p className={`text-lg font-semibold ${isDarkEnabled ? "text-[#fff]" : ""}`}>
                            Total Stock
                        </p>
                        <p className="text-lg text-[#6a6a6b]">{product?.totalStock}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;

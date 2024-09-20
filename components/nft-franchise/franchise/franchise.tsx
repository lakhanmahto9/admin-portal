import {
    LeftIcon,
    SearchIcon,
    ThreedotIcon,
    VerifyIcon,
  } from "@/public/icons/icons";
  import React, { ChangeEvent, useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useRouter } from "next/router";
  import { setDialog } from "@/redux/slice/blockOpenModalSlice";
  import { DialogModal } from "../common/modal";
  import { useThemeColors } from "@/components/utils/useThemeColor";
  import { fetchAllFranchise } from "@/redux/slice/fetchAllFranchiseSlice";
  import noDataImage from "@/public/noData.png";
  import Image from "next/image";
  
  interface Address {
    aboutMe: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  }
  
  interface Buyer {
    _id: string;
    name: string;
    email: string;
    address: Address | null;
    isBlocked: boolean;
  }
  
  export const FranchiseDetails: React.FC = () => {
    const isDarkModeEnable = useSelector((state: any) => state.darkmode.dark);
    const colors = useThemeColors(isDarkModeEnable);
    const [buyers, setBuyers] = useState<Buyer[]>([]);
    const [filteredBuyers, setFilteredBuyers] = useState<Buyer[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state
    const router = useRouter();
    const dispatch = useDispatch();
  
    const callApiTofetchAllFranchise = async () => {
      setLoading(true); // Start loading
      const result = await dispatch<any>(fetchAllFranchise());
      if (result.payload?.success) {
        console.log(result.payload?.data?.franchise)
        setBuyers(result?.payload?.data?.franchise);
        setFilteredBuyers(result?.payload?.data?.franchise);
      }
      setLoading(false); // Stop loading
    };
  
    useEffect(() => {
      callApiTofetchAllFranchise();
    }, []);
  
    const sellerPhotography = (item: any) => {
      localStorage.setItem("image", item.profile_pic);
      router.push(`/admin-dashboard/seller-art/buyer-purchase/${item._id}`);
    };
  
    const profile = (item: any) => {
      router.push(`/admin-dashboard/nft-franchise/franchise-profile/${item?._id}`);
    };
  
    const backToDashboard = () => {
      router.push("/admin-dashboard/nft-franchise/franchise-dashboard");
    };
  
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value.toLowerCase();
      if (query) {
        const filtered = buyers.filter((item: any) =>
          item.name.toLowerCase().includes(query)
        );
        setFilteredBuyers(filtered);
      } else {
        setFilteredBuyers(buyers);
      }
    };
  
    return (
      <>
        <div
          className={`w-full h-[83vh] rounded-xl`}
          style={{ background: colors.cardBg }}
        >
          <div
            className={`h-[12%] rounded-t-xl flex justify-between`}
            style={{ background: colors.sidebarBg }}
          >
            <div className="flex items-center gap-4 px-2">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ${
                  isDarkModeEnable ? "bg-[#051139]" : "bg-[#025f92]"
                }`}
                onClick={backToDashboard}
              >
                <LeftIcon color="#fff" width="20" height="20" />
              </div>
              <p
                className={`text-lg font-semibold`}
                style={{ color: colors.text }}
              >
                All Franchise
              </p>
            </div>
            <div className="flex px-2 gap-2 items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={handleSearch}
                  className="w-40 h-10 rounded-full pl-10 focus:outline-none"
                  style={{ background: colors.background, color: colors.text }}
                />
                <div className="absolute top-3 left-2">
                  <SearchIcon color="#2e10dc" width="20" height="20" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[88%] overflow-y-scroll flex flex-wrap justify-between p-2 gap-2">
            {loading ? ( // Display loading indicator when loading
              <div className="w-full flex justify-center items-center h-full">
                <p className="text-xl" style={{ color: colors.text }}>
                  Loading...
                </p>
              </div>
            ) : filteredBuyers.length === 0 ? ( // Display message and image if no data is found
              <div className="w-full flex flex-col justify-center items-center h-full">
                <Image
                  src={noDataImage}
                  alt="No Data Found"
                  className="object-cover"
                  width={300} // Desired width
                  height={300} // Desired height
                  layout="intrinsic" // Ensures the image doesn't overflow
                />
                <p className="text-xl" style={{ color: colors.text }}>
                  No buyers found.
                </p>
              </div>
            ) : (
              filteredBuyers.map((item: any, index: number) => (
                <div
                  className="relative w-full sm:w-[48%] md:w-[32%] h-72"
                  key={index}
                >
                  <div
                    className={`h-2/3 rounded-t-2xl flex flex-col justify-center items-center ${
                      isDarkModeEnable ? "bg-[#051139]" : "bg-[#025f92]"
                    }`}
                  >
                    <p
                      className={`font-semibold ${
                        isDarkModeEnable ? "text-[#D3D3D3]" : "text-[#D3D3D3]"
                      }`}
                    >
                      {item.name}
                    </p>
                    <div className="relative w-28 h-28 rounded-full border">
                      <img
                        src={item.profile_pic || "/image/profile.png"}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                      <div className="absolute bottom-2 right-2">
                        <VerifyIcon
                          color={item.isApproved ? "#00ff00" : "#ff0000"}
                          height="20"
                          width="20"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`h-1/3 rounded-b-2xl py-5 ${
                      isDarkModeEnable
                        ? "shadow-sm shadow-gray-700"
                        : "bg-[#084363]"
                    }`}
                  >
                    <div className="flex gap-2 h-14 px-2">
                      <div
                        onClick={() => sellerPhotography(item)}
                        className={`w-1/2 cursor-pointer rounded-lg flex justify-center items-center ${
                          isDarkModeEnable ? "bg-[#051139]" : "bg-[#025f92]"
                        }`}
                      >
                        <p className="text-[#fff]">Art/Music</p>
                      </div>
                      <div
                        onClick={() => profile(item)}
                        className={`w-1/2 cursor-pointer rounded-lg flex justify-center items-center ${
                          isDarkModeEnable ? "bg-[#051139]" : "bg-[#025f92]"
                        }`}
                      >
                        <p className="text-[#fff]">Profile</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex justify-center items-center gap-1 absolute w-[30%] h-8 bottom-[29%] left-[35%] px-2 rounded-full ${
                      isDarkModeEnable
                        ? "bg-[#051139] border border-gray-600"
                        : "bg-[#2c8993]"
                    }`}
                  >
                    <p className="text-[#fff]">
                      {item.isBlocked ? "Blocked" : "Unblocked"}
                    </p>
                  </div>
                  <div
                    onClick={() =>
                      dispatch(
                        setDialog({
                          open: true,
                          type: "block",
                          id: item._id,
                          block: item.isBlocked,
                        })
                      )
                    }
                    className={`flex justify-center items-center cursor-pointer gap-1 absolute w-[10%] h-8 bottom-[29%] right-[23%] px-2 rounded-full ${
                      isDarkModeEnable
                        ? "bg-[#051139] border border-gray-600"
                        : "bg-[#2c8993]"
                    }`}
                  >
                    <ThreedotIcon width="20" height="20" color="#fff" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <DialogModal />
      </>
    );
  };
  
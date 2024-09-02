import {
  LeftIcon,
  SearchIcon,
  ThreedotIcon,
  VerifyIcon,
} from "@/public/icons/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setDialog } from "@/redux/slice/blockOpenModalSlice";
import { DialogModal } from "../common/modal";
import { useGetSellersQuery } from "../../../redux/api/adminApiSlice";
import { useThemeColors } from "@/components/utils/useThemeColor";

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

export const ArtMusicSeller: React.FC = () => {
  const isDarkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(isDarkModeEnable);
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const { data } = useGetSellersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data) {
      setBuyers(data.data.sellers);
    }
  }, [data]);

  const sellerPhotography = (item: any) => {
    localStorage.setItem("image", item.profile_pic);
    router.push(`/admin-dashboard/seller-art/seller-art-music/${item._id}`);
  };

  const profile = (item: any) => {
    router.push(`/admin-dashboard/seller-art/seller-profile/${item?._id}`);
  };

  const backToDashboard = () => {
    router.push("/admin-dashboard/seller-art/art-dashboard");
  };
  return (
    <>
      <div className={`w-full h-[83vh] rounded-xl`} style={{background:colors.cardBg}}>
        <div
          className={`h-[12%] rounded-t-xl flex justify-between`}
          style={{background:colors.sidebarBg}}
        >
          <div className="flex items-center gap-4 px-2">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full  cursor-pointer ${
                isDarkModeEnable ? "bg-[#051139]" : "bg-[#025f92]"
              }`}
              onClick={backToDashboard}
            >
              <LeftIcon color="#fff" width="20" height="20" />
            </div>
            <p className={`text-lg font-semibold `} style={{color:colors.text}}>All Seller</p>
          </div>
          <div className="flex px-2 gap-2 items-center">
            <div className="relative">
              <input
                type="text"
                //   onChange={handleSearch}
                placeholder="Search..."
                className="w-40 h-10 rounded-full pl-10 focus:outline-none"
                style={{background:colors.background, color:colors.text}}
              />
              <div className="absolute top-3 left-2">
                <SearchIcon color="#2e10dc" width="20" height="20" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[88%] overflow-y-scroll flex flex-wrap justify-between p-2 gap-2">
          {buyers.map((item: any, index: number) => (
            <div className="relative w-[32%] h-72" key={index}>
              <div className={`h-2/3 rounded-t-2xl flex flex-col justify-center items-center ${
                  isDarkModeEnable ? "bg-[#051139]" : "bg-[#025f92]"
                }`}>
                <p
                  className={`font-semibold ${
                    isDarkModeEnable ? "text-[#D3D3D3]" : "text-[#D3D3D3]"
                  } `}
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
              <div className={`h-1/3  rounded-b-2xl py-5  ${
                  isDarkModeEnable
                    ? "shadow-sm shadow-gray-700"
                    : "bg-[#084363]"
                }`}>
                <div className="flex gap-2 h-14 px-2">
                  <div
                    onClick={() => sellerPhotography(item)}
                    className={`w-1/2 cursor-pointer rounded-lg flex justify-center items-center ${
                      isDarkModeEnable ? "bg-[#051139]" : "bg-[#025f92] "
                    }`}
                  >
                    <p className="text-[#fff]">Art/Music</p>
                  </div>
                  <div
                    onClick={() => profile(item)}
                    className={`w-1/2 cursor-pointer rounded-lg flex justify-center items-center ${
                      isDarkModeEnable ? "bg-[#051139]" : "bg-[#025f92] "
                    }`}
                  >
                    <p className="text-[#fff]">Profile</p>
                  </div>
                </div>
              </div>
              <div className= {`flex justify-center items-center gap-1 absolute w-[30%] h-8 bottom-[29%] left-[35%] px-2  rounded-full ${
                  isDarkModeEnable
                    ? "bg-[#051139] border border-gray-600"
                    : "bg-[#2c8993]"
                }`}>
                <p className="text-[#fff]">
                  {item.isBlocked ? "Blocked" : "Unblocked"}
                </p>{" "}
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
          ))}
        </div>
      </div>
      <DialogModal />
    </>
  );
};

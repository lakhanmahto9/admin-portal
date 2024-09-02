import {
  AddphotoIcon,
  AngleIcon,
  BagCheck,
  LogoutIcon,
  ProfileIcon,
  SqureIcon,
  Users,
  MyPlaylist,
  MorePeople,
} from "../../utils/icons";
import React, { useEffect, useState } from "react";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useThemeColors } from "@/components/utils/useThemeColor";
import { artMusicAndVideoRevenue } from "@/redux/slice/fetchArtMusicAndVideoRevenueSlice";
import { openCredential } from "@/redux/slice/creadentialSlice";

interface artMusicAndVideoData {
  totalRevenueforArtMusic: number;
  totalRevenue: number;
}

const { publicRuntimeConfig } = getConfig();
const VideoSidebar: React.FC = () => {
  const [switchTab, setSwitchTab] = useState({
    photography: false,
    art: false,
    ecommerce: false,
  });
  const [artMusicAndVideoRevenueData, SetArtMusicAndVideoRevenueData] =
    useState<artMusicAndVideoData>({
      totalRevenueforArtMusic: 0,
      totalRevenue: 0,
    });
  const dispatch = useDispatch();
  const router = useRouter();
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);
  const [total, setTotal] = useState(0);
  const sidenavcolor = useSelector((state: any) => state.sidebarbg.color);

  // const mysale = useSelector((state: any) => state.sales.data?.mysale || []);
  const [info, setInfo] = useState({
    totalRevenue: 0,
  });

  const sideBarLink = [
    {
      icon: <SqureIcon color="blue" height="15" width="15" />,
      link: "Dashboard",
      href: publicRuntimeConfig?.dashboard,
    },
    {
      icon: <BagCheck color="orange" height="18" width="18" />,
      link: "Users",
      href: publicRuntimeConfig?.users,
    },

    {
      icon: <Users color="red" height="18" width="18" />,
      link: "Creater",
      href: publicRuntimeConfig?.creater,
    },
    {
      icon: <Users color="#FF1493" height="18" width="18" />,
      link: "Subscriber",
      href: publicRuntimeConfig?.subscribers,
    },
    {
      icon: <MyPlaylist color="green" height="18" width="18" />,
      link: "Playlist",
      href: publicRuntimeConfig?.playlist,
    },
    {
      icon: (
        <MorePeople
          width="24"
          height="24"
          color={darkModeEnable ? "#9eaaef" : "black"}
        />
      ),
      link: "Top Sellers By  Sale",
      href: publicRuntimeConfig?.SellersByTotalSale,
    },
    {
      icon: (
        <MorePeople
          width="24"
          height="24"
          color={darkModeEnable ? "#9eaaef" : "black"}
        />
      ),
      link: "Top Sellers By Revenue",
      href: publicRuntimeConfig?.topSellersByRevenue,
    },
    {
      icon: <LogoutIcon color="red" height="18" width="18" />,
      link: "Logout",
      href: publicRuntimeConfig?.login,
    },
  ];

  const handleLinkClick = (href: string, link: string) => {
    if (link === "Logout") {
      localStorage.clear();
    }
    router.push(href);
  };

  useEffect(() => {
    callToFetchArtMusicAndVideoRevenue();
  }, []);
  const changeSwitch = (type: string, value: boolean) => {
    if(type === "art"){
      setSwitchTab((prev) => ({
        ...prev,
        art: !value,
      }));
      dispatch(openCredential("Digital Art and Music"))
    }else if (type === "photography") {
      setSwitchTab((prev) => ({
        ...prev,
        photography: !value,
      }));
      dispatch(openCredential("Digital photography"));
      
    }
    else if(type === "ecommerce"){
      setSwitchTab((prev) => ({
        ...prev,
        ecommerce: !value,
      }));
      dispatch(openCredential("E-Commerce"))
    }
  };

  const callToFetchArtMusicAndVideoRevenue = async () => {
    const result = await dispatch<any>(artMusicAndVideoRevenue());
    console.log(result.payload.totalRevenue);
    SetArtMusicAndVideoRevenueData(result?.payload);
  };

  return (
    <div className="w-full h-full px-5 py-3 lg:py-5">
      <div
        className="h-[95vh]  rounded-2xl p-2 shadow-inner"
        style={{
          backgroundColor: colors.sidebarBg,
          color: colors.text,
          boxShadow: `0px 1px 6px -1px `,
        }}
      >
        <div className="h-[10%] flex gap-5 flex-col justify-center items-center">
          <div className="flex gap-2">
            <BagCheck color="blue" height="24" width="24" />
            <p className="text-lg font-semibold">Seller Dashboard</p>
          </div>
          <div className="w-full">
            <hr
              className="w-full"
              style={{
                backgroundColor: darkModeEnable ? "gray" : "lightgray",
                height: "1px",
                border: "none",
              }}
            />
          </div>
        </div>
        <div className="h-3/5 py-2">
          {sideBarLink.map((item, index) => (
            <div
              className={`${
                item.href === router.pathname
                  ? darkModeEnable
                    ? `bg-[#192555] shadow-inner`
                    : `bg-[${sidenavcolor}] shadow-inner`
                  : ""
              }
               h-12 rounded-xl px-2 flex justify-between items-center cursor-pointer mb-1`}
              key={index}
              onClick={() => handleLinkClick(item.href, item.link)}
            >
              <div className="flex items-baseline gap-3">
                {item.icon}
                <p
                  className={`${
                    item.href === router.pathname ? "font-semibold text-lg" : ""
                  }`}
                  // style={{ color: "#192555" }}
                >
                  {item.link}
                </p>
              </div>
              <AngleIcon
                width="16"
                height="16"
                color={darkModeEnable ? "gray" : "black"}
              />
            </div>
          ))}
        </div>
        <div className="h-[30%] flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <img src="/wallet.svg" alt="wallet" className="w-12 h-12" />
            <p
              className={` font-bold ${
                darkModeEnable ? "text-[#5E72E4]" : "text-[#140e69]"
              }`}
            >
              ₹{artMusicAndVideoRevenueData.totalRevenue}
            </p>
            <p className="text-sm font-semibold" style={{ color: colors.text }}>
              Total Revenue
            </p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="w-full h-10 px-4 bg-[#025f92] text-[#fff] rounded-lg flex justify-between items-center">
              <p>Photography</p>
              <div
                onClick={() => changeSwitch("photography", switchTab.photography)}
                className={`w-16 h-6 cursor-pointer rounded-full px-1 flex ${
                  switchTab.photography
                    ? "justify-end bg-[#084363]"
                    : "justify-start bg-[#c2c2c2]"
                } items-center`}
              >
                <div className="w-5 h-5 bg-[#fff] rounded-full"></div>
              </div>
            </div>
            <div className="w-full h-10 bg-[#084363] text-[#fff] rounded-lg flex justify-between px-4 items-center">
              <p>Art & Music</p>
              <div
                onClick={() => changeSwitch("art", switchTab.art)}
                className={`w-16 h-6 cursor-pointer rounded-full px-1 flex ${
                  switchTab.art
                    ? "justify-end bg-[#025f92]"
                    : "justify-start bg-[#c2c2c2]"
                } items-center`}
              >
                <div className="w-5 h-5 bg-[#fff] rounded-full"></div>
              </div>
            </div>
            <div className="w-full h-10 px-4 bg-[#02364f] text-[#fff] rounded-lg flex justify-between items-center">
              <p>Ecommerce</p>
              <div
                onClick={() => changeSwitch("ecommerce", switchTab.ecommerce)}
                className={`w-16 h-6 cursor-pointer rounded-full px-1 flex ${
                  switchTab.ecommerce
                    ? "justify-end bg-[#025f92]"
                    : "justify-start bg-[#c2c2c2]"
                } items-center`}
              >
                <div className="w-5 h-5 bg-[#fff] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSidebar;

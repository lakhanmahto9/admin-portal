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
  MusicIcon,
  Art,
} from "../../utils/icons";
import React, { useEffect, useState } from "react";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { useSelector,useDispatch } from "react-redux";
import { useThemeColors } from "@/components/utils/useThemeColor";
import { artMusicAndVideoRevenue } from "@/redux/slice/fetchArtMusicAndVideoRevenueSlice";
import { openCredential } from "@/redux/slice/creadentialSlice";

interface artMusicAndVideoData {
  totalRevenueforArtMusic: number;
  totalRevenue: number;
}

const { publicRuntimeConfig } = getConfig();
const ArtSidebar: React.FC = () => {
  const [switchTab, setSwitchTab] = useState({
    tutorial: false,
    photograhy: false,
    ecommerce: false,
  });
  const [artMusicAndVideoRevenueData, SetArtMusicAndVideoRevenueData] =
    useState<artMusicAndVideoData>({
      totalRevenueforArtMusic: 0,
      totalRevenue: 0,
    });
  const router = useRouter();
  const dispatch = useDispatch();
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);
  const [total, setTotal] = useState(0);
  const sidenavcolor = useSelector((state: any) => state.sidebarbg.color);
  
  const [info, setInfo] = useState({
    totalRevenue: 0,
  });

  const sideBarLink = [
    {
      icon: <SqureIcon color="blue" height="15" width="15" />,
      link: "Dashboard",
      href: publicRuntimeConfig?.artDashboard,
    },
    {
      icon: <BagCheck color="orange" height="18" width="18" />,
      link: "Buyers",
      href: publicRuntimeConfig?.buyers,
    },

    {
      icon: <Users color="red" height="18" width="18" />,
      link: "Sellers",
      href: publicRuntimeConfig?.sellers,
    },
    {
      icon: <Art color="#FF1493" height="18" width="18" />,
      link: "Art",
      href: publicRuntimeConfig?.arts,
    },
    {
      icon: <MusicIcon color="green" height="18" width="18" />,
      link: "Music",
      href: publicRuntimeConfig?.music,
    },
    {
      icon: (
        <MorePeople
          width="24"
          height="24"
          color={darkModeEnable ? "#9eaaef" : "black"}
        />
      ),
      link: "Top Sellers By Sale",
      href: publicRuntimeConfig?.topCreatersByTotalSale,
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
      href: publicRuntimeConfig?.topCreatersByRevenue,
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

  const callToFetchArtMusicAndVideoRevenue = async () => {
    const result = await dispatch<any>(artMusicAndVideoRevenue());
    console.log(result?.payload?.totalRevenue);
    SetArtMusicAndVideoRevenueData(result?.payload);
  };

  const changeSwitch = (type: string, value: boolean) => {
    if (type === "tutorial") {
      setSwitchTab((prev) => ({
        ...prev,
        tutorial: !value,
      }));
      dispatch(openCredential("Tutorial"));
      router.push("//admin-dashboard/seller-video/seller-dashboard")
      
    }else if(type === "photograhy"){
      setSwitchTab((prev) => ({
        ...prev,
        photograhy: !value,
      }));
      dispatch(openCredential("Digital photography"))
      router.push("/admin-dashboard/seller-photography/photography-dashboard")
    }else if(type === "ecommerce"){
      setSwitchTab((prev) => ({
        ...prev,
        ecommerce: !value,
      }));
      dispatch(openCredential("E-Commerce"))
    }
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
            <p className="text-lg font-semibold">Admin Dashboard</p>
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
        <div className="h-[50%] py-2  overflow-y-auto scroller">
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
        <div className="h-[40%] flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <img src="/wallet.svg" alt="wallet" className="w-12 h-12" />
            <p
              className={` font-bold ${
                darkModeEnable ? "text-[#5E72E4]" : "text-[#140e69]"
              }`}
            >
              ₹{artMusicAndVideoRevenueData?.totalRevenueforArtMusic}
            </p>
            <p className="text-sm font-semibold" style={{ color: colors.text }}>
              Total Revenue
            </p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="w-full h-10 px-4 bg-[#025f92] text-[#fff] rounded-lg flex justify-between items-center">
              <p>Turorial</p>
              <div
                onClick={() => changeSwitch("tutorial", switchTab.tutorial)}
                className={`w-16 h-6 cursor-pointer rounded-full px-1 flex ${
                  switchTab.tutorial
                    ? "justify-end bg-[#084363]"
                    : "justify-start bg-[#c2c2c2]"
                } items-center`}
              >
                <div className="w-5 h-5 bg-[#fff] rounded-full"></div>
              </div>
            </div>
            <div className="w-full h-10 bg-[#084363] text-[#fff] rounded-lg flex justify-between px-4 items-center">
              <p>Photography</p>
              <div
                onClick={() => changeSwitch("art", switchTab.photograhy)}
                className={`w-16 h-6 cursor-pointer rounded-full px-1 flex ${
                  switchTab.photograhy
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

export default ArtSidebar;

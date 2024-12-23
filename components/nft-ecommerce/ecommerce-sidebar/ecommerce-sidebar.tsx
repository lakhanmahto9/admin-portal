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
  MyProductIcon,
  OrderIcon,
  PersonHeartsIcon,
} from "../../utils/icons";
import React, { useEffect, useState } from "react";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useThemeColors } from "@/components/utils/useThemeColor";
import { getEcommerceTotalRevenue } from "@/redux/api/ecommerce/totalRevenueApi";
import { openCredential } from "@/redux/slice/creadentialSlice";


const { publicRuntimeConfig } = getConfig();
const EcommerceSidebar: React.FC = () => {
  const [switchTab, setSwitchTab] = useState({
    photography: false,
    art: false,
    tutorial: false,
  });
  // const [artMusicAndVideoRevenueData, SetArtMusicAndVideoRevenueData] =
  //   useState<artMusicAndVideoData>({
  //     totalRevenueforArtMusic: 0,
  //     totalRevenue: 0,
  //   });
  const dispatch = useDispatch();
  const router = useRouter();
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);
  const [total, setTotal] = useState(0);
  const sidenavcolor = useSelector((state: any) => state.sidebarbg.color);
  const [totalRevenue, setTotalRevenue] = useState(0);


  // const mysale = useSelector((state: any) => state.sales.data?.mysale || []);
  const [info, setInfo] = useState({
    totalRevenue: 0,
  });

  const sideBarLink = [
    {
      icon: <SqureIcon
      color={darkModeEnable ? "#9eaaef" : "red"}
      height="15" width="15" />,
      link: "Dashboard",
      href: publicRuntimeConfig?.ecommerceDashboard,
    },
    {
      icon: <PersonHeartsIcon 
      color={darkModeEnable ? "#9eaaef" : "red"}
      height="18" width="18" />,
      link: "Buyers",
      href: publicRuntimeConfig?.ecommerceBuyers,
    },

    {
      icon: <Users
      color={darkModeEnable ? "#9eaaef" : "red"}
      height="18" width="18" />,
      link: "Sellers",
      href: publicRuntimeConfig?.ecommerceSellers,
    },

    {
      icon: <MyProductIcon
      color={darkModeEnable ? "#9eaaef" : "red"}
      height="18" width="18" />,
      link: "Products",
      href: publicRuntimeConfig?.products,
    },

    {
      icon: <OrderIcon 
      color={darkModeEnable ? "#9eaaef" : "red"}
      height="18" width="18" />,
      link: "Orders",
      href: publicRuntimeConfig?.orders,
    },

    {
      icon: (
        <MorePeople
          width="24"
          height="24"
          color={darkModeEnable ? "#9eaaef" : "red"}
        />
      ),
      link: "Top Sellers",
      href: publicRuntimeConfig?.topESellers,
    },
    {
      icon: <LogoutIcon
      color={darkModeEnable ? "#9eaaef" : "red"}
      height="18" width="18" />,
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


    // Fetch the total revenue when the component mounts
    useEffect(() => {
      const fetchTotalRevenue = async () => {
        try {
          const response = await getEcommerceTotalRevenue();
          setTotalRevenue(response.data.totalRevenue); // Assuming API response has totalRevenue key
        } catch (error) {
          console.error("Error fetching total revenue:", error);
        }
      };
      fetchTotalRevenue();
    }, []);

  const changeSwitch = (type: string, value: boolean) => {
    if (type === "art") {
      setSwitchTab((prev) => ({
        ...prev,
        art: !value,
      }));
      dispatch(openCredential("Digital Art and Music"));
      router.push("/admin-dashboard/seller-art/art-dashboard");
    } else if (type === "photography") {
      setSwitchTab((prev) => ({
        ...prev,
        photography: !value,
      }));
      dispatch(openCredential("Digital photography"));
      router.push("/admin-dashboard/seller-photography/photography-dashboard");
    }   else if(type === "tutorial"){
      setSwitchTab((prev) => ({
        ...prev,
        tutorial: !value,
      }));
      dispatch(openCredential("Tutorial"))
      router.push("/admin-dashboard/seller-video/seller-dashboard")
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
            <p className="text-lg font-semibold">Admin- Ecommerce</p>
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
        <div className="h-[50%] py-2  overflow-y-auto scroller ">
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
          <div className="flex flex-col justify-center items-center mb-4">
            <img src="/wallet.svg" alt="wallet" className="w-12 h-12" />
            <p
              className={` font-bold ${
                darkModeEnable ? "text-[#5E72E4]" : "text-[#140e69]"
              }`}
            >
              ₹{totalRevenue} {/* Display total revenue here */}
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
                <p>Tutorial</p>
                <div
                  onClick={() => changeSwitch("tutorial", switchTab.tutorial)}
                  className={`w-16 h-6 cursor-pointer rounded-full px-1 flex ${
                    switchTab.tutorial
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
  
  export default EcommerceSidebar;
  
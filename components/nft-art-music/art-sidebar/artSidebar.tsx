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
import { useSelector } from "react-redux";
import { useThemeColors } from "@/components/utils/useThemeColor";

const { publicRuntimeConfig } = getConfig();
const ArtSidebar: React.FC = () => {
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
      link: "Top Creaters By Sale",
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
      link: "Top Creaters By Revenue",
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
    // callFilterFunction();
  }, []);

  // const callFilterFunction = () => {
  //   if (mysale.length > 0) {
  //     const totalRev = mysale.reduce((total: number, data: any) => {
  //       return total + data.price;
  //     }, 0);

  //     setInfo((prev) => ({
  //       ...prev,
  //       totalRevenue: totalRev,
  //     }));
  //   }
  // };

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
              className={`text-sm font-semibold ${
                darkModeEnable ? "text-[#5E72E4]" : "text-[#140e69]"
              }`}
            >
              ₹{info.totalRevenue}
            </p>
            <p className="text-sm font-semibold" style={{ color: colors.text }}>
              Wallet Amount
            </p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="w-full h-10 bg-[#344767] text-[#fff] rounded-lg flex justify-center items-center">
              Dashboard
            </div>
            <div className="w-full h-10 bg-[#070a68] text-[#fff] rounded-lg flex justify-center items-center">
              View Profile
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtSidebar;

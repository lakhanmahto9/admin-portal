import {
    AddphotoIcon,
    AngleIcon,
    BagCheck,
    LogoutIcon,
    ProfileIcon,
    SqureIcon,
    UserIcon,
  } from "@/public/icons/icons";
  import React, { useEffect, useState } from "react";
  import getConfig from "next/config";
  const { publicRuntimeConfig } = getConfig();
  import { useRouter } from "next/router";
  import { useSelector } from "react-redux";
//   import { useSellerThemeColors } from "@/components/utils/sellerThemeColor";
  
  export const PhotographySidebar : React.FC = () => {
    const router = useRouter();
    const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
    // const bg = useSellerThemeColors(isDarkEnabled);
    // const [total, setTotal] = useState(0);
    // const sidenavcolor = useSelector((state:any) => state.sidebarbg.color)
  
    // const mysale = useSelector((state: any) => state.sales.data?.mysale || []);
    // const [info, setInfo] = useState({
    //   totalRevenue: 0,
    // });
  
    const sideBarLink = [
      {
        icon: <SqureIcon color="blue" height="15" width="15" />,
        link: "Dashboard",
        href: publicRuntimeConfig?.disgitalphotographydashboard,
      },
      {
        icon: <UserIcon color="red" height="18" width="18" />,
        link: "Seller Details",
        href: publicRuntimeConfig?.photographysellerdetails,
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
  
    // useEffect(() => {
    //   callFilterFunction();
    // }, []);
  
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
          className="h-[95vh]  rounded-2xl p-2 shadow-inner "
          style={{
            backgroundColor:`${isDarkEnabled?"#101c44":"#dae2ff"} `,
            // boxShadow: `0px 0px 3px 1px `,
          }}
          // #dae2ff
        >
          <div className="h-[10%] flex gap-5 flex-col justify-center items-center">
            <div className="flex gap-2">
              <BagCheck color="blue" height="24" width="24" />
              <p className={`text-lg font-semibold text-[${isDarkEnabled?"#fff":""}]`}>Digital Photography</p>
            </div>
            <div className="w-full">
              <hr
                className="w-full"
                style={{
                  backgroundColor: isDarkEnabled ? "gray" : "lightgray",
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
                    ? isDarkEnabled
                      ? `bg-[#192555] shadow-inner`
                      : `bg-[#ffff] shadow-inner`
                    : ""
                } h-12 rounded-xl px-2 flex justify-between items-center cursor-pointer mb-1`}
                key={index}
                onClick={() => handleLinkClick(item.href, item.link)}
              >
                <div className="flex items-baseline gap-3">
                  {item.icon}
                  <p
                    className={`${
                      item.href === router.pathname ? "font-semibold text-lg" : ""
                    }`}
                    style={{ color:`${isDarkEnabled?"#fff": "#192555"}`}}
                  >
                    {item.link}
                  </p>
                </div>
                <AngleIcon
                  width="16"
                  height="16"
                  color={isDarkEnabled ? "gray" : "black"}
                />
              </div>
            ))}
          </div>
          <div className="h-[30%] flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <img src="/image/wallet.svg" alt="wallet"  className="w-12 h-12" />
              <p
                className={`text-sm font-semibold ${
                  isDarkEnabled ? "text-[#fff]" : "text-[#140e69]"
                }`}
              >
                $888
              </p>
              <p className={`text-sm font-semibold" ${
                  isDarkEnabled ? "text-[#fff]" : "text-[#192555]"
                }`}>
                Wallet Amount
              </p>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full h-10 bg-[#025f92] text-[#fff] rounded-lg flex justify-center items-center">Dashboard</div>
              <div className="w-full h-10 bg-[#084363] text-[#fff] rounded-lg flex justify-center items-center">View Profile</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  
import React, { useEffect, useState } from "react";
import { useThemeColors } from "@/components/utils/useThemeColor";
import { useSelector } from "react-redux";
import { PlaylistIcon, UserIcon } from "@/public/icons/icons";
import { RupeesIcon } from "@/components/utils/icons";
import { getArtMusicCardDataApi } from "@/redux/api/api";

export const Card: React.FC = () => {
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const [cardData, setCardData] = useState({
    totalBuyers: 0,
    totalSellers: 0,
    totalProducts: 0,
    todayBuyers: 0,
    todaySellers: 0,
    todayProducts: 0,
    buyersPercentageChange: 0,
    sellersPercentageChange: 0,
    productsPercentageChange: 0,
    newBuyers: 0,
    newProducts: 0,
    newSellers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getArtMusicCardDataApi();
        if (response.data) {
          setCardData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch card data:", error);
      }
    };
    fetchData();
  }, []);

  const bg = useThemeColors(isDarkEnabled);
  const cardStyle = {
    backgroundColor: `${bg.cardBg}`,
    border: `1px solid "#192555"`,
    color: bg.text,
  };

  const stats = [
    {
      title: "Total Sellers",
      value: cardData.totalSellers,
      change: `${cardData.sellersPercentageChange.toFixed(1)}%`,
      since: "since last year",
      icon: <UserIcon color="#22219a" height="18" width="18" />,
    },

    {
      title: "Today's Sellers",
      value: `₹${cardData.todaySellers}`,
      change: cardData.newSellers,
      since: "since yesterday",
      icon: <UserIcon color="#22219a" height="18" width="18" />,
    },


    {
      title: "Total Buyers",
      value: cardData.totalBuyers,
      change: `${cardData.buyersPercentageChange.toFixed(1)}%`,
      since: "since last year",
      icon: <UserIcon color="#22219a" height="18" width="18" />,
    },
    {
      title: "Today's Buyers",
      value: `₹${cardData.todayBuyers}`,
      change: cardData.newBuyers,
      since: "since yesterday",
      icon: <UserIcon color="#22219a" height="18" width="18" />,
    },

    {
      title: "Total Art & Music",
      value: cardData.totalProducts,
      change: `${cardData.productsPercentageChange.toFixed(1)}%`,
      since: "since last year",
      icon: <PlaylistIcon color="#22219a" height="18" width="18" />,
    },

  
    {
      title: "Today's Art & Music",
      value: `₹${cardData.todayProducts}`,
      change: cardData.newProducts,
      since: "since yesterday",
      icon: <PlaylistIcon color="#22219a" height="18" width="18" />,
    },
  ];

  return (
    <div className="w-full flex flex-wrap justify-start gap-3">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="w-full sm:w-[48%] lg:w-[24%] h-28 rounded-2xl p-4"
          style={cardStyle}
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="text-sm font-semibold">{stat.title}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full flex justify-center items-center"
                id="bg-round"
              ></div>
              <div className="absolute top-1 right-1 w-8 h-8 bg-[#fff] rounded-full flex justify-center items-center">
                {stat.icon}
              </div>
            </div>
          </div>
          <div className="flex">
            <p className="font-semibold text-[#23e751]">{stat.change}</p>
            &nbsp;
            <p>{stat.since}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

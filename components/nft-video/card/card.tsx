import React, { useEffect, useState } from "react";
import { useThemeColors } from "@/components/utils/useThemeColor";
import { useSelector } from "react-redux";
import { PlaylistIcon, UserIcon } from "@/public/icons/icons";
import { getTutorialCardDataApi } from "@/redux/api/tutorial/tutorialApi";

export const Card: React.FC = () => {
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const [cardData, setCardData] = useState({
    totalUsers: 0,
    totalCreators: 0,
    totalPlaylists: 0,
    todayUsers: 0,
    todayCreators: 0,
    todayPlaylists: 0,
    usersPercentageChange: 0,
    creatorsPercentageChange: 0,
    playlistsPercentageChange: 0,
    newUsers: 0,
    newCreators: 0,
    newPlaylists: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTutorialCardDataApi();
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
      title: "Total Users",
      value: cardData.totalUsers,
      change: `${cardData.usersPercentageChange.toFixed(1)}%`,
      since: "since last year",
      icon: <UserIcon color="#22219a" height="18" width="18" />,
    },
    {
      title: "Today's Users",
      value: cardData.todayUsers,
      change: cardData.newUsers,
      since: "since yesterday",
      icon: <UserIcon color="#22219a" height="18" width="18" />,
    },
    {
      title: "Total Creators",
      value: cardData.totalCreators,
      change: `${cardData.creatorsPercentageChange.toFixed(1)}%`,
      since: "since last year",
      icon: <UserIcon color="#22219a" height="18" width="18" />,
    },
    {
      title: "Today's Creators",
      value: cardData.todayCreators,
      change: cardData.newCreators,
      since: "since yesterday",
      icon: <UserIcon color="#22219a" height="18" width="18" />,
    },
    {
      title: "Total Playlists",
      value: cardData.totalPlaylists,
      change: `${cardData.playlistsPercentageChange.toFixed(1)}%`,
      since: "since last year",
      icon: <PlaylistIcon color="#22219a" height="18" width="18" />,
    },
    {
      title: "Today's Playlists",
      value: cardData.todayPlaylists,
      change: cardData.newPlaylists,
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

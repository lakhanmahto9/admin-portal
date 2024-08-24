import { PhotoIcon } from "../../utils/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DashboardCardData } from "../video-dashboard/video-dashboard";
import { useThemeColors } from "@/components/utils/useThemeColor";

interface CardProps {
  data: DashboardCardData;
}

export const Card: React.FC<CardProps> = ({ data }) => {
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);
  //   const data = useSelector(
  //     (state: any) => state.sellerphotography?.data?.photography || []
  //   );
  //   const mysale = useSelector((state: any) => state.sales.data?.mysale || []);
  const [info, setInfo] = useState({
    totalPhotography: 0,
    totalBuyer: 0,
    totalRevenue: 0,
    todayRevenue: 0,
  });

  useEffect(() => {
    // callFilterFunction();
  }, []);

  //   const callFilterFunction = () => {
  //     if (mysale.length > 0) {
  //       const totalRev = mysale.reduce((total: number, data: any) => {
  //         return total + data.price;
  //       }, 0);

  //       setInfo((prev) => ({
  //         ...prev,
  //         totalRevenue: totalRev,
  //       }));
  //       const currentDate = new Date();
  //       const filterSale = mysale.filter((item: any) => {
  //         const itemDate = new Date(item.createdAt);
  //         return (
  //           itemDate.getFullYear() === currentDate.getFullYear() &&
  //           itemDate.getMonth() === currentDate.getMonth() &&
  //           itemDate.getDate() === currentDate.getDate()
  //         );
  //       });
  //       setInfo((prev) => ({
  //         ...prev,
  //         todayRevenue: filterSale.reduce(
  //           (acc: number, data: any) => (acc = acc + data.price),
  //           0
  //         ),
  //       }));
  //     }
  //   };
  const cardStyle = {
    backgroundColor: colors.cardBg,
    // border: `1px solid ${darkModeEnable ? "#3C4E6D" : "gray"}`,
    boxShadow: `0px 1px 4px -1px `,
    color: colors.text,
  };

  return (
    <div className="w-full flex flex-wrap  gap-3">
      <div
        className={`w-full sm:w-[48%] lg:w-[24%] h-28 rounded-2xl p-4 shadow-md `}
        style={cardStyle}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-semibold ">Total Buyer</p>
            <p className="text-xl font-bold">{data.totalBuyerCount}</p>
          </div>
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full flex  justify-center items-center"
              id="bg-round"
            ></div>
            <div className="absolute top-1 right-1 w-8 h-8 bg-[#fff] rounded-full flex justify-center items-center">
              <PhotoIcon color="#22219a" height="18" width="18" />
            </div>
          </div>
        </div>
        <div className="flex">
          <p className="font-semibold text-[#23e751]">5%</p>&nbsp;
          <p className="">since last year</p>
        </div>
      </div>

      <div
        className="w-full sm:w-[48%] lg:w-[24%] h-28 rounded-2xl p-4 shadow-md"
        style={cardStyle}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Today&apos;s Buyer</p>
            <p className="text-xl font-bold">{data.todayBuyerCount}</p>
          </div>
          <div></div>
        </div>
        <div className="flex">
          <p className="font-semibold text-[#23e751]">5%</p>&nbsp;
          <p className="">since last year</p>
        </div>
      </div>

      <div
        className="w-full sm:w-[48%] lg:w-[24%] h-28  rounded-2xl p-4 shadow-md"
        style={cardStyle}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Total Creater</p>
            <p className="text-xl font-bold">{data.totalCreatorCount}</p>
          </div>
          <div></div>
        </div>
        <div className="flex">
          <p className="font-semibold text-[#23e751]">5%</p>&nbsp;
          <p className="">since last year</p>
        </div>
      </div>

      <div
        className="w-full sm:w-[48%] lg:w-[24%] h-28 rounded-2xl p-4 shadow-md"
        style={cardStyle}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Today&apos;s Creater</p>
            <p className="text-xl font-bold">{data.todayCreatorCount}</p>
          </div>
          <div></div>
        </div>
        <div className="flex">
          <p className="font-semibold text-[#23e751]">5%</p>&nbsp;
          <p className="">since last year</p>
        </div>
      </div>

      <div
        className="w-full sm:w-[48%] lg:w-[24%] h-28 rounded-2xl p-4 shadow-md"
        style={cardStyle}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Today&apos;s Playlist</p>
            <p className="text-xl font-bold">{data.todayPlaylistCount}</p>
          </div>
          <div></div>
        </div>
        <div className="flex">
          <p className="font-semibold text-[#23e751]">5%</p>&nbsp;
          <p className="">since last year</p>
        </div>
      </div>
      <div
        className="w-full sm:w-[48%] lg:w-[24%] h-28 rounded-2xl p-4 shadow-md"
        style={cardStyle}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Total Playlist</p>
            <p className="text-xl font-bold">{data.totalPlaylistCount}</p>
          </div>
          <div></div>
        </div>
        <div className="flex">
          <p className="font-semibold text-[#23e751]">5%</p>&nbsp;
          <p className="">since last year</p>
        </div>
      </div>
    </div>
  );
};

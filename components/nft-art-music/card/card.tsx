import { PhotoIcon } from "../../utils/icons";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DashboardCardData } from "../art-dashboard/art-dashboard";
import { useThemeColors } from "@/components/utils/useThemeColor";
import { fetchCountTotalTodaysArtAndMusic } from "@/redux/slice/fetchTotalTodaysArtAndMusicSlice";

interface CardProps {
  data: DashboardCardData;
}

interface ArtAndMusicCount {
  totalArtMusic: number;
  todayArtMusic: number;
}

export const Card: React.FC<CardProps> = ({ data }) => {
  const [countArtAndMusic, setCountArtAndMusic] = useState<ArtAndMusicCount>({
    totalArtMusic: 0,
    todayArtMusic: 0,
  });
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);
  const dispatch = useDispatch();
 
  const [info, setInfo] = useState({
    totalPhotography: 0,
    totalBuyer: 0,
    totalRevenue: 0,
    todayRevenue: 0,
  });

  useEffect(() => {
    callToFetchCountOfTotalTodaysArtAndMusic();
  }, []);

  const callToFetchCountOfTotalTodaysArtAndMusic = async () => {
    const result = await dispatch<any>(fetchCountTotalTodaysArtAndMusic({}));
    setCountArtAndMusic(result?.payload);
  };

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
            <p className="text-sm font-semibold">Total Seller</p>
            <p className="text-xl font-bold">{data.totalSellerCount}</p>
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
            <p className="text-sm font-semibold">Today&apos;s Seller</p>
            <p className="text-xl font-bold">{data.todaySellerCount}</p>
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
            <p className="text-sm font-semibold">Today&apos;s Art & Music</p>
            <p className="text-xl font-bold">
              {countArtAndMusic.todayArtMusic}
            </p>
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
            <p className="text-sm font-semibold">Total Art & Music</p>
            <p className="text-xl font-bold">
              {countArtAndMusic.totalArtMusic}
            </p>
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

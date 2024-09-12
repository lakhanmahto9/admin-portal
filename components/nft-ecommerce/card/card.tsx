import { PhotoIcon } from "../../utils/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DashboardCardData } from "../ecommerce-dashboard/ecommerce-dashboard";
import { useThemeColors } from "@/components/utils/useThemeColor";

interface CardProps {
  data: DashboardCardData;
}

export const Card: React.FC<CardProps> = ({ data }) => {
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);
 


  const cardStyle = {
    backgroundColor: colors.cardBg,
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
            <p className="text-xl font-bold">{data.totalBuyers}</p>
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
            <p className="text-sm font-semibold">Today&apos;s Buyers</p>
            <p className="text-xl font-bold">{data.todayBuyers}</p>
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
            <p className="text-sm font-semibold">Total sellers</p>
            <p className="text-xl font-bold">{data.totalSellers}</p>
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
            <p className="text-sm font-semibold">Today&apos;s Sellers</p>
            <p className="text-xl font-bold">{data.todaySellers}</p>
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
            <p className="text-sm font-semibold">Today&apos;s Products</p>
            <p className="text-xl font-bold">{data.todayProducts}</p>
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
            <p className="text-sm font-semibold">Total Products</p>
            <p className="text-xl font-bold">{data.totalProducts}</p>
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

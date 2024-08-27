import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useThemeColors } from "@/components/utils/useThemeColor";

interface CardProps {
  content: {
    creatorId: string;
    creatorPic?: string;
    creatorName: string;
    creatorEmail: string;
    totalSale: number;
    totalRevenue: number;
  };
}

const Card: React.FC<CardProps> = ({ content }) => {
    const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
    const colors = useThemeColors(darkModeEnable);


  const defaultPic = "https://via.placeholder.com/150"; // Default image URL

  return (
    <div
      className={`card m-2 rounded-lg shadow-lg w-full md:w-72 h-auto flex flex-col relative ${
        darkModeEnable ? "bg-[#0E1A49] text-white" : "bg-white text-black"
      }`}
    >
     
      <img
        src={content.creatorPic || defaultPic}
        alt="creator thumbnail"
        className="w-full h-60 object-cover rounded-t-lg mb-2"
      />
      <div className="flex flex-col justify-between h-full p-4">
        <div>
          <p className="text-xl font-semibold mb-2">{content.creatorName}</p>
          <p className="text-sm mb-2">{content.creatorEmail}</p>
          <p className="text-2xl font-bold text-yellow-500 mb-4">
            ₹{content.totalRevenue}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">
            Total Sales: {content.totalSale}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;

import React, { useState } from "react";
import { Modal, Button, IconButton } from "@mui/material";
import { AiOutlineClockCircle, AiOutlineCopyrightCircle } from "react-icons/ai";
import { useSelector } from "react-redux";

interface CardProps {
  content: {
    sellerId: string;
    sellerName: string;
    sellerEmail: string;
    sellerPic?: string;
    totalSale: number;
    totalRevenue: number;
  };
}

const Card: React.FC<CardProps> = ({ content }) => {

  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);

  return (
    <div
      className={`card m-1 rounded-lg shadow-lg w-full md:w-72 h-auto flex flex-col relative ${
        darkModeEnable ? "bg-[#0E1A49] text-white" : "bg-white text-black"
      }`}
    >
      <img
        src={content.sellerPic || "https://via.placeholder.com/150"}
        alt="seller"
        className="w-full h-60 object-cover rounded-t-lg mb-2"
      />
      <div className="flex flex-col justify-between h-full p-4">
        <div>
          <p className="text-xl font-semibold mb-2">{content.sellerName}</p>
          <p className="text-sm mb-2">{content.sellerEmail}</p>
          <p className="text-sm mb-2">Total Sales: {content.totalSale}</p>
          <p className="text-2xl font-bold text-yellow-500 mb-4">
            ₹{content.totalRevenue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;

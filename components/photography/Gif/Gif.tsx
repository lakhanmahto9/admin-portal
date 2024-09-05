import React from "react";
import { useSelector } from "react-redux";

export const Gif: React.FC = () => {
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  return (
    <>
      {isDarkEnabled ? (
        <div className="w-full h-full border rounded-2xl">
          <img
            src="/image/nftgif-unscreen.gif"
            alt=""
            className="object-cover w-full h-full rounded-2xl"
          />
        </div>
      ) : (
        <div className="w-full h-full">
          <img
            src="/image/nftgif.gif"
            alt=""
            className="object-cover w-full h-full rounded-2xl"
          />
        </div>
      )}
    </>
  );
};

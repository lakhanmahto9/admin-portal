import React from "react";
import { SalesDataItemTwo } from "./data-types";
import { useSelector } from "react-redux";
import { useThemeColors } from "@/components/utils/useThemeColor";

interface CategoriesProps {
  categories: SalesDataItemTwo;
}

const CategoriesTransaction: React.FC<CategoriesProps> = ({
  categories
}) => {
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);

  const thumbnail = categories.artThumbnail || categories.musicThumbnail;

  return (
    <div className="flex items-center mt-4">
      {thumbnail && (
        <div
          className="logo p-1 rounded-lg flex justify-center items-center h-8 w-8"
          style={{ background: colors.cardBg }}
        >
          <img src={thumbnail} alt="Logo" className="h-4 w-4" />
        </div>
      )}
      <div className="ml-4">
        <div className="device">
          <h2 className="text-[14px] font-semibold">
            {categories.artName}
          </h2>
          <p className="text-sm">
            ₹{categories.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoriesTransaction;

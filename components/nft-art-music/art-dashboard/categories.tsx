import React from "react";
import CategoriesTransaction from '../art-dashboard/categories-transaction'
import { SalesDataItemTwo } from "./data-types";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RightGo } from "../../utils/icons";
import { useThemeColors } from "@/components/utils/useThemeColor";

interface Props {
  artSalesData: SalesDataItemTwo[];
}

const Categories: React.FC<Props> = ({ artSalesData }) => {
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);
  const router = useRouter();
 
  const serializeObjectToQueryString = (obj: any) => {
    return new URLSearchParams(obj).toString();
  };

  const gotoTransaction = (item: SalesDataItemTwo) => {
    const queryString = serializeObjectToQueryString(item);
    router.push(`/admin-dashboard/seller-art/transaction?${queryString}`);
  };

  if (!Array.isArray(artSalesData)) {
    console.error(
      "Expected dashboardSalesData to be an array, but got:",
      artSalesData
    );
    return null;
  }

  return (
    <div
      className={`overflow-y-auto p-3  rounded-lg ${darkModeEnable ? "" : "shadow-lg shadow-gray-300 "}`}
      style={{ maxHeight: "400px",background:colors.cardBg,color:colors.text }}
    >
      <h3 className={`font-bold`}>
        Transaction
      </h3>
      <div>
        <div className="">
          {artSalesData.map((el, ind) => (
            <div
              key={ind}
              className="flex flex-start space-y-4 mt-2 justify-between"
            >
              <CategoriesTransaction categories={el} />
              <span className="pr-6 cursor-pointer">
                <RightGo
                  width="16"
                  height="16"
                  color={colors.text}
                  className="cursor-pointer"
                  onClick={() => gotoTransaction(el)}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;

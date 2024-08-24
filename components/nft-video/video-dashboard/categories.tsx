import React from "react";
import CategoriesTransaction from '../video-dashboard/categories-transaction'
import { SalesDataItem } from "./data-types";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
// import { selectDarkMode } from "@/redux/slice/darkModeSlice";
import { RightGo } from "../../utils/icons";

interface Props {
  dashboardSalesData: SalesDataItem[];
}

const Categories: React.FC<Props> = ({ dashboardSalesData }) => {
//   const darkModeEnable = useSelector(selectDarkMode);
  const router = useRouter();

  const serializeObjectToQueryString = (obj: any) => {
    return new URLSearchParams(obj).toString();
  };

  const gotoTransaction = (item: SalesDataItem) => {
    const queryString = serializeObjectToQueryString(item);
    router.push(`/seller-video/transaction?${queryString}`);
  };

  return (
    <div
      className={`overflow-y-auto shadow-lg shadow-gray-300 p-3 `}
      style={{ maxHeight: "400px" }}
    >
      <h3 className={``}>
        Categories
      </h3>
      <div>
        <div className="">
          {dashboardSalesData.map((el, ind) => (
            <div
              key={ind}
              className="flex flex-start space-y-4 mt-2 justify-between"
            >
              <CategoriesTransaction categories={el} />
              <span className="pr-6 cursor-pointer">
                <RightGo
                  width="16"
                  height="16"
                  color={``}
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

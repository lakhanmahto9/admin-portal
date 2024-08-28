import React from "react";
import TableRow from "./table-row";
import { SalesDataItemTwo } from "./data-types";
import { useSelector } from "react-redux";
import { useThemeColors } from "@/components/utils/useThemeColor";

interface Props {
  artSalesData: SalesDataItemTwo[];
}

const DashboardTable: React.FC<Props> = ({ artSalesData }) => {
  // console.log(artSalesData)

  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);

  if (!Array.isArray(artSalesData)) {
    console.error(
      "Expected dashboardSalesData to be an array, but got:",
      artSalesData
    );
    return null;
  }

  return (
    <div
      className={`overflow-x-auto rounded-xl mt-2 w-full ${
        darkModeEnable ? "" : "shadow-lg shadow-gray-300"
      }`}
      style={{ maxHeight: "400px", color: colors.text, background: colors.cardBg }}
    >
      <h2 className="p-4 font-bold text-base">Sales</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Logo
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              User Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              ART/MUSIC Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Price
            </th>
            {/* <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Country
            </th> */}
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {artSalesData.map((item, ind) => (
            <TableRow key={ind} item={item}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
